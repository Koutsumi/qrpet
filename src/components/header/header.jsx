import Logo from "../logo/logo"


function Header() {

    
    return(
        <header>
            <section className="w-full py-4 lg:py-9 bg-principal flex flex-row items-center justify-center text-[1.1em] lg:h-[7vh]">
                <div className="w-[90%] direction-row ">
                    <a href="/"><Logo/></a>
                    <div> <a className="text-white mr-3" href="/login" >Login</a>  <a className="btn-primary" href="/register">Registrar</a></div>
                </div>
            </section>
        </header>
    )
}

export default Header