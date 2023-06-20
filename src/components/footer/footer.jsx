import { useEffect, useState } from "react"
import Logo from "../logo/logo"

function Footer() {
    const [year, setYear] = useState()

    useEffect(() => {
        const today = new Date()
        const thisYear = today.getFullYear()
        setYear(thisYear)
    }, [])

    return(

        <footer>
            <section className="bg-principal w-full flex flex-col items-center justify-center text-white text-center text-[1.2em] pb-2" >
               
                <h4 className="w-full my-2"> QrPet </h4>
                
                    <h4 className="w-full m-2">Desenvolvido por</h4>
                    <div className="w-[900px] lg:flex flex-row">
                    <div className="w-full m-2  "><h5 > Fernanda M Baccarini</h5>  <a href="https://www.linkedin.com/in/fernanda-matuda-baccarini-455b39171/" target="_blank">Linkedin </a>|<a href="https://github.com/Koutsumi" target="_blank"> Git Hub</a></div><div className="w-full m-2"><h5>Flavio Brancalhão</h5> <a href="https://www.linkedin.com/in/flavio-brancalhao-659574169/" target="_blank">Linkedin </a>|<a href="https://github.com/FlavioBrancalhao" target="_blank"> Git Hub</a></div>
                    </div>
                
            </section>
            <h6 className="flex items-center justify-center">©Ntec soluções {year}</h6>
            
        </footer>
    )
}

export default Footer