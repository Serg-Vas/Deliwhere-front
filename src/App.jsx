import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shops from './components/Shops';
import Cart from './components/Cart';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Token from './components/Token';
import { decodeJWT } from './components/API';
import axios from 'axios';
// import axios from 'axios';

const baseUrl = 'https://reqres.in/api/unknown/1'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authName: '',
      isLoggedIn: false,
      isAuth: false,
      token: '',
      shops: [
        //     {
        //     "id": 1,
        //     "name": "McDonalds",
        //     "food": [
        //         {
        //             "id": 1,
        //             "name": "Burger",
        //             "price": 100
        //         },
        //         {
        //             "id":2,
        //             "name": "DoubleBurger",
        //             "price": 250
        //         },
        //         {
        //             "id":3,
        //             "name": "TripleBurger",
        //             "price": 350
        //         }
        //     ]
        // },
        // {
        //     "id":2,
        //     "name": "KFC",
        //     "food": [
        //         {
        //             "id": 11,
        //             "name": "Burger 2",
        //             "price": 100
        //         },
        //         {
        //             "id":12,
        //             "name": "DoubleBurger 2",
        //             "price": 250
        //         },
        //         {
        //             "id":13,
        //             "name": "TripleBurger 2",
        //             "price": 350
        //         }
        //     ]
        // }
      ]
    }
  }

  // handleLogin = () => {
  //   this.setState({ isLoggedIn: true });
  //   this.saveAuthInfo(this.state.token, true);
  // };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
    this.setState({ authName: '' }); 
    const keyToken = "token"
    console.log(localStorage.getItem(keyToken));
    localStorage.removeItem(keyToken); 
    console.log(localStorage.getItem(keyToken));

    const keyUser = "userData"
    console.log(localStorage.getItem(keyUser));
    localStorage.removeItem(keyUser); 
    console.log(localStorage.getItem(keyUser));
    this.saveAuthInfo('', false);
  };

  handleAuthNameChange = (newAuthName) => {
    // this.setState({ authName: newAuthName });
  };

  handleToken = async (token) => {
    // Decode the JWT token
    console.log(token);
    const decodedToken = await decodeJWT(token);
    console.log(decodedToken.data);

    // if (condition) {
      
    // }
    const key = "userData"
        // const userData = localStorage.getItem(key) || decodedToken.data
        // console.log(userData);
        localStorage.setItem(key, JSON.stringify(decodedToken.data))
        console.log(localStorage.getItem(key));
        const userData = JSON.parse(localStorage.getItem(key));
        console.log("User Data:", userData);
        console.log("User Data Name:", userData.name);
        this.setState({
          token: token,
          authName: userData.name,
        });
        // Save token and authentication status
        this.saveAuthInfo(token, true);
  }

  saveAuthInfo = (token, isLoggedIn) => {
    const key = "token"
    const tokenItem = localStorage.getItem(key) || token
    console.log(tokenItem);
    localStorage.setItem(key, tokenItem)
    console.log(tokenItem);
    // const tokenKill = localStorage.getItem(key)
    // console.log(localStorage.getItem(key), store, JSON.stringify(new Set(tokenKill)));
    // localStorage.removeItem(key);
  }
  
  handleHeaders = async () => {
    const response = await fetch("http://localhost/DeliveryBack/getInfo.php", { //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      headers: {
          'Authorization': localStorage.getItem("token"),
      }
  })
    // console.log(await response.text());
    const data = await response.json(); // Parse JSON response
    console.log(data.name);
    return data
  }

  async componentDidMount() {
    const url = "http://localhost/DeliveryBack/SelectRestaurants.php"
    // const url = "/shops.json";
    fetch(url)
      .then(response => response.json())
      .then(shops => {
        // Отримали дані з JSON-файлу
        console.log('shops', shops)
        this.setState({
          shops: shops
        });
      })
      .catch(error => {
        console.error('Помилка при завантаженні JSON-файлу:', error);
        // Обробка помилки
      });
      
      try {
          const key = "userData"
          const userData = JSON.parse(localStorage.getItem(key));
          console.log(userData.name);
          this.setState({
            authName: userData.name, // Assuming username is part of the JWT payload
            isAuth: true,
          });
          // Save token and authentication status
          this.saveAuthInfo(this.state.token, true);
        // localStorage.clear()
        // console.log(userData);
      } catch (error) {
        console.log(error);
      }
  }

  render() {
    // localStorage.clear()
    const { isLoggedIn } = this.state;
    const { shops } = this.state;
    const {token} = this.state;
    // this.saveAuthInfo(token, isLoggedIn)
    console.log(shops)
    console.log(token);
    console.log(isLoggedIn);
    const sumWithInitial = shops.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue.food],
      []
    );

    return (
      <div className="">
        {/* <Header /> */}
        <Router>
          <header className="Header">
            <nav className="navbar">
              <div className='pages'>
                <h1><Link to="/">Shops</Link></h1>
                {/* <li><h1>|</h1></li> */}
                <h1><Link to="/cart">Cart</Link></h1>
              </div>
              {shops.length > 0 && shops.map((shop) => (<li><h1><Link to={"/" + shop.id}>{shop.name}</Link></h1></li>))}
              <div className='login'>
              {!localStorage.getItem('token') && (
                <>
                  <Login
                    // onLogin={this.handleLogin}
                    onAuthNameChange={this.handleAuthNameChange}
                    getToken={this.handleToken}
                  />
                  <Register
                    // onLogin={this.handleLogin}
                    onAuthNameChange={this.handleAuthNameChange}
                    getToken={this.handleToken}
                  />
                </>
              )}
              {localStorage.getItem('token') && <Logout onLogout={this.handleLogout} />}
                <p>{this.state.authName}</p>
                {/* <p>{this.state.token}</p> */}
                <button type="button" onClick={this.handleHeaders}>Send Headers</button>
              </div>
            </nav>
            {/* <Link to="/login">Login</Link> */}
            {/* <Link to="/register">Register</Link> */}
            {/* <Login onAuthNameChange={this.handleAuthNameChange}/>
              <Register onAuthNameChange={this.handleAuthNameChange}/>
            <p>{this.state.authName}</p> */}
            <div>
              <Token />
            </div>
          </header>
          <main>
          <Routes>
            <Route path="/" element={<MainPage shop={shops} token={token}/>}></Route>
            <Route path="/cart" element={<Cart shops={shops} clientName={this.state.authName}/>}></Route>
            {shops.map((shop) => (<Route path={"/" + shop.id} element={<Shops food={shop.food} logo={shop.logo}/>}></Route>))}
            {/* <Route path="/login" element={<Login />}></Route> */}
            {/* <Route path="/register" element={<Register />}></Route> */}
          </Routes>
          {/* <Popup /> */}
          </main>
        </Router>
      </div>
    );
  }
}

export default App
