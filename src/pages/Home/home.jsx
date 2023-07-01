import Gratuito from "../../components/svgs/gratuito";
import QrcodeIcon from "../../components/svgs/qrcodeIcon";
import IconeH from "../../components/svgs/iconeH";
import ContatoIcon from "../../components/svgs/contatoIcon";
import Exemplo from "../../components/svgs/exemplo";
import Exemplos from "../../components/svgs/exemplos";

function Home() {
  function share() {
    if (navigator.share !== undefined) {
      navigator
        .share({
          title: "QRPet",
          text: "site do qr per ",
          url: "https://www.google.com.br",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  }

  return (
    <main className="w-full direction-col">
      <section className="hidden w-full md:direction-col bg-home bg-no-repeat bg-cover bg-center h-[80vh]">
        <div className="w-[90%] max-w-[1080px] direction-row">
          <div className="w-[55%]"></div>
          <div className="w-[45%]">
            <h1 className="text-[2em] text-center mb-8 tracking-widest">
              Bem-vindo(a) ao QrPet!
            </h1>
            <p className="leading-10 text-justify text-[1.2em]">
              No QrPet, estamos empenhados em reunir os animais perdidos com
              seus donos amorosos. Com nossa tecnologia avançada e uma
              comunidade solidária de amantes de animais, queremos garantir a
              segurança e o bem-estar dos seus bichinhos de estimação.
            </p>
          </div>
        </div>
      </section>

      <section className="md:hidden w-full direction-col bg-[#EFAEB4] bg-no-repeat bg-cover bg-center h-[80vh]">
        <div className="w-[90%] max-w-[1080px] direction-col">
          <div className="w-full">
            <h1 className="text-[2em] text-center mb-8 tracking-widest">
              Bem-vindo(a) ao QrPet!
            </h1>
            <p className="leading-10 text-justify text-[1.2em]">
              No QrPet, estamos empenhados em reunir os animais perdidos com
              seus donos amorosos. Com nossa tecnologia avançada e uma
              comunidade solidária de amantes de animais, queremos garantir a
              segurança e o bem-estar dos seus bichinhos de estimação.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full direction-col">
        <div className="w-[90%] max-w-[1080px] direction-col py-4">
          <p className="my-4">
            <IconeH />
          </p>
          <p className="leading-7 text-center text-[1.2em] max-w-[475px] mb-4">
            Nosso site é dedicado a ajudar os amantes de animais a manter seus
            bichos de estimação seguros e protegidos. Com o objetivo de fornecer
            uma solução eficaz para rastrear animais perdidos, oferecemos um
            serviço de cadastro para pets, permitindo que você registre todas as
            informações relevantes sobre o seu animalzinho.
          </p>
        </div>
      </section>

      <section className="w-full direction-col">
        <h2 className="mb-8 text-terciaria uppercase text-[1.4em] text-center tracking-widest font-bold">
          Como a QrPet funciona
        </h2>

        <div className="w-[90%] max-w-[1080px] direction-col sm:direction-row bg-[#EEABB2] rounded-lg p-8">
          <p className="my-4 w-[50%]">
            <ContatoIcon />
            <p className="text-center">Contato</p>
          </p>
          <p className="leading-7 text-justify text-[1.2em] w-[90%] sm:w-[50%] mb-4">
            No QrPet, você pode cadastrar o seu animalzinho de forma rápida e
            fácil. Basta criar um perfil exclusivo para o seu pet, inserindo
            informações importantes como nome, foto, informações importantes e
            seus próprios dados de contato.
          </p>
        </div>

        <div className="w-[90%] max-w-[1080px] flex flex-col-reverse items-center justify-center sm:direction-row  rounded-lg p-8">
          
          <p className="leading-7 text-justify text-[1.2em] w-[90%] sm:w-[50%] mb-4">
            Uma das principais funcionalidades do QrPet é a geração de um QR
            Code personalizado contendo todas as informações relevantes sobre o
            seu animal de estimação. Esse QR Code pode ser impresso e colocado
            na coleira do seu pet.
          </p>

          <p className="my-4 w-[50%]">
            <QrcodeIcon />
            <p className="text-center">QrCode</p>
          </p>
        </div>

        <div className="w-[90%] max-w-[1080px] direction-col sm:direction-row bg-[#EEABB2] rounded-lg p-8 mb-8">
          <p className="my-4 w-[50%]">
            <Gratuito />
            <p className="text-center">100% Gratuito</p>
          </p>
          <p className="leading-7 text-justify text-[1.2em] w-[90%] sm:w-[50%] mb-4">
            Desfrute de um serviço de rastreamento de animais de estimação
            totalmente gratuito.
          </p>
        </div>
      </section>

      <section className="w-full direction-col">
        <div className="w-[90%] max-w-[1080px] direction-col py-4">
          <h2 className="mb-8 text-terciaria uppercase text-[1.4em] text-center tracking-widest font-bold">
            Como ficará a página do seu pet!?
          </h2>

          <div className="direction-col text-center lg:justify-between sm:direction-row sm:w-[350px]">
           
                <Exemplo className="" />
           

            
                <Exemplos />
           
          </div>

          <p className="mt-8  text-center">
            Acesse a página do{" "}
            <a className="text-terciaria underline" href="http://qrpet.vercel.app/mypet/QpVdUcJdh8iKkSa4qK67">
            Bisteca 
            </a>
             <spam> e </spam> <a className="text-terciaria underline" href="http://qrpet.vercel.app/mypet/dPf8HiKh1qCsxeiITtK9">
              Alfredo
            </a >
            , os mascotes QrPet!
          </p>
        </div>
      </section>

      <section className="w-full direction-col">
        <div className="w-[90%] max-w-[1080px] direction-col py-4">
          <p className="leading-7 text-center text-[1.2em] max-w-[475px] mb-4">
            Não deixe a chance de proporcionar mais proteção ao seu animal de
            estimação. Cadastre-se no QrPet hoje mesmo e tenha a tranquilidade
            de saber que, em caso de emergência, o seu pet estará sempre apenas
            a um QR Code de distância.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;
