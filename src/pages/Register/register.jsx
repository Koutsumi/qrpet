import { useEffect, useState } from 'react'
import indianPig from '../../assets/images/porquinho-da-india-fofo-usando-oculos-escuros.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../services/firebase';

function Register() {

    const [buttonStatus, setButtonStatus] = useState(true)
    const [terms, setTerms] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPass] = useState()
    const [name, setName] =useState()
    const [confirmPass, setConfirmPass] = useState()
    const [statusPass, setStatusPass] =useState(true)


        const navigate = useNavigate();

     
        const onSubmit = async (e) => {
            e.preventDefault()
           
            await createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user);
                  navigate("/painel")
                  // ...
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorCode, errorMessage);
                  // ..
              });
              setEmail('')
              setPassword('')
          }

    function disaledButton() {

        if(statusPass === true && terms === true){
            setButtonStatus(false)
        }else{
            setButtonStatus(true)
        }
    }

    function verifyPass(){
        if(password === confirmPass){
            setStatusPass(true)
        }else if( password != confirmPass){
            setStatusPass(false)
        }
    }

    useEffect(() => {
        verifyPass()
        disaledButton()
    }, [password, confirmPass, terms])

    return(
        <main className="w-full direction-col mt-3">
            <img src={indianPig} alt="" className='lg:hidden mt-[-3vh]'/>
            
            
            <section className="w-[90%] direction-col">
                <h1 className='text-center my-4 uppercase text-terciaria font-bold tracking-[5px] text-[1.5em]'>Cadastre-se</h1>
                <p className='text-center my-1 font-bold text-[1.2em]'>Bem-vindo(a) a Qr Pet!</p>
                <p className='text-center mb-8 w-[270px]'>Após o cadastro será possível criar a página para o seu pet.</p>

                <div >
                    <form action="">
                        <label htmlFor="">Email</label>
                        <input className="inp-primary"type="email" value={email} name="email" id="email" placeholder='exemplo@qrpet.com' onChange={(e)=>{setEmail(e.target.value), disaledButton()}}/>

                        {/* <label htmlFor="">Nome completo</label>
                        <input className="inp-primary"type="text" value={name} name="name" id="name" placeholder='Qr Pet' onChange={(e)=>{setName(e.target.value), disaledButton()}}/> */}

                        <label htmlFor="">Senha</label>
                        <input className="inp-primary" type="password" value={password} name="password" id="password" placeholder='Digite sua senha' onChange={async (e)=>{setPass(e.target.value)}}/>

                        <label htmlFor="">Repita sua senha</label>
                        <input className={statusPass? "inp-primary" : "inp-primary mb-0"} type="password" value={confirmPass} name="confirmPassword" id="confirmPassword" placeholder='Digite sua senha' onChange={async (e)=>{setConfirmPass(e.target.value)}}/>
                        <span className={statusPass? "invisible mb-3" : "block mb-4 text-red"}>* Senhas não conferem</span>

                        <div className='w-full direcrion-col text-center mb-4'>
                            <input onChange={async () => {setTerms(!terms)}} type="checkbox" name="" id="" checked={terms}/>
                            <label htmlFor="" className='ml-2' >Concordo com os termos de uso</label>
                            <span className='block text-[0.7em]'>* A Qr Pet não se responsabiliza pelo seu pet</span>
                        </div>

                        <div className='w-[full] direction-col mb-4'>
                            <button disabled={buttonStatus ? true : false} className={buttonStatus ? "btn-disabled text-black " : "btn-primary cursor-pointer"} onClick={onSubmit} >Cadastrar-se</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Register