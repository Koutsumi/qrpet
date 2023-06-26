import React from 'react';
import firebase from '../../services/firebase';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPass() {

  const [email, setEmail] = useState('');
  const [modal, setModal] = useState(false);

  const auth = getAuth(); 

  const triggerResetEmail = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email).then((res) =>{
      console.log("Password reset email sent")
      setModal(true)
    }).catch(err => {
      console.log(err)
    })
    
  }

  return (
    <main>
      <section className="direction-col w-full my-4">
        <div className="direction-col w-[90%] min-h-[60vh]">
          <h1 className="text-center my-4 uppercase text-terciaria font-bold tracking-[5px] text-[1.5em]">
            Esqueci minha senha
          </h1>

          <form onSubmit={triggerResetEmail} className="flex flex-col w-[275px]">
            <label htmlFor="email">E-mail cadastrado no sistema</label>
            <input
              className="inp-primary"
              required
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button className="btn-primary">Recuperar acesso</button>
          </form>

          <a href="/login">Voltar</a>
        </div>
      </section>

      <section className={modal ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-1/5 sm:translate-y-1/5": "hidden"}>
        <div className='direction-col w-350 h-250 bg-secundaria rounded-lg text-center p-4'>
              <p>Um e-mail foi enviado para {email}</p>
              <p className='mb-4'>Acesse o link fornecido para redefinir sua senha</p>
              <button className="btn-primary"><a href="/login">OK</a></button>
        </div>
      </section>
    </main>
  );
}

export default ForgotPass;
