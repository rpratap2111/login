import React, { useEffect, useState } from 'react';
import '../design/style3.css';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out Successfully');
    setTimeout(() => {
      navigate('/login');
    }, 1500); // Adding a delay for better user experience
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      const response = await fetch(url, headers);
      const result = await response.json();

      console.log(result); // Debugging: check if products are fetched
      setProducts(result); // Ensure products are properly set
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="home-container">
        <div className="home-wrapper">
          <h2>Welcome {loggedInUser}</h2>
          <p>You are successfully logged in.</p>
          <div>
            {products.length > 0 ? (
              products.map((item, index) => (
                <ul key={index}>
                  <li>{item.name}: {item.price}</li>
                </ul>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
