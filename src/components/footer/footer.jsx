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
            <section className="bg-principal w-full h-auto flex flex-col items-center text-white text-center text-[1.3em]" >
               
                <h4 className="w-full m-2"> QRPET</h4>
                
                
                    <h4 className="w-full m-2">Desenvolvido por</h4>
                
                
                    <div className="w-full m-2"><h5 > Fernanda </h5>  <a href="#">linkeding </a>/<a href="#"> Git Hub</a></div><div className="w-full m-2"><h5>Flavio</h5> <a href="#">linkeding </a>/<a href="#"> Git Hub</a></div>
                
                
                   <h5 className="w-full m-2"> contato</h5>
                   <a href="#" className="w-full m-2">Email</a>
                    
              
                

            </section>
            <h6 className="flex items-center justify-center">©Ntec soluções {year}</h6>
            
        </footer>
    )
}

export default Footer