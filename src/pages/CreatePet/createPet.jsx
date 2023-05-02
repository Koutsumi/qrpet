import { useEffect, useState } from "react"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { collection, serverTimestamp, addDoc} from "firebase/firestore"
import { storage } from "../../services/firebase"
import db from "../../services/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function CreatePet() {

    const auth = getAuth();
    const navigate = useNavigate();
    const [userid, setUserId] = useState()

    useEffect(() => {
        

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserId(uid)
                console.log(uid)
          
            } else {
            console.log('Não logado')
            navigate("/login")
            }
        });
    }, [])
    
    const [file, setFile] = useState("") 
    const [petGender, SetPetGender] = useState()
    const [petImage, setPetImage] = useState()
    const [percent, setPercent] = useState(0);

    function handleChange(event){
        setFile(event.target.files[0])
    }
    
    const handleOptionChange = event => {
        SetPetGender(event.target.value)
    }

    function handleUpload(){
        if (!file){
            console.log("Selecione uma imagem")
        }else if (file != undefined){
            const storageRef = ref(storage, `/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // update progress
            setPercent(percent);},
            (err) => console.log(err), () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //console.log(url);
            setPetImage(url)
            });
            }); 
        }
        
    }
    
    const [petName, setPetName] = useState()
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

    async function newPet(event){
        event.preventDefault()

        const docRef = await addDoc(collection(db, "qrpet"), {
            userid,
            petImage,
            petGender,
            petName,
            petBirth,
            owner_first,
            owner_second,
            owner_phone,
            owner_phone_second,
            owner_address,
            owner_district,
            owner_city,
            owner_uf,
            details,
            createdAt : serverTimestamp(),
            updatedAt:  serverTimestamp()
        })

        setPetName("")
        setPetBirth("")
        setOwner_first("")
        setOwner_second("")
        setOwner_phone("")
        setOwner_phone_second("")
        setOwner_address("")
        setOwner_district("")
        setOwner_city("")
        setOwner_uf("")
        setDetails("")
    }

    useEffect(() => {
        handleUpload()

    }, [file])

    const [age, setAge] = useState()

    useEffect(() => {
        const today = new Date()
        const thisYear = today.getFullYear()
        setAge(thisYear - petBirth)
        
    }, [petBirth])
    
    return(
        <main>
            <section className="w-full direction-col ">
                <h1 className="text-center my-4 uppercase text-terciaria font-bold tracking-[5px] text-[1.5em]">Cadastre seu pet!</h1>
                <div className="w-[90%] direction-col">
                    <form onSubmit={ newPet } action="" className="w-[90%] lg:max-w-[450px]"> 
                        
                        <label htmlFor="">Foto do pet</label>
                        <div className="w-[100%] h-[200px] overflow-hidden bg-secundaria rounded direction-col mb-4 mt-2">
                        <p>Preview</p> <span>{percent}% </span>
                        <img src={petImage != undefined ? `${petImage}` : ""} alt="" />
                        </div>
                        <input  className=" w-full inp-primary" accept="image/*" type="file" onChange={handleChange}/>
                        <p>Selecione o sexo do seu pet:</p>
                        <div className="direction-col m-3">
                            <div className="w-[200px] direction-row">
                                <div className=" w-[70px] direction-row">
                                    <input onChange={handleOptionChange} checked={petGender === "male"} type="radio" name="radio-group" id="male" value="male"/>
                                    <label htmlFor="macho">Macho</label>
                                </div>
                                <div className=" w-[70px] direction-row">
                                    <input onChange={handleOptionChange} checked={petGender === "female"} type="radio" name="radio-group" id="famale" value="female"/>
                                    <label htmlFor="femea">Fêmea</label>
                                </div>
                            </div>
                        </div>

                        <label className="block mt-3" htmlFor="">Nome do pet</label>
                        <input onChange={event => setPetName(event.target.value)} value={petName || ''} className="inp-primary w-full"  type="text" />

                        <label className="block" htmlFor="">Ano de nascimento</label>
                        
                        <input onChange={event => setPetBirth(event.target.value)} maxLength="4" value={petBirth || ''} className="inp-primary w-full mb-1" type="number" />
                        <span className="block mb-2 text-[0.8em]">Idade: <span className={age >= 0 && age <= 100? "text-black" : "text-white"}>{age} anos</span> </span>

                        <label className="block" htmlFor="">Mãe/Pai do pet</label>
                        <input onChange={event => setOwner_first(event.target.value)} value={owner_first || ''} className="inp-primary w-full"  type="text" name="" id="" />

                        <label className="block" htmlFor="">Mãe/Pai do pet</label>
                        <input onChange={event => setOwner_second(event.target.value)} value={owner_second || ''} className="inp-primary w-full"  type="text" name="" id="" />

                        <label className="block" htmlFor="">Endereço</label>
                        <input onChange={event => setOwner_address(event.target.value)} value={owner_address || ''} className="inp-primary w-full" type="text" />

                        <label className="block" htmlFor="">Bairro</label>
                        <input onChange={event => setOwner_district(event.target.value)} value={owner_district || ''} className="inp-primary w-full" type="text" name="" id="" />

                        <label className="block" htmlFor="">Cidade</label>
                        <input onChange={event => setOwner_city(event.target.value)} value={owner_city || ''} className="inp-primary w-full" type="text" name="" id="" />

                        <label className="block" htmlFor="">UF</label>
                        <input onChange={event => setOwner_uf(event.target.value)} value={owner_uf || ''} className="inp-primary w-full" type="text" name="" id="" />

                        <label className="block" htmlFor="">Telefone para contato</label>
                        <input onChange={event => setOwner_phone(event.target.value)} value={owner_phone || ''} className="inp-primary w-full"  type="text" name="" id="" />

                        <label className="block" htmlFor="">Telefone para contato</label>
                        <input onChange={event => setOwner_phone_second(event.target.value)} value={owner_phone_second || ''} className="inp-primary w-full" type="text" name="" id="" />

                        <label className="block" htmlFor="">Observações</label>
                        <textarea onChange={event => setDetails(event.target.value)} value={details || ''} className="inp-primary w-full" name="" id="" cols="30" rows="10"></textarea>

                        <div className="direction-col"><button className="btn-primary">Cadastrar</button></div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default CreatePet