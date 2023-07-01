import React, {useEffect, useState} from 'react';
import {  signInWithEmailAndPassword, onAuthStateChanged   } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom'


function Login() {

    const[modal, setModal] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid)
              navigate("/painel")
    
            
              // ...
            } else {
              console.log('Não logado')
            }
          });
    }, [])

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/painel")
            console.log(user);
            setModal(false)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setModal(true)
        });
       
    }

    return(
        <main className=" w-full min-h-[70vh] direction-col bg-no-repeat h-[60vh] bg-cover  lg:min-h-[90vh] lg:bg-login2">
            <section className="w-[90%] direction-col">
                <div>
                <h1 className='text-center my-4 uppercase text-terciaria font-bold tracking-[5px] text-[1.5em]'>Login</h1>
                <div className={modal ? "block absolute top-[20vh] text-white p-3 rounded-lg bg-terciaria animate-bounce lg:top-[30vh] lg:w-[300px] " : "hidden"}>*Senha ou email invalido</div>
                <div className="lg:p-12 lg:pb-5  lg:rounded-lg lg:bg-secundarioLogin ">
                    <form action="">
                        <label htmlFor="">E-mail</label> 
                        <input id="email-address" required className="inp-primary" type="email" name="" placeholder="exemplo@qrpet.com" onChange={(e)=>setEmail(e.target.value)}/>
                        <label htmlFor="">Senha</label>
                        <input id="password" required className="inp-primary" type="password" name="" placeholder="Senha" onChange={(e)=>setPassword(e.target.value)}/>
                        <div className="w-full direction-col my-4">
                        <button  onClick={onLogin} type="submit" className="btn-primary">Entrar</button>
                        <p><a href="/forgotpass" className='text-terciaria'>Esqueci minha senha</a></p>
                        <p>Não tem uma conta? <a href="/register" className='text-terciaria'>Cadastre-se</a></p>

                        </div>
                    </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login