import React from 'react';
import { signOut } from "firebase/auth";
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc, query, where, getDocs } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react"
import db from '../../services/firebase'
import Icone from '../../components/svgs/icone';



function MyPet() {

   
    const { id } = useParams();
    const [myPet, setMyPet] = useState();
    const [petName, setPetName] = useState();
    const [details, setDetails] = useState();
    const [ownerAddress, setOwnerAddress] = useState();
    const [ownerFirst, setOwnerFirst] = useState();
    const [ownerSecond, setOwnerSecond] = useState();
    const [ownerPhone, setOwnerPhone] = useState();
    const [ownerPhoneSecond, setOwnerPhoneSecond] = useState();
    const [petBirth, setPetBirth] = useState();
    const [petGender, setPetGender] = useState();
    const [petImage, setPetImage] = useState();
    const [years, setYears] = useState();
    const ref_pet = collection(db, "qrpet")
    const [petGederBr, setPetGederBr] = useState();

    async function getPet(){
        if(myPet != undefined){
            setPetName(myPet.petName)
            setDetails(myPet.details)
            setOwnerAddress(myPet.owner_address)
            setOwnerFirst(myPet.owner_first)
            setOwnerSecond(myPet.owner_second)
            setOwnerPhone(myPet.owner_phone)
            setOwnerPhoneSecond(myPet.owner_phone_second)
            setPetBirth(myPet.petBirth)
            setPetImage(myPet.petImage)
            return myPet.petBirth;

        }else {
            console.log("ERROR")

        }

    }
    
    async function getGender(){
        setPetGender(myPet.petGender)
        return myPet.petGender;
    }
    useEffect(() => {
        
    

        const db_pet = doc(ref_pet, id)

        const data_pet = onSnapshot(db_pet, (QuerySnapshot) => {
            setMyPet({id: QuerySnapshot.id, ...QuerySnapshot.data()})
        })



    }, [id])


    

    useEffect(() => {

        const db_pet = doc(ref_pet, id)

        const data_pet = onSnapshot(db_pet, (QuerySnapshot) => {
            setMyPet({id: QuerySnapshot.id, ...QuerySnapshot.data()})
        })

    }, [id])

    useEffect(() => {
        getPet().then(age => { 
            const date = new Date();
            const yearsD = date.getFullYear();
            
           setYears( yearsD - parseInt(age));


    
        })
        getGender().then(gender => { 
            if(gender == "male"){
                setPetGederBr("Macho");
            }else if(gender == "female"){
                setPetGederBr("Fêmea");
            }
        })
 
    }, [myPet])
    return(
        <main>
    
                    <section className='w-full flex flex-col items-center justify-center text-lg'>
                    <img src={petImage} alt="" className='w-[150px] m-auto mt-3 h-[150px] bg-contain shadow-lg rounded-lg border-4 border-principal '/>
                           <div className="bg-principal flex flex-col w-[90%] mt-4 m-auto rounded-md items-center justify-center text-center text-white p-3">
                                <h1 className='font-bold text-3x1'>{petName}</h1>
                                <h1 className='font-bold text-3x1'>{years} Anos</h1>
                           </div>
                           <h1 className='mt-10 mb-5 text-principal font-bold text-[1.3em]'>{petGederBr}</h1>
                           
                            <div className="w-[80%] flex flex-col justify-center mt-4 ">
                                <div className="flex mb-2 items-center gap-2 text-[1.1em]"><Icone/><h1 className='text-principal'>Donos:</h1></div>
                                    <h2 className='ml-10'>{ownerFirst}</h2>
                                    <h2 className='ml-10 mb-4 '>{ownerSecond} </h2>
                                    <hr className='border-b-2 border-principal' />
                           </div>
                            <div className="w-[80%] flex flex-col justify-center mt-4 ">
                            <div className="flex mb-2 items-center gap-2 text-[1.1em]"><Icone/><h1 className='text-principal'>Endereço:</h1></div>
                                <h1 className='ml-10 mb-4' >{ownerAddress}</h1>
                                <hr className='border-b-2 border-principal' />
                            </div>
                            <div className="w-[80%] flex flex-col justify-center mt-4 ">
                            <div className="flex mb-2 items-center gap-2 text-[1.1em]"><Icone/><h1 className='text-principal'>Contato:</h1></div>
                                <h1 className='ml-10'>Principal: {ownerPhone}</h1>
                                <h1 className='ml-10 mb-4 '>Emergenta: {ownerPhoneSecond}</h1>
                                    <hr className='border-b-2 border-principal' />  
                            </div>
                            <div className="w-[80%] flex flex-col justify-center mt-4 ">
                            <div className="flex mb-2 items-center gap-2 text-[1.1em]"><Icone/><h1 className='text-principal'>Observação:</h1></div>

                            <h1 className='ml-10 mb-4 '>{details}</h1>
                            </div>

                            
                    </section>
               
                    
                        
              
             
        </main>
    )
}

export default MyPet