import { useEffect, useState } from "react"
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { storage } from "../../services/firebase"
import { useParams } from "react-router-dom"
import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc } from "firebase/firestore"
import db from '../../services/firebase'

function UpdatePet() {

    const { id } = useParams()
    const [myPet, setMyPet] = useState()
    const [file, setFile] = useState("") 
    const [petImage, setPetImage] = useState()
    const [petName, setPetName] = useState(null)
    const [petGender, setPetGender] = useState(null)
    const [petBirth, setPetBirth] = useState(null)
    const [owner_first, setOwner_first] = useState(null)
    const [owner_second, setOwner_second] = useState(null)
    const [owner_phone, setOwner_phone] = useState(null)
    const [owner_phone_second, setOwner_phone_second] = useState(null)
    const [owner_address, setOwner_address] = useState(null)
    const [details, setDetails] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)

    const ref_pet = collection(db, "qrpet")

    const [percent, setPercent] = useState(0);

    const handleOptionChange = event => {
        setPetGender(event.target.value)
    }

    function handleChange(event){
        setFile(event.target.files[0])
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

    useEffect(() => {
        handleUpload()

    }, [file])

    useEffect(() => {

        const db_pet = doc(ref_pet, id)

        const data_pet = onSnapshot(db_pet, (QuerySnapshot) => {
            setMyPet({ id: QuerySnapshot.id, ...QuerySnapshot.data() })
        })

    }, [id])

    useEffect(() => {

        console.log(myPet)

        if (myPet != undefined) {
            setPetImage(myPet.petImage)
            setPetName(myPet.petName)
            setPetGender(myPet.petGender)
            setPetBirth(myPet.petBirth)
            setOwner_first(myPet.owner_first)
            setOwner_second(myPet.owner_second)
            setOwner_phone(myPet.owner_phone)
            setOwner_phone_second(myPet.owner_phone_second)
            setOwner_address(myPet.owner_address)
            setDetails(myPet.details)
        } else {
            console.log("ERROR")
        }

    }, [myPet])

    const [age, setAge] = useState()

    useEffect(() => {
        const today = new Date()
        const thisYear = today.getFullYear()
        setAge(thisYear - petBirth)
        
    }, [petBirth])


    async function updatePet(event){
        event.preventDefault()
        const db_pet = doc(ref_pet, id) 
        const update = await updateDoc(db_pet, {
            petImage,
            petName,
            petGender,
            petBirth,
            owner_first,
            owner_second,
            owner_phone,
            owner_phone_second,
            owner_address,
            details,
            updatedAt: serverTimestamp()
        })
        setIsExpanded(true)
    }

    return (
        <main>
            <section className="w-full direction-col ">
                <h1 className="text-center my-4 uppercase text-terciaria font-bold tracking-[5px] text-[1.5em]">Editar seu pet!</h1>
                <div className="w-[90%] direction-col">
                    <form onSubmit={updatePet} action="" className="w-[90%] lg:max-w-[450px]"> 
                        
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

                        <label className="block mt-3" htmlFor="">* Nome do pet</label>
                        <input required onChange={event => setPetName(event.target.value)} value={petName || ''} className="inp-primary w-full"  type="text" />

                        <label className="block" htmlFor="">Ano de nascimento</label>
                        
                        <input onChange={event => setPetBirth(event.target.value)} maxLength="4" value={petBirth || ''} className="inp-primary w-full mb-1" type="number" />
                        <span className="block mb-2 text-[0.8em]">Idade: <span className={age >= 0 && age <= 100? "text-black" : "text-white"}>{age} anos</span> </span>

                        <label className="block" htmlFor="">* Mãe/Pai do pet</label>
                        <input required onChange={event => setOwner_first(event.target.value)} value={owner_first || ''} className="inp-primary w-full"  type="text" name="" id="" />

                        <label className="block" htmlFor="">Mãe/Pai do pet</label>
                        <input onChange={event => setOwner_second(event.target.value)} value={owner_second || ''} className="inp-primary w-full"  type="text" name="" id="" />

                        <label className="block" htmlFor="">Endereço</label>
                        <input onChange={event => setOwner_address(event.target.value)} value={owner_address || ''} className="inp-primary w-full" type="text" />

                        <label className="block" htmlFor="">* Telefone</label>
                        <input required onChange={event => setOwner_phone(event.target.value)} value={owner_phone || ''} className="inp-primary w-full"  type="text" name="" id="" />

                        <label className="block" htmlFor="">Telefone alternativo</label>
                        <input onChange={event => setOwner_phone_second(event.target.value)} value={owner_phone_second || ''} className="inp-primary w-full" type="text" name="" id="" />

                        <label className="block" htmlFor="">Observações</label>
                        <textarea onChange={event => setDetails(event.target.value)} value={details || ''} className="inp-primary w-full" name="" id="" cols="30" rows="10"></textarea>

                        <div className="w-full direction-row">
                        <a href="/painel">
                            <div className="btn-primary bg-secundaria text-black"> « Voltar</div>
                        </a>
                            <button className="btn-primary">Salvar alterações</button>
                        </div>
                    </form>
                </div>
            </section>

            <section className={isExpanded === true ? "w-full direction-col my-10 fixed top-[10rem]" : "hidden"}>
                <div className="w-[80%] bg-secundaria rounded shadow-2xl py-4">
                    <div className="w-full direction-col">
                        <h1 className="text-center my-4 uppercase text-terciaria font-bold tracking-[5px] text-[1.1em]">{petName} Editado com sucesso!</h1>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                            width="75.000000pt" height="75.000000pt" viewBox="0 0 512.000000 512.000000"
                            preserveAspectRatio="xMidYMid meet">
                            <metadata>
                                Created by potrace 1.16, written by Peter Selinger 2001-2019
                            </metadata>
                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                fill="#20BF55" stroke="none">
                                <path d="M2353 4850 c-540 -53 -1043 -288 -1418 -665 -354 -356 -574 -796
                                -652 -1305 -24 -160 -24 -481 1 -645 234 -1553 1890 -2426 3291 -1735 683 337
                                1149 980 1261 1740 10 68 17 184 18 282 1 154 -1 168 -20 195 -53 72 -148 95
                                -224 54 -57 -30 -80 -81 -80 -181 -1 -684 -332 -1301 -895 -1673 -234 -154
                                -506 -257 -796 -303 -140 -22 -409 -22 -554 0 -440 67 -827 265 -1130 577
                                -224 231 -362 457 -461 754 -217 655 -81 1354 369 1891 415 496 1093 761 1734
                                679 209 -27 375 -75 575 -166 122 -55 163 -60 222 -26 52 30 77 65 83 120 12
                                100 -30 150 -182 216 -197 87 -403 147 -605 176 -130 19 -414 27 -537 15z"/>
                                <path d="M4625 4274 c-16 -9 -91 -76 -165 -148 -263 -256 -1339 -1314 -1635
                                -1607 l-300 -297 -460 454 c-296 293 -474 462 -500 474 -53 26 -91 25 -145 -2
                                -59 -31 -82 -65 -88 -131 -7 -88 -80 -8 789 -864 158 -155 302 -291 320 -302
                                39 -24 121 -28 156 -8 12 7 54 43 95 81 74 71 911 892 1423 1396 154 152 378
                                373 498 491 121 118 225 226 233 241 35 67 9 162 -58 211 -37 27 -123 33 -163
                                11z"/>
                            </g>
                        </svg>
                        <a href="/painel">
                            <button className="btn-primary mt-6">Voltar</button>
                        </a>
                    </div>


                </div>
            </section>
        </main>
    )
}

export default UpdatePet