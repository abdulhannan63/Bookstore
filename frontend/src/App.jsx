import React, { useEffect } from 'react';
import "./App.css";
import Home from './pages/Home';
import Allbooks from './pages/Allbooks';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/Footer';
import {  Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import BookDetails from './components/ViewBookDetails/BookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import Favourates from './components/sidebar/Favourates';
import OrderHistory from './components/sidebar/OrderHistory';
import Setting from './components/sidebar/Setting';
import AllOrders from './pages/AllOrders';
import AddBooks from './pages/AddBooks';
import UpdateBook from './pages/UpdateBook';
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role);
  useEffect(() => {
  if(
    localStorage.getItem('token') &&
    localStorage.getItem('id') &&
    localStorage.getItem('role')){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    } 
  }, [])
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/all-books' element={<Allbooks />} />
          <Route path='/profile' element={<Profile />} >
           {role === "user" ?  <Route index element={<Favourates/>} ></Route>: <Route index element={<AllOrders />} ></Route>}

            <Route path='/profile/add-book' element={<AddBooks/>} ></Route>
            <Route path='/profile/orderhistory' element={<OrderHistory/>} ></Route>
            <Route path='/profile/settings' element={<Setting />} ></Route>
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/updatebook/:id' element={<UpdateBook />} />
          <Route path='/view-book-details/:id' element={<BookDetails />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App