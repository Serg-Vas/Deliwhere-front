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
          console.log({res});
          
          console.log({token: googleUser.access_token});
          
  
          // Fetch phone number separately from Google People API
          // axios
          // .get('https://people.googleapis.com/v1/people/me?personFields=phoneNumbers,emailAddresses,names', {
          //   headers: { Authorization: `Bearer ${googleUser.access_token}` },
          // })
          // .then((res) => {
          //   console.log('User Data:', res.data);
          // })
          // .catch((err) => console.error('Error fetching user details:', err));
  
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
      const res = await axios.get('https://people.googleapis.com/v1/people/me?personFields=phoneNumbers,emailAddresses,names,addresses,photos', {
        headers: { Authorization: `Bearer ${googleUser.access_token}` },
      });
      console.log('User Data:', res.data);
  
      let phoneNumber = res.data.phoneNumbers ? res.data.phoneNumbers[0].value : '';
      phoneNumber = phoneNumber.replace(/\s+/g, ''); // Remove spaces from phone number
  
      let address = res.data.addresses ? res.data.addresses[0].formattedValue : 'No address available';
      let picture = res.data.photos ? res.data.photos[0].url : 'No picture available';
  
      const newUser = {
        name: userData.name,
        email: userData.email,
        password: 'defaultPassword', // You may want to use a generated password or authentication token
        address: address,
        phone: phoneNumber,
        picture: picture
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