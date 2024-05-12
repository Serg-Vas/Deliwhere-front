import React, { useState, useEffect } from 'react';
import { getUsers, createUser } from './API';
import axios from 'axios';

const Register = ({onAuthNameChange, onLogin}) => { {/*props ???*/}
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data, e.target, "1234");
    const formJSON = Object.fromEntries(data.entries());
    console.log(formJSON, 'formJSON');
    const fetchCart = async () => {
      const usersData = await createUser(formJSON); //data
      console.log(usersData, "1234");
      const newAuthName = formJSON.name;
      // usersData === undefined ? ((() => {onLogin();onAuthNameChange(newAuthName);})()) : console.log("Не удалось создать аккаунт");
      setUser(usersData)
      // try {
      //   const response = await axios.post('http://localhost/DeliveryBack/generateToken.php', usersData);
      //   return response;
      // } catch (error) {
      //   return error;
      // }
      // return usersData
    };
    // const encodeUserData = async (usersData) => {
    // }
    fetchCart();
    console.log(user);
    // encodeUserData(usersData);
    setShowModal(false);
  };
  
  return (
    <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          Register
        </button>

      {showModal && (
        <div className="modal text-dark" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Form</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" className="form-control" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="phone" className="form-control" id="phone" name="phone" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" id="address" name="address" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" required />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button> {/*disabled={props.sum <= 0} ???*/}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
