import { Routes,Route } from "react-router-dom"
import './App.css';
import LoginAndReg from "./component/pages/auth/LoginAndReg";
import Contact from "./component/pages/Contact";
import Home from "./component/pages/Home";
import Layout from "./component/pages/Layout";
import { useState } from "react";

function App() {
  const getToken = () => {
    const tokenString = localStorage.getItem("data");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  
  const [token, setToken] = useState(getToken())
  console.log('token', token)
  
  const saveToken = (userToken) => {
    localStorage.setItem("data", JSON.stringify(userToken));
    setToken(userToken);
  };
  
  
  if(!token){
    return <LoginAndReg setToken={saveToken}/>
  }
  const removeData = (userToken) => {
    window.location.reload(false);
    localStorage.removeItem("data", JSON.stringify(userToken));
  };
  let props = {
    tokens: token,
    removeDatas: removeData,
  };
  // console.log('props', props)
  return (
    <> 
      <Routes>
        <Route path="/" element={<Layout props={props}/>}>
        <Route path="/contact" element={<Contact />} />
        <Route index element={<Home />} />
          {/* <Route path="login" element={<LoginAndReg />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
