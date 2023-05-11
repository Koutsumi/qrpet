import React from 'react';

import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc, query, where, getDocs } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from "react"
import db from '../../services/firebase'
import { Link } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Painel(){

  const auth = getAuth();
  const navigate = useNavigate();
  const [qrpet, setQrpet] = useState([]);
  const ref_pets = collection(db, 'qrpet');
  const [uid, setUid] = useState();
  const [quantpet, setQuantpet] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [petId, setPetId] = useState();
  const [Nome, setNome] = useState();
  const [tmQrcode, setTmQrCode] = useState(false);
  




  
  


  function getIdPet(pet){
    setPetId(pet.id)
    setNome(pet.petName)
    
  }


  async function cadastrarnovopet() {
    await navigate("/createpet");
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid)
      // ...
    } else {
      console.log('Não logado')
      
    }
  });




  async function buscarPets(id) {

    const petuser = query((ref_pets), where("userid", "==", `${id}`));
    const idpetmap = [];
    const umabusca = await getDocs(petuser);
    umabusca.forEach((doc) => {

      idpetmap.push({ id: doc.id, ...doc.data() });
      setQrpet(idpetmap);

    })


        console.log(idpetmap.length)
        if (idpetmap.length > 0){
          setQuantpet(true)
    
        }else if(idpetmap.length == 0){
          setQuantpet(false)
        }
      
    
 
    }
    

 



  async function deletePet(petId) {

    const burguer_ref = doc(ref_pets, petId)
    await deleteDoc(burguer_ref)
    location.reload();
    toast.success('Ação realizada com sucesso!');
  }
  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user.uid)
        setUid(user.uid)

        // ...
      } else {
        console.log('Não logado')
        navigate("/login")
      }
    });

    buscarPets(uid);

  
  }, [uid]);




  return (
    <main className='min-h-[70vh]'>
      <section className='flex flex-col items-center justify-center'>
        <h1 className='text-[2em] text-principal m-2'>Meus pets</h1>
        <div  className={quantpet ? "hidden" : "block text-red text-2xl"}>Não há pets cadastrados 😿 </div>


        {
          qrpet.map(pet => {

            return (
              
              <section key={pet.id} className=" w-[95%] my-1 m-auto max-h-[40vh] pt-2 h-auto bg-principal rounded-[5px] lg:w-[600px]">
                <div className="flex ">
                  <div className="">
                    <img src={pet.petImage} alt="" className='w-[120px] h-[100px] mt-6 m-2 lg:w-[150px] rounded-lg lg:h-[130px]' />

                  </div>
                  <div className=" text-white">
                    <h1 className='text-center mb-1 text-[1.2em]'>Oi eu sou {pet.petName}</h1>
                    <h2>Contato: {pet.owner_phone}</h2>
                    <h2>Endereço: {pet.owner_address}</h2>
                    <h2>Donos: {pet.owner_first} | {pet.owner_second}</h2>
                    


                  </div>

                </div>
                <div className="w-[100%]  flex items-center justify-around mt-3 ">
                  <button onClick={() => {setModal2(true); getIdPet(pet)}} className='btn-primary w-[45%] '>opções</button>
                  <button onClick={() => {setModal(true); getIdPet(pet)}} className='btn-primary w-[45%] '>Apagar</button>
                  
                  

                </div>
                
                
                <div className={modal2 ? "shadow-md shadow-[black] w-[95%] h-[200px] px-2 rounded-lg bg-secundaria flex flex-col fixed text-principal top-8 left:calc(50% - 50px) items-center justify-around  lg:w-[600px] " : "hidden invisible"} >
                <h1 className='mb-2 text-[1.1em]'>{pet.petName}</h1>
                  <div className="flex flex-row justify-around">
                    
                    <Link className='btn-primary w-[150px] p-5 mr-10 text-center' to={`/mypet/${petId}`}>Acessar</Link>
                    <Link className='btn-primary w-[150px] p-5  text-center' to={`/updatepet/${petId}`}>Editar</Link>
                    
                  </div>
                  
                  <div className="flex flex-row justify-around">

                                                         { /*TODO alterar para o site */}
                    <button className='btn-primary w-[150px] p-5 mr-10' onClick={() => {setTmQrCode(true); getIdPet(pet)}}>QR code</button>
                      <div className={tmQrcode ? "shadow-md shadow-[black] w-[95%] h-[200px] rounded-lg bg-secundaria flex flex-row fixed text-principal top-8 left:calc(50% - 50px) items-center justify-around lg:w-[600px] " : "hidden invisible"}>
                     
                      <a href={`https://chart.googleapis.com/chart?chs=78x78&cht=qr&chl=http://localhost:5173/mypet/${petId}`} className='btn-primary p-5 ' target='_blank'>2CM</a>
                      <a href={`https://chart.googleapis.com/chart?chs=114x114&cht=qr&chl=http://localhost:5173/mypet/${petId}`} className='btn-primary p-5 ' target='_blank'>3CM</a>
                      <a href={`https://chart.googleapis.com/chart?chs=152x152&cht=qr&chl=http://localhost:5173/mypet/${petId}`} className='btn-primary p-5 ' target='_blank'>4CM</a>
                      <a href={`https://chart.googleapis.com/chart?chs=188x188&cht=qr&chl=http://localhost:5173/mypet/${petId}`} className='btn-primary p-5 ' target='_blank'>5CM</a>
                      <button className='absolute z-[99] text-6xl top-[-20px] right-[5px]'onClick={() => {setTmQrCode(false)}}>x</button>
                      </div>
                    <button onClick={() => setModal2(false)} className='btn-primary w-[150px] p-5 ' >Fechar</button>
                  </div>
                </div>
                {/*  incio do modal de apagar */}
                <div className={modal ? "shadow-md shadow-[black] w-[95%] h-[200px] rounded-lg bg-secundaria flex flex-col fixed text-principal top-8 left:calc(50% - 50px) items-center justify-around lg:w-[600px] " : "hidden invisible"} >
                  <h1>Deseja apagar o pet {Nome} ?</h1>
                  <div className="flex flex-row justify-around">
                    <button onClick={() => deletePet(petId)} className='btn-primary w-[100px] p-5 mr-10'>Sim</button>
                    <button onClick={() => setModal(false)} className='btn-primary w-[100px] p-5 '>Não</button>
                  </div>
                </div>

              </section>

            )
          }

          )}

        <button onClick={cadastrarnovopet} className='btn-primary w-[60%] m-5 lg:w-[40%] '>Cadastrar Novo Pet</button>

      </section>
    </main>
  )
}

export default Painel