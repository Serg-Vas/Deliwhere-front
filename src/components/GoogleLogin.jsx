// import React, { useState, useEffect } from 'react';
// import { getToken, getUsers, createJWT } from './API';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const MyGoogleLogin = ({getToken}) => {
//   const [username, setUsername] = useState('Alice');
//   const [password, setPassword] = useState('Thrudy');
//   const [showModal, setShowModal] = useState(false);
//   const [token, setToken] = useState(null);
//   const [googleUser, setGoogleUser] = useState(null);
//   const [googleProfile, setGoogleProfile] = useState(null);

//   const handleLogin = async () => {
//     const userData = await getUsers(username, password);
//     // const response1 = await getToken(username, password);
//     console.log(userData);
//     // console.log(response1);
//     if (userData.status === 200) {
//       // Successful login
//       console.log('User authenticated successfully.');
//       // console.log(username);
//       // onAuthNameChange(); // Вызываем колбэк для изменения authName в App.jsx
//       const token = await createJWT(userData.data)
//       console.log(token, userData.data);
//       const key = "token"
//       const tokenItem = localStorage.getItem(key) || token
//       console.log(tokenItem);
//       localStorage.setItem(key, tokenItem)
//       console.log(tokenItem);
//       // onLogin() 
//       // console.log(onLogin());
//       getToken(token)

//     } else {
//       // Failed login
//       console.error('Invalid username or password.');
//       // Display the modal
//       setShowModal(true);
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: (codeResponse) => {
//       console.log({codeResponse});
//       setGoogleUser(codeResponse)},
//     onError: (error) => console.error('Google Login Failed:', error),
//   });

//   useEffect(() => {
//     if (googleUser) {
//       axios
//         .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
//           headers: {
//             Authorization: `Bearer ${googleUser.access_token}`,
//             Accept: 'application/json',
//           },
//         })
//         .then((res) => {
//           setGoogleProfile(res.data);
//           setUsername(res.data.name); // Update username with Google profile name
//           console.log('Google User Data:', res.data);
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [googleUser]);

//   const googleLogoutHandler = () => {
//     googleLogout();
//     setGoogleProfile(null);
//   };

//   return (
//     <div>
//       <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
//         GoogleLogin
//       </button>

//       {showModal && (
//         <div className="modal text-dark" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Login</h5>
//                 <button type="button" className="close" onClick={() => setShowModal(false)}>
//                   <span aria-hidden="true">&times;</span>
//                 </button>
//               </div>
//               <div className="modal-body">

//                 {googleProfile ? (
//                   <div>
//                     <img src={googleProfile.picture} alt="user" />
//                     <p>Name: {googleProfile.name}</p>
//                     <p>Email: {googleProfile.email}</p>
//                     <button className="btn btn-secondary" onClick={googleLogoutHandler}>
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <button className="btn btn-danger" onClick={googleLogin}>
//                     Sign in with Google 🚀
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
//     };

// export default MyGoogleLogin;

import React, { useState, useEffect } from 'react';
import { getUsersGoogle, createUser, createJWT, createUser2 } from './API';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const MyGoogleLogin = ({ onAuthNameChange, onLogin, getToken }) => {
  const [showModal, setShowModal] = useState(false);
  const [googleUser, setGoogleUser] = useState(null);
  const [googleProfile, setGoogleProfile] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log({ codeResponse });
      setGoogleUser(codeResponse);
    },
    onError: (error) => console.error('Google Login Failed:', error),
  });

  useEffect(() => {
    if (googleUser) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
          headers: {
            Authorization: `Bearer ${googleUser.access_token}`,
            Accept: 'application/json',
          },
        })
        .then(async (res) => {
          setGoogleProfile(res.data);
          const email = res.data.email;

          try {
            const userData = await getUsersGoogle(email);
            console.log('Google User Data:', userData);

            if (userData.status === 200 && userData.data && Object.keys(userData.data).length > 0) {
              console.log('User authenticated successfully.');
              const token = await createJWT(userData.data);
              localStorage.setItem('token', token);
              getToken(token);
            } else {
              console.log('User not found, registering...');
              registerNewUser(res.data);
            }
          } catch (error) {
            if (error.response && error.response.status === 404) {
              console.warn('User not found (404). Registering new user...');
              registerNewUser(res.data);
            } else {
              console.error('Error fetching user:', error);
            }
          }
        })
        .catch((err) => console.error('Google OAuth error:', err));
    }
  }, [googleUser]);

  const registerNewUser = async (userData) => {
    try {
      const newUser = {
        name: userData.name,
        email: userData.email,
        password: 'defaultPassword', // You may want to use a generated password or authentication token
        address: 'userData.address',
        phone: 'userData.phone'
      };
      // const response = await createUser(newUser);
      const response = await createUser2(newUser);
      // const data = JSON.parse(response.config.data);
      const data = await response.json();
      // const data = response.config.data; // JSON.parse(response.config.data);
      console.log('Registration response:', response, { status: response.status });

      if (response.status === 201) {
        console.log('User registered successfully.', data);
        // const token = await createJWT(registerData.config.data);
        // localStorage.setItem('token', token);
        // getToken(token);
        console.log({email: data.email});
        
        const userData = await getUsersGoogle(data.email);
        console.log(userData);
        if (userData.status === 200) {
          console.log('User authenticated successfully.');
          const token = await createJWT(userData.data)
          console.log(token, userData.data);
          const key = "token"
          const tokenItem = localStorage.getItem(key) || token
          console.log(tokenItem);
          localStorage.setItem(key, tokenItem)
          console.log(tokenItem);
          getToken(token);
        } else {
          console.error('Invalid username or password.');
          setShowModal(true);
        }
      } else {
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const googleLogoutHandler = () => {
    googleLogout();
    setGoogleProfile(null);
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
        Google Login
      </button>

      {showModal && (
        <div className="modal text-dark" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Google Login</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {googleProfile ? (
                  <div>
                    <img src={googleProfile.picture} alt="user" />
                    <p>Name: {googleProfile.name}</p>
                    <p>Email: {googleProfile.email}</p>
                    <button className="btn btn-secondary" onClick={googleLogoutHandler}>
                      Logout
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-danger" onClick={googleLogin}>
                    Sign in with Google 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGoogleLogin;