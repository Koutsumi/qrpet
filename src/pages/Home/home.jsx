import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc} from "firebase/firestore"
import { useEffect, useState } from "react"
import  db  from '../../services/firebase'

function Home() {

    return(
        <main className="bg-black">
            <section>
                <h1>Home</h1>



                
            </section>
        </main>
    )
}

export default Home