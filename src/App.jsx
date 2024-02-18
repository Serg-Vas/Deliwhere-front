import React from 'react';
import { BrowserRouter as Router,  Routes,  Route,  Link } from "react-router-dom";
import Shops from './components/Shops';
import Cart from './components/Cart';
import MainPage from './components/MainPage';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Token from './components/Token';
// import axios from 'axios';

const baseUrl = 'https://reqres.in/api/unknown/1'

class App extends React.Component{
  constructor(props) {
    super(props);
        this.state = {
            authName: '',
            isLoggedIn: false,
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
    
    handleLogin = () => {
      this.setState({ isLoggedIn: true });
    };

    handleLogout = () => {
      this.setState({ isLoggedIn: false });
      this.setState({ authName: '' });
    };

    handleAuthNameChange = (newAuthName) => {
      this.setState({ authName: newAuthName });
    };

    componentDidMount() {
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
        }

  render(){
    const { isLoggedIn } = this.state;
    const { shops } = this.state;
    console.log(shops)
    const sumWithInitial = shops.reduce(
      (accumulator, currentValue) => [...accumulator, ...currentValue.food],
      []
    );

    return (
      <div className="">
        {/* <Header /> */}
        <Router>
          <div className="Header">
            <nav>
              <ul>
                <li><h1><Link to="/">Shops</Link></h1></li>
                <li><h1>|</h1></li>
                <li><h1><Link to="/cart">Cart</Link></h1></li>
                {shops.length > 0 && shops.map((shop) => (<li><h1><Link to={"/"+shop.id}>{shop.name}</Link></h1></li>))}
              </ul>
              <div>
                {!isLoggedIn && <Login onLogin={this.handleLogin} onAuthNameChange={this.handleAuthNameChange} />}
                {!isLoggedIn && <Register onLogin={this.handleLogin} onAuthNameChange={this.handleAuthNameChange}/>}
                {isLoggedIn && <Logout onLogout={this.handleLogout}/>}
                <p>{this.state.authName}</p>
              </div>
              {/* <Link to="/login">Login</Link> */}
              {/* <Link to="/register">Register</Link> */}
              {/* <Login onAuthNameChange={this.handleAuthNameChange}/>
              <Register onAuthNameChange={this.handleAuthNameChange}/>
            <p>{this.state.authName}</p> */}
              <div>
                        <Token />
              </div>
            </nav>
          </div>

          <Routes>
            <Route path="/cart" element={<Cart food={sumWithInitial}/>}></Route>
            {shops.map((shop) => (<Route path={"/"+shop.id} element={<Shops food={shop.food}/>}></Route>))}
            <Route path="/" element={<MainPage shop={shops}/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        {/* <Popup /> */}
        </Router>
      </div>
    );
  }
}

export default App
