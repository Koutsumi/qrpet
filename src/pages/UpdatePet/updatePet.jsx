import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc} from "firebase/firestore"
import  db  from '../../services/firebase'

function UpdatePet() {

    const { id } = useParams()
    const [myPet, setMyPet] = useState()

    const ref_pet = collection(db, "qrpet")

    useEffect(() => {

        const db_pet = doc(ref_pet, id)

        const data_pet = onSnapshot(db_pet, (QuerySnapshot) => {
            setMyPet({id: QuerySnapshot.id, ...QuerySnapshot.data()})
        })

    }, [id])

    console.log(myPet)

    return(
        <main>
            <section>
                <h1>UpdatePet</h1>
            </section>
        </main>
    )
}

export default UpdatePet