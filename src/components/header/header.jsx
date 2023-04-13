import Logo from "../logo/logo"


function Header() {

    
    return(
        <header>
            <section className="w-full h-[6vh]  px-3  bg-principal flex flex-row items-center justify-between text-[1.3em] lg:h-[7vh]">
                <a href="/"><Logo/></a>
                <div> <a className="text-white mr-3" href="/login" >Login</a>  <a className="btn-primary" href="/register">Registrar</a></div>
            </section>
        </header>
    )
}

export default Header