import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc } from "firebase/firestore"
import db from '../../services/firebase'

function UpdatePet() {

    const { id } = useParams()
    const [myPet, setMyPet] = useState()

    const [petPhoto, setPetPhoto] = useState()
    const [petName, setPetName] = useState()
    const [petGender, setPetGender] = useState()
    const [petBirth, setPetBirth] = useState()
    const [owner_first, setOwner_first] = useState()
    const [owner_second, setOwner_second] = useState()
    const [owner_phone, setOwner_phone] = useState()
    const [owner_phone_second, setOwner_phone_second] = useState()
    const [owner_address, setOwner_address] = useState()
    const [owner_district, setOwner_district] = useState()
    const [owner_city, setOwner_city] = useState()
    const [owner_uf, setOwner_uf] = useState()
    const [details, setDetails] = useState()

    const ref_pet = collection(db, "qrpet")

    useEffect(() => {

        const db_pet = doc(ref_pet, id)

        const data_pet = onSnapshot(db_pet, (QuerySnapshot) => {
            setMyPet({ id: QuerySnapshot.id, ...QuerySnapshot.data() })
        })

    }, [id])

    useEffect(() => {

        console.log(myPet)

        if (myPet != undefined) {
            setPetPhoto(myPet.petImage)
            setPetName(myPet.petName)
            setPetGender(myPet.petGender)
            setPetBirth(myPet.petBirth)
            setOwner_first(myPet.owner_first)
            setOwner_second(myPet.owner_second)
            setOwner_phone(myPet.owner_phone)
            setOwner_phone_second(myPet.owner_phone_second)
            setOwner_address(myPet.owner_address)
            setOwner_district(myPet.owner_district)
            setOwner_city(myPet.owner_city)
            setOwner_uf(myPet.owner_uf)
            setDetails(myPet.details)
        } else {
            console.log("ERROR")
        }

    }, [myPet])

    return (
        // TODO recriar o form e puxar o value 
        // * depois fazer o função do update
        <>
           {petGender}
        </>
    )
}

export default UpdatePet