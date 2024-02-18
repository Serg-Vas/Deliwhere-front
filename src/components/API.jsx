import axios from 'axios';

const API_URL = 'http://localhost:3000';
const API_URL2 = 'http://localhost/DeliveryBack/InsertUser.php';
const API_URL3 = 'http://localhost/DeliveryBack/CheckUser.php';
const API_URL4 = 'http://localhost/DeliveryBack/Token.php';

export const getToken = async (username, password) => {
  const response = await axios.post(API_URL4, {name: username, password});
  // console.log(response.data);
  return response;
}; 

export const getUsers = async (username, password) => {
  const response = await axios.post(API_URL3, {name: username, password});
  // console.log(response.data);
  return response;
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL2}/users`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createCart = async (cart) => {
    const response = await axios.post(`${API_URL}/cart`, cart);
    return response.data;
};