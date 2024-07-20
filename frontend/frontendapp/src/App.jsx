  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import Nav from "./components/Nav"
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
 


 function App() {
 
  return (
    <>
    <BrowserRouter> 
    <Nav></Nav>
      <Routes>

<Route element={<PrivateComponent></PrivateComponent>}> 
        <Route path='/' element={ <ProductList></ProductList>}/>
        <Route path='add' element={ <AddProduct></AddProduct>}/>
        <Route path='/update/:id' element={ <UpdateProduct/>}/>
        <Route path='/logout' element={<h1>Logout Product Component</h1>}/>
        <Route path='/profile' element={<h1>Profile Component</h1>}/>
         </Route>

         <Route path='/singnup' element={ <Signup></Signup>}/>
         <Route path='/login' element={<Login/>}/>

      </Routes>
      </BrowserRouter>
      <Footer></Footer>
     </>
  )
}

export default App
