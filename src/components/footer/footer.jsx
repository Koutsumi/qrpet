import { useEffect, useState } from "react"

function Footer() {
    const [year, setYear] = useState()

    useEffect(() => {
        const today = new Date()
        const thisYear = today.getFullYear()
        setYear(thisYear)
    }, [])

    return(

        <footer>
            <section className="bg-principal w-full h-auto flex flex-col items-center text-white text-center text-[1.3em] pb-2" >
               
                <h4 className="w-full m-2"> QRPET</h4>
                
                
                    <h4 className="w-full m-2">Desenvolvido por</h4>
                
                    <div className="lg:flex flex-row">
                    <div className="w-full m-2  "><h5 > Fernanda </h5>  <a href="https://www.linkedin.com/in/fernanda-matuda-baccarini-455b39171/" target="_blank">linkedin </a>/<a href="https://github.com/Koutsumi" target="_blank"> Git Hub</a></div><div className="w-full m-2"><h5>Flavio</h5> <a href="https://www.linkedin.com/in/flavio-brancalhao-659574169/" target="_blank">linkedin </a>/<a href="https://github.com/FlavioBrancalhao" target="_blank"> Git Hub</a></div>
                    </div>
                

                    
              
                

            </section>
            <h6 className="flex items-center justify-center">©Ntec soluções {year}</h6>
            
        </footer>
    )
}

export default Footer