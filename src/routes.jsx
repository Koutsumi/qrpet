import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home'
import Login from './pages/Login/login';
import MyPet from './pages/MyPet/myPet';
import Painel from './pages/Painel/painel';
import CreatePet from './pages/CreatePet/createPet';
import Register from './pages/Register/register';
import UpdatePet from './pages/UpdatePet/updatePet';


function RoutesApp(){
    return(
        <Router>

        <Routes>

            <Route path="/" element = {<Home/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/mypet/:id" element = {<MyPet/>}/>
            <Route path="/painel" element = {<Painel/>}/>
            <Route path="/createpet" element = {<CreatePet/>}/>
            <Route path="/register" element = {<Register/>}/>
            <Route path="/updatepet/:id" element = {<UpdatePet/>}/>

            
        </Routes>
        
        </Router>
    )
}
export default RoutesApp