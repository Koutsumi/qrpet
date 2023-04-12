import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react"
import  db  from '../../services/firebase'

function Home() {


    const [pets, setPets] = useState([{}])
  
      const ref_pets = collection(db, 'qrpet')

      useEffect(() => {

        const list_pets = onSnapshot(ref_pets, (querySnapshot) => {
             const items_pets= []   

             querySnapshot.forEach(doc => {
                items_pets.push({id: doc.id, ...doc.data()})
            })
            setPets(items_pets)
            return() => {
                list_pets()
            }
        })

    }, [])


    return(
        <main className="bg-black">
            <section>
                <h1>Home</h1>

                <button className="btn-primary"><svg width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.969975 34.3083C0.323325 33.8472 0 33.3012 0 32.6704C0 32.0395 0.323325 31.4942 0.969975 31.0343L19.9168 17.5231L0.90531 3.96574C0.30177 3.53535 0 2.99737 0 2.35178C0 1.70619 0.323325 1.15283 0.969975 0.6917C1.61663 0.230567 2.38226 0 3.26688 0C4.1515 0 4.91627 0.230567 5.56119 0.6917L27.2886 16.2319C27.5473 16.4163 27.731 16.6162 27.8396 16.8314C27.9482 17.0466 28.0017 17.2771 28 17.5231C28 17.769 27.9456 17.9996 27.837 18.2148C27.7284 18.43 27.5456 18.6298 27.2886 18.8142L5.49653 34.3544C4.89299 34.7848 4.14891 35 3.26429 35C2.37967 35 1.6149 34.7694 0.969975 34.3083Z" fill="white"/>
</svg></button>
                <br />
                <br />
                
                <input type="text" placeholder="Compartilhar" className="inp-primary"/>
                {
                    pets.map(pet => {
                        return(
                            <p key={pet.id}>{pet.Nome}</p>
                        )
                    })
                }

                
            </section>
        </main>
    )
}

export default Home