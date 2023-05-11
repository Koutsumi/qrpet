import { onSnapshot, collection, doc, deleteDoc, serverTimestamp, updateDoc, QuerySnapshot, addDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import db from '../../services/firebase'
import img from '../../assets/images/bgincio.jpg'
import img2 from '../../assets/images/teste.png'
import Gratuito from "../../components/svgs/gratuito"
import QrcodeIcon from "../../components/svgs/qrcodeIcon"
import IconeH from "../../components/svgs/iconeH"
import ContatoIcon from "../../components/svgs/contatoIcon"
import Exemplo from "../../components/svgs/exemplo"

function Home() {


    function share() {
        if (navigator.share !== undefined) {
            navigator.share({
                title: 'QRPet',
                text: 'site do qr per ',
                url: 'https://www.google.com.br',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    }

    return (
        <main>
            <section className="flex flex-col items-center ">
                <img src={img} alt="" className=" " />



                <div className="w-auto m-auto h-[30vh]  bg-Dog bg-cover mx-2 my-4 rounded-[5px] lg:w-[1000px]" >


                    <div className="absolute w-[90%] text-center  lg:w-[900px]">
                        <h3 className="w-[90%] m-auto bg-secundaria rounded-[5px] mt-2">E se seu pet se perdesse oque voce faria?</h3>
                    </div>
                    <div className="w-[60%] h-[30vh] bg-principal rounded-[5px] flex text-center justify-center">
                        <p className="w-[90%] h-auto m-auto text-white leading-[1.1]" >Sabemos que não é fácil e triste procurar pelo pet, colando cartazes de desaparecido, ligando para as pessoas, mas com qr pet. A possibilidade de achar seu pet de forma rápida é muito alta então não perca tempo e cadastre-se.</p>
                    </div>
                </div>

                <div className="flex flex-col w-full text-center items-center  text-principal text-[1.3em]">
                    <div className="m-5 ">
                        <Gratuito/>

                        <h3 >100% gratuito</h3>

                    </div>
                    <div className="m-5">
                        <QrcodeIcon/>

                        <h3>QR Code próprio do seu pet</h3>

                    </div>
                    <div className="m-5">
                        <IconeH/>

                        <h3>Todas as informações do seu pet na sua mão!</h3>

                    </div>
                    <div className="m-5">
                    <ContatoIcon/>

                        <h3>Seu contato e contatos de emergência!</h3>

                    </div>
                </div>
                <a className="btn-primary m-3 text-[1.3em]" href="/register">Cadastre-se</a>

                <h2 className=" text-[1.3em]">Como a pagina do meu pet vai aparecer?</h2>

                <h3 className="bg-secundaria px-5 py-2 text-principal m-5 rounded-[5px] text-[1.3em]">Exemplos</h3>

                <div className="flex justify-center items-center text-center ">
                <Exemplo className="flex justify-center items-center text-center "/>

                <Exemplo/>
                </div>
                <h3 className="text-principal text-[1.3em] m-5">Compartilhe em suas redes sociais.</h3>
                <IconeH/>
                <a className="btn-primary m-5 cursor-pointer" onclick={share()}>Comparthilhar</a>
            </section>
        </main>
    )
}

export default Home