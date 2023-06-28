import { useEffect, useState } from "react"
import Logo from "../logo/logo"
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from "firebase/auth";





function Header() {

    const [logado, setLogado]= useState(false);
    const auth = getAuth();
    

    const handleLogout = () => {
        signOut(auth).then(() => {
          // Sign-out successful.
          
          console.log("Signed out successfully")
        }).catch((error) => {
          // An error happened.
        });
      }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.Use
            setLogado(true)
            
            // ...
          } else {
            console.log('Não logado')
            
            setLogado(false)
          }
        });
    
        handleLogout 
    
      }, []);
    return(
        <header>
            <section className="w-full py-4 lg:py-9 bg-principal flex flex-row items-center justify-center text-[1.1em] lg:h-[7vh]">
                <div className="w-[90%] direction-row ">
                    <a href="/"><Logo/></a>

                    <div className={logado ? "hidden" : "block"}> <a className="notranslate text-white mr-3" href="/login" >Login</a> <a className="btn-primary" href="/register">Registrar</a></div>
                    <div className={logado ? "block" : "hidden"}> <a className="notranslate text-white mr-3" href="/painel" >Meus pets</a><a className="btn-primary " onClick={handleLogout} href="/" >Sair</a></div>
                </div>
            </section>
        </header>
    )
}

export default Header