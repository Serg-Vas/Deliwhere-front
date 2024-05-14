import axios from 'axios';
import { instance } from "./API.config.jsx";

const API_URL = 'http://localhost:3000';
const API_URL2 = 'http://localhost/DeliveryBack/InsertUser.php';
const API_URL3 = 'http://localhost/DeliveryBack/CheckUser.php';
const API_URL4 = 'http://localhost/DeliveryBack/Token.php';
const API_URL5 = 'http://localhost/DeliveryBack/CreateOrder.php';
const API_URL6 = 'http://localhost/DeliveryBack/generateToken.php';
const API_URL7 = 'http://localhost/DeliveryBack/getToken.php';


export const getToken = async (username, password) => {
  const response = await axios.post(API_URL4, {name: username, password});
  // console.log(response.data);
  return response;
}; 

export const getUsers = async (username, password) => {
  const response = await axios.post(API_URL3, {name: username, password});
  console.log(response);
  console.log(response.data);
  return response;

  // const response = instance.post("/CheckUser", {name: username, password})
  // return response;
};


export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL2}/users`, user);
    console.log(response.config.data, "response");
    return response.config.data;
  } catch (error) {
    return error;
  }
};

export const createJWT = async(userData) =>{
  try {
    const response = await axios.post('http://localhost/DeliveryBack/generateToken.php', userData);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const decodeJWT = async(token) =>{
  try {
    const response = await axios.post('http://localhost/DeliveryBack/getToken.php', token);
    return response;
  } catch (error) {
    return error;
  }
}

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`${API_URL5}/orders`, order);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};