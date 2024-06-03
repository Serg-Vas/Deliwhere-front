// import React from 'react';
// import { BrowserRouter as Router,  Routes,  Route,  Link } from "react-router-dom";
// import Register from './Register';
// import Login from './Login';

// class Popup extends React.Component {
//   state = {
//     loginPopupVisible: false,
//     registerPopupVisible: false,
//   };

// //   componentDidUpdate(prevProps, prevState) {
// //     if (prevState.loginPopupVisible !== this.state.loginPopupVisible) {
// //       document.body.classList.toggle('popup-open', this.state.loginPopupVisible);
// //     }

// //     if (prevState.registerPopupVisible !== this.state.registerPopupVisible) {
// //       document.body.classList.toggle('popup-open', this.state.registerPopupVisible);
// //     }
// //   }

//   handleLogin = () => {
//     this.setState(prevState => ({
//       loginPopupVisible: !prevState.loginPopupVisible,
//       registerPopupVisible: false,
//     }));
//   };

//   handleRegister = () => {
//     this.setState(prevState => ({
//       loginPopupVisible: false,
//       registerPopupVisible: !prevState.registerPopupVisible,
//     }));
//   };

//   render() {
//     return (
//       // <Router>
//         <div>
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/login" onClick={this.handleLogin}>
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/register" onClick={this.handleRegister}>
//                   Register
//                 </Link>
//               </li>
//             </ul>
//           </nav>

//           {this.state.loginPopupVisible && (
//             <div className="popup">
//               <h2>Login Popup</h2>
//               <Login />
//             </div>
//           )}

//           {this.state.registerPopupVisible && (
//             <div className="popup">
//               <h2>Register Popup</h2>
//               <Register />
//             </div>
//           )}

//         <Routes>
//           <Route path="/login"></Route>
//           <Route path="/register"></Route>
//         </Routes>
//         </div>
//       // </Router>
//     );
//   }
// }

// export default Popup;