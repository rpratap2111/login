const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if(user) return res.status(400).json({ message: "User already exists", success: false });
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password,10);
        await newUser.save();
        res.status(201).json({ message: "User created successfully", success: true });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: { details: [{ message: error.message }] }
        });
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if(!user) return res.status(400).json({ message: "User does not exist", success: false });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials", success: false });
        const token = jwt.sign(
            { email: user.email, id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "24h" }
        );
        res.status(200).json({ 
            message: "Login successful", 
            token,
            success: true,
            email,
            name: user.name,
        });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}


module.exports = { signup, login };