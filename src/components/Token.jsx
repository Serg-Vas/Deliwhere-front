// import React, { useState } from 'react';

// const Token = () => {
//   const [token, setToken] = useState('');

//   const login = async () => {
//     // Make a request to your PHP backend to get the JWT token
//     const response = await fetch('http://win.test/generate-token.php');
//     const data = await response.json();

//     // Store the token in the React state
//     setToken(data.token);
//     console.log(data.token);
//   };

//   const accessProtectedPage = async () => {
//     // Make a request to your protected PHP page with the token
//     const response = await fetch('http://win.test/', {
//       headers: {
//         'Authorization': token,
//       },
//     });
//     const result = await response.text();

//     // Display the result
//     console.log(result);
//   };

//   return (
//     <div>
//       {/* <h1>React Token</h1> */}
//       <button onClick={login}>Generate Token</button>
//       <input type="text" value={token}/>
//       <button onClick={accessProtectedPage}>Access Protected Page</button>
//     </div>
//   );
// };

// // export default Token;
