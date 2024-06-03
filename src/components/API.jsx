import axios from 'axios';
import { instance } from "./API.config.jsx";

const host ="54.93.231.47" //localhost
// const API_URL = 'http://localhost:3000';
const API_URL2 = `http://${host}/DeliveryBack/InsertUser.php`;
const API_URL3 = `http://${host}/DeliveryBack/CheckUser.php`;
const API_URL4 = `http://${host}/DeliveryBack/Token.php`;
const API_URL5 = `http://${host}/DeliveryBack/CreateOrder.php`;
const API_URL6 = `http://${host}/DeliveryBack/generateToken.php`;
const API_URL7 = `http://${host}/DeliveryBack/getInfo.php`;


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
    const response = await axios.post(API_URL6, userData);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const decodeJWT = async() =>{
  try {
    const response = await axios.post(API_URL7, {}, {
      headers: {
      'Authorization': localStorage.getItem("token"),
      }
  });
    return response;
  } catch (error) {
    return error;
  }
}

export const createOrder = async (order) => {
  // try {
    const response = await axios.post(`${API_URL5}/orders`, order);
    console.log(response.data);
    return response.data;
  // } catch (error) {
  //   return error;
  // }
};