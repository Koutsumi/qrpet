import { useState } from 'react'
import indianPig from '../../assets/images/porquinho-da-india-fofo-usando-oculos-escuros.jpg'


function Register() {

    const [buttonStatus, setButtonStatus] = useState(true)
    const [terms, setTerms] = useState(false)
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()

    return(
        <main className="w-full direction-col">
            <img src={indianPig} alt="" className='lg:none'/>
            
            
            <section className="w-[90%] direction-col">
                <h1 className='text-center my-4 uppercase text-terciaria font-bold tracking-[5px] text-[1.5em]'>Cadastre-se</h1>
                <p className='text-center my-1 font-bold text-[1.2em]'>Bem-vindo(a) a Qr Pet!</p>
                <p className='text-center mb-8 w-[270px]'>Após o cadastro será possível criar a página para o seu pet.</p>

                <div >
                    <form action="">
                        <label htmlFor="">Email</label>
                        <input className="inp-primary"type="email" placeholder='exemplo@qrpet.com'/>

                        <label htmlFor="">Nome completo</label>
                        <input className="inp-primary"type="text" name="" id="" placeholder='Qr Pet'/>

                        <label htmlFor="">Senha</label>
                        <input className="inp-primary"type="password" name="" id="" placeholder='Digite sua senha'/>

                        <label htmlFor="">Repita sua senha</label>
                        <input className="inp-primary"type="password" name="" id="" placeholder='Digite sua senha'/>

                        <div className='w-full direcrion-col text-center mb-4'>
                            <input onClick={() => {setTerms(!terms)}} type="checkbox" name="" id="" checked={terms}/>
                            <label htmlFor="" className='ml-2' >Concordo com os termos de uso</label>
                            <span className='block text-[0.7em]'>* A Qr Pet não se responsabiliza pelo seu pet</span>
                        </div>

                        <div className='w-[full] direction-col'>
                            <button disabled={buttonStatus ? "true" : "false"} className={buttonStatus ? "btn-disabled text-black " : "btn-primary"}>Cadastrar-se</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Register