import React, { useState } from 'react';
import { getToken, getUsers, createJWT } from './API';

const Login = ({onAuthNameChange, onLogin, getToken}) => {
  const [username, setUsername] = useState('Serhii Vasylevskyi');
  const [password, setPassword] = useState('qwerty');
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    const userData = await getUsers(username, password);
    // const response1 = await getToken(username, password);
    console.log(userData);
    // console.log(response1);
    if (userData.status === 200) {
      // Successful login
      console.log('User authenticated successfully.');
      // console.log(username);
      // onAuthNameChange(); // Вызываем колбэк для изменения authName в App.jsx
      const token = await createJWT(userData.data)
      console.log(token, userData.data);
      const key = "token"
      const tokenItem = localStorage.getItem(key) || token
      console.log(tokenItem);
      localStorage.setItem(key, tokenItem)
      console.log(tokenItem);
      // onLogin() 
      // console.log(onLogin());
      getToken(token)

    } else {
      // Failed login
      console.error('Invalid username or password.');
      // Display the modal
      setShowModal(true);
    }
  };

  return (
        <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
             Login
            </button>
    
          {showModal && (
            <div className="modal text-dark" tabIndex="-1" role="dialog" style={{ display: "block"}}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Login</h5>
                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                  <form>
                    <div>
                      <label htmlFor="username">Username:</label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleLogin}>
                      Login
                    </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <div>
            <p>{authName}</p>
          </div> */}
        </div>
      );
    };

export default Login;







// import React, { useState } from 'react';
// import { getUsers } from './API';

// const Login = () => {
//   const [username, setUsername] = useState('Alex3');
//   const [password, setPassword] = useState('password');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showModal, setShowModal] = useState(false); // State to control modal visibility
//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     if (name === 'name') {
//       setUsername(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//     setErrorMessage('');
//   };

//   const handleFormSubmit = event => {
//     event.preventDefault();
  
//     getUsers(username, password)
//       .then(data => {
//         console.log('API Response:', data);
//         // const users = data.users;
//         // Check if the 'users' property exists in the response
//         const users = data && data.users;

//         if (!users || !Array.isArray(users)) {
//           // Handle the case where 'users' is not defined or not an array
//           console.error('Invalid response format');
//           return;
//         }
//         // console.log(users);
//         // console.log("Username:", username);
//         // console.log("Password:", password);
//         // Перевірка кожного користувача
//         const validUser = users.find(user => user.name === username && user.password === password);
//         // console.log("Valid User:", validUser);
//         if (validUser) {
//           console.log('Successful login');
//           setShowModal(false); // Закриття модального вікна при успішному вході
//         } else {
//           setErrorMessage('Невірне ім\'я користувача або пароль');
//         }
//       })
//       .catch(error => {
//         console.error('Помилка при отриманні даних', error);
//       });
//   };

//   return (
//     <div>
//       <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//         Login
//       </button>

//       {/* Bootstrap Modal */}
//       {showModal && (
//         <div className="modal text-dark" tabIndex="-1" role="dialog" style={{ display: "block" }}>
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Login</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={() => setShowModal(false)}
//                 >
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleFormSubmit}>
//                   <div>
//                     <label htmlFor="name">Username:</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={username}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="password">password:</label>
//                     <input
//                       type="password"
//                       id="password"
//                       name="password"
//                       value={password}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                   {errorMessage && <p>{errorMessage}</p>}
//                   <button type="submit" className="btn btn-primary">
//                     Login
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
