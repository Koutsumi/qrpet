import React, {useState} from 'react';
import {  signInWithEmailAndPassword, onAuthStateChanged   } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom'

function Login() {


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
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }

    return(
        <main className=" w-full direction-col lg:bg-secundaria bg-login bg-no-repeat h-[60vh] bg-cover lg:bg-none lg:min-h-[90vh]">
            <section className="w-[90%] direction-col">
                <div>
                    <form action="">
                        <label htmlFor="">E-mail</label>
                        <input id="email-address" required className="inp-primary" type="email" name="" placeholder="exemplo@qrpet.com" onChange={(e)=>setEmail(e.target.value)}/>
                        <label htmlFor="">Senha</label>
                        <input id="password" required className="inp-primary" type="password" name="" placeholder="Senha" onChange={(e)=>setPassword(e.target.value)}/>
                        <div className="w-full direction-col my-4">
                        <button  onClick={onLogin} type="submit" className="btn-primary">Entrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Login