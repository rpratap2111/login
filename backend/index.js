const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Models/db.js');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter.js');
const ProductRouter = require('./Routes/ProductRouter.js');


const app = express();
app.use(express.json());
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());



app.use('/auth', AuthRouter);
app.use('/products', ProductRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});