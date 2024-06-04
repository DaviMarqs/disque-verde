import { Header } from "@/components/Header";

export default function About() {
  return (
    <div className="flex min-h-screen justify-center flex-col bg-green-700">
      <Header />
      <div className="w-10/12 lg:w-2/4 p-4 rounded-lg bg-slate-100 m-auto font-serif mt-16 md:m-auto">
        <h1 className="text-2xl mb-4">Sobre</h1>
        <p className="mb-4">
          Nosso objetivo é promover a proteção ambiental e a sustentabilidade na
          cidade de Santa Gertrudes facilitando a denúncia de atividades que
          ameaçam o meio ambiente. Aqui, você pode registrar suas denúncias de
          maneira rápida e segura, identificada ou anônima, ajudando a preservar
          o nosso verde.
        </p>
        <p className="mb-4">
          Nossa equipe está comprometida com a fiscalização constante e o
          cumprimento da legislação ambiental, assegurando que todas as
          denúncias sejam investigadas e tratadas com a devida seriedade.
        </p>
        <p className="mb-4">
          Explore nosso site para saber mais sobre como funciona o Disque Verde
          e registre a sua denúncia!
        </p>

        <p className="mb-4">
          Site idealizado por{" "}
          <a
            href="https://www.linkedin.com/in/flaviacrivellarifassis/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 font-bold"
          >
            {" "}
            Flávia Crivellari Fassis
          </a>
          , Diretora de Meio Ambiente, e desenvolvido por{" "}
          <a
            href="https://www.linkedin.com/in/davi-aldivino-marques/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 font-bold"
          >
            Davi Marques
          </a>
          , Desenvolvedor de Software.
        </p>
        <p className="mb-4 text-green-700 font-bold">
          {" "}
          Obrigado por contribuir para a proteção do nosso meio ambiente!
        </p>
      </div>
    </div>
  );
}
