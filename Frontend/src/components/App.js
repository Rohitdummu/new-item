import Signin from './signin'
import Signup from './signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navb from './navbar';
import Dash from './dashboard';

import React,{createContext, useState} from 'react';
import PrivateRoutes from './protect'
import Alert from './test';


export const Store = createContext()


function App() {
  const [login,setlogin] = useState(false)
  const [Dashname,setDashname] = useState("")
  return (
  <div >
    <BrowserRouter>
      <Store.Provider value={{ login, setlogin, Dashname, setDashname }}>
      <Navb/>
      <Routes>
        <Route path='/' element={<Signin/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/test' element={<Alert/>} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dash/>} /> 
        </Route>
      </Routes>
      </Store.Provider>
    </BrowserRouter>
  </div>
  );
}

export default App;
