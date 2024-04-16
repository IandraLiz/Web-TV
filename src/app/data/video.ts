export type Video = {
    videoURL: string;
    imageURL: string;
    description: string;
    sinopse: string;
}

const videos: Video[] = [
    {
        videoURL: "video/video01.mp4",
        imageURL: "image/image01.jpg",
        description: "Donzela",
        sinopse: "Uma jovem concorda em se casar com um belo príncipe, apenas para descobrir que tudo não passou de uma armadilha. Ela é jogada em uma caverna com um dragão cuspidor de fogo e deve confiar apenas em sua inteligência e vontade para sobreviver."
    },
    {
        videoURL: "video/video02.mp4",
        imageURL: "image/image02.jpg",
        description: "Arcane",
        sinopse: "Em meio ao conflito entre as cidades-gêmeas de Piltover e Zaun, duas irmãs lutam em lados opostos de uma guerra entre tecnologias mágicas e convicções incompatíveis."
    },
    {
        videoURL: "video/video03.mp4",
        imageURL: "image/image03.jpg",
        description: "Wandinha",
        sinopse: "Inteligente, sarcástica e apática, Wandinha Addams pode estar meio morta por dentro, mas na Escola Nunca Mais ela vai fazer amigos, inimigos e investigar assassinatos."
    },
    {
        videoURL: "video/video04.mp4",
        imageURL: "image/image04.jpg",
        description: "Enola",
        sinopse: "Enola Holmes usa seus poderes de dedução para despistar seu irmão Sherlock e encontrar sua mãe."
    }
]
export default videos;
