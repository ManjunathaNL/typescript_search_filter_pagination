import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './Components/LoginForm';
import Users  from './Components/Users';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <LoginForm /> */}
      <Users />
    </div>
  );
}

export default App;
// import * as React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CssBaseline } from "@material-ui/core";

// import { Paged } from "./Components/Paged";
// import { Users } from './Components/Users';

/**
 * Server-Side (API) Pagination with the JSONPlaceholder API and React Router Hooks
 *
 * By Kevin Firko, kfirko@bitcurve.com / @firxworx, August 2020
 * Companion blog post to this sandbox: https://firxworx.com/blog/coding/react/pagination-in-react-with-a-back-end-api-and-react-routers-hooks-api/
 *
 * Note: also refer to tsconfig.json which updates from codesandbox react+ts defaults
 */

// export default function App() {
//   return (
//     <>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           <Route path="/">
//             {/* <Paged /> */}
//             <Users/>
//           </Route>
//           {/* ... other routes in your app ... */}
//         </Routes>
//       </Router>
//     </>
//   );
// }

