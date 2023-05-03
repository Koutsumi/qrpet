import React from 'react';
import { signOut } from "firebase/auth";
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc, query, where, getDocs } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import db from '../../services/firebase'
import { Link } from "react-router-dom";
import img from '../../assets/images/teste.png'





function Painel() {

  const auth = getAuth();
  const navigate = useNavigate();
  const [qrpets, setQrpet] = useState([]);
  const ref_pets = collection(db, 'qrpet');
  const [uid, setUid] = useState();
  const [quantpet, setQuantpet] = useState(true); 
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/login");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }
  async function cadastrarnovopet(){
   await navigate("/createpet");
  }

  

  async function testando(id) {

    const petuser = query((ref_pets), where("userid", "==", `${id}`));
    const idpetmap = [];
    const iddopet = [];
    const umabusca = await getDocs(petuser);
    umabusca.forEach((doc) => {
      
      idpetmap.push({id:doc.id,  ...doc.data()});
      

    })
    
    setQrpet(idpetmap);

    if(idpetmap.length == 0 ){
       setQuantpet(false);
       
    }
  }
  
   async function openModal(){
    let opened = document.getElementById("open");
    if(opened.style.dispaly == "none"){
      opened.style.dispaly = "block";
    }else{
      opened.style.dispaly = "block";
    }
  }

  async function deletePet(pet){

      const burguer_ref = doc(ref_pets, pet.id)
      await deleteDoc(burguer_ref)
      location.reload();
   
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

    testando(uid);
  
  }, [uid]);




  return (
    <main>
      <section className='flex flex-col items-center justify-center'>
      <h1 className='text-[2em] text-principal m-2'>Meus pets</h1>
        
        

        {qrpets.map(pet => {
          
          return(
            <div key = {pet.id} className=" w-[95%] my-1 m-auto max-h-[40vh] h-auto bg-principal rounded-[5px] lg:w-[600px]">
              <div className="flex ">
              <div className="">
                <img src={pet.petImage} alt="" className='w-[120px] h-[100px] m-2 lg:w-[150px] h-[130px]' />
                <div className="flex">
                

</div>
              </div>
              <div className=" text-white">
                <h1 className='text-center mb-1 text-[1.2em]'>Oi eu sou {pet.petName}</h1>
                
                <h2>Contato: {pet.owner_phone}</h2>
                <h2>Contato Secundario: {pet.owner_second}</h2>
                <h2>Endereço: {pet.owner_address}, {pet.owner_district}, {pet.owner_city}, {pet.owner_uf}</h2>
                <h2>Donos: {pet.owner_first}; {pet.owner_second}</h2>
                

                
              </div>

              </div>
                <div className="w-[100%]  flex items-center justify-around my-3 ">
                  <button onClick={()=>setModal2(true)} className='btn-primary w-[45%] '>opções</button>
                  <button onClick={()=>setModal(true)} className='btn-primary w-[45%] '>Apagar</button>
                  

                </div>
                <div className={modal2 ? "shadow-md shadow-[black] w-[95%] h-[200px] rounded-lg bg-secundaria flex flex-col fixed text-principal top-8 left:calc(50% - 50px) items-center justify-around lg:w-[600px] " : "hidden invisible"} >
          <div className="flex flex-row justify-around">
          
          <Link className='btn-primary w-[150px] p-5 mr-10 text-center' to={`/mypet/${pet.id}`}>Acessar</Link>
          <Link className='btn-primary w-[150px] p-5  text-center' to={`/updatepet/${pet.id}`}>Editar</Link>
          </div>
          <div className="flex flex-row justify-around">
          <button  className='btn-primary w-[150px] p-5 mr-10'><a href={`https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=http://localhost:5173/mypet/${pet.id}`} target='_blank'  >QR code</a> </button>
          <button onClick={()=>setModal2(false)} className='btn-primary w-[150px] p-5 '>Fechar</button>
          </div>
          </div>
             
                <div className={modal ? "shadow-md shadow-[black] w-[95%] h-[200px] rounded-lg bg-secundaria flex flex-col fixed text-principal top-8 left:calc(50% - 50px) items-center justify-around lg:w-[600px] " : "hidden invisible"} >
          <h1>Deseja apagar o pet {pet.petName} ?</h1>
          <div className="flex flex-row justify-around">
          <button onClick={()=> deletePet(pet)} className='btn-primary w-[100px] p-5 mr-10'>Sim</button>
          <button onClick={()=>setModal(false)} className='btn-primary w-[100px] p-5 '>Não</button>
          </div>
          </div>
            </div>
            
          )
        }
            
          )}
        
        <button  onClick={cadastrarnovopet} className='btn-primary w-[60%] m-5 lg:w-[40%] '>Cadastrar Novo Pet</button>
       
         
      </section>
    </main>
  )
}

export default Painel