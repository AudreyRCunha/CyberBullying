/* ========================================================
   CYBERPAZ - LÓGICA DO QUIZ INTERATIVO
   Idealizado por Audrey (12 anos)
   ======================================================== */

// Banco de dados dos Cenários do Quiz
const cenarios = [
  {
    id: 0,
    titulo: "Cenário 1 de 3: O caso do Henrique (Jogos Online)",
    pergunta: "Henrique está recebendo ofensas no jogo e criaram um grupo para rir dele. O que ele deve fazer?",
    opcoes: [
      {
        letra: "A",
        texto: "Responder aos agressores no mesmo tom, xingando de volta para não parecer fraco.",
        correta: false,
        motivo: "Não, isso só vai piorar! Entrar em bate-boca dá mais lenha para os agressores continuarem e você pode até perder a sua própria conta por usar linguagem inadequada."
      },
      {
        letra: "B",
        texto: "Guardar tudo para si, fingir que nada aconteceu e nunca mais conversar com os amigos.",
        correta: false,
        motivo: "Não, isso só vai piorar! Se isolar e sofrer em silêncio faz a tristeza acumular dentro de você. O silêncio só protege os agressores."
      },
      {
        letra: "C",
        texto: "Tirar prints de tudo, bloquear e denunciar os jogadores, contar para os pais e buscar apoio emocional/terapia.",
        correta: true,
        motivo: "Excelente! Tirar provas (prints com data e horário), bloquear os agressores e, principalmente, CONVERSAR com os pais ou professores e buscar apoio psicológico é a atitude mais corajosa e saudável que existe!"
      },
      {
        letra: "D",
        texto: "Criar um perfil falso secreto para tentar se vingar dos colegas na internet.",
        correta: false,
        motivo: "Não, isso só vai piorar! Vingança na internet nunca resolve nada e transforma a vítima em um novo agressor. A melhor resposta é a denúncia com responsabilidade."
      }
    ]
  },
  {
    id: 1,
    titulo: "Cenário 2 de 3: O caso da Sara (Redes Sociais)",
    pergunta: "Publicaram uma foto da Sara com comentários maldosos e as pessoas estão rindo dela na escola. O que ela deve fazer?",
    opcoes: [
      {
        letra: "A",
        texto: "Apagar todas as redes sociais correndo, não ir mais à escola e fingir que nada aconteceu.",
        correta: false,
        motivo: "Não, isso só vai piorar! Fugir da escola e sumir faz você perder seus momentos com as pessoas que realmente gostam de você. Além disso, a foto continuará circulando se ninguém intervir."
      },
      {
        letra: "B",
        texto: "Tirar prints com links da publicação, denunciar a foto para a rede social, avisar a direção da escola e conversar com seus responsáveis.",
        correta: true,
        motivo: "Perfeito! As redes sociais têm obrigação de derrubar conteúdos que ferem a honra de menores. A escola e os pais devem ser informados para identificar quem postou e proteger a Sara!"
      },
      {
        letra: "C",
        texto: "Procurar uma foto feia de quem postou e publicar para pagar na mesma moeda.",
        correta: false,
        motivo: "Não, isso só vai piorar! Devolver na mesma moeda além de alimentar o ódio pode gerar um processo legal contra você. O caminho correto é a denúncia e a proteção dos seus direitos."
      },
      {
        letra: "D",
        texto: "Acreditar no que estão dizendo e achar que a culpa é dela mesma por ter tirado a foto.",
        correta: false,
        motivo: "Não! A culpa NUNCA é da vítima. Ninguém tem o direito de humilhar ou espalhar fotos de outra pessoa. Volte e escolha a atitude de quem se valoriza e pede ajuda!"
      }
    ]
  },
  {
    id: 2,
    titulo: "Cenário 3 de 3: Você como Testemunha ou Amigo",
    pergunta: "Você vê que estão zoando um colega em um grupo de WhatsApp ou na escola. O que você faz?",
    opcoes: [
      {
        letra: "A",
        texto: "Mandar figurinhas de risada junto só para não ser zoado também.",
        correta: false,
        motivo: "Não, isso só vai piorar! Quem ri junto ou compartilha está ajudando a machucar o colega. Você pode ser o elo que interrompe a corrente do bullying!"
      },
      {
        letra: "B",
        texto: "Ficar em silêncio e fechar o grupo para fingir que não viu nada.",
        correta: false,
        motivo: "Não, a omissão permite que o bullying continue. Ficar quieto dá a sensação de que todo mundo concorda com o agressor."
      },
      {
        letra: "C",
        texto: "Mandar uma mensagem privada de apoio para o amigo, dizer que ele não está sozinho e ajudar a avisar um adulto de confiança.",
        correta: true,
        motivo: "Sensacional! Ser um 'upstander' (alguém que se posiciona e acolhe) pode salvar o dia e até a vida de alguém. Um simples 'eu estou com você' tem um poder gigante!"
      }
    ]
  }
];

let cenarioAtual = 0;

// Elementos do DOM
const questionBox = document.getElementById("quiz-question-box");
const wrongScene = document.getElementById("quiz-wrong-scene");
const correctScene = document.getElementById("quiz-correct-scene");
const scenarioTitle = document.getElementById("quiz-scenario-title");
const questionText = document.getElementById("quiz-question-text");
const optionsContainer = document.getElementById("quiz-options-container");
const wrongExplanation = document.getElementById("wrong-explanation-text");
const correctExplanation = document.getElementById("correct-explanation-text");
const nextButton = document.getElementById("btn-next-scenario");

// Inicializar a exibição do cenário
function carregarCenario(indice) {
  cenarioAtual = indice;
  const cenario = cenarios[cenarioAtual];

  // Atualizar botões de abas
  document.querySelectorAll(".tab-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === indice);
  });

  // Atualizar textos da pergunta
  scenarioTitle.textContent = cenario.titulo;
  questionText.textContent = cenario.pergunta;

  // Renderizar opções
  optionsContainer.innerHTML = "";
  cenario.opcoes.forEach((opcao, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `
      <span class="option-letter">${opcao.letra}</span>
      <span class="option-text">${opcao.texto}</span>
    `;
    btn.onclick = () => verificarResposta(opcao);
    optionsContainer.appendChild(btn);
  });

  // Mostrar caixa de perguntas e esconder feedbacks
  questionBox.classList.remove("hidden");
  wrongScene.classList.add("hidden");
  correctScene.classList.add("hidden");
}

// Quando a pessoa clica em uma resposta
function verificarResposta(opcao) {
  questionBox.classList.add("hidden");

  if (opcao.correta) {
    // Acertou: Exibir cena de sucesso!
    wrongScene.classList.add("hidden");
    correctScene.classList.remove("hidden");
    correctExplanation.innerHTML = opcao.motivo;

    // Atualizar botão de próximo
    if (cenarioAtual === cenarios.length - 1) {
      nextButton.textContent = "🎉 Concluir Quiz e Ver Dicas de Ajuda!";
      nextButton.onclick = () => {
        document.getElementById("ajuda").scrollIntoView({ behavior: "smooth" });
      };
    } else {
      nextButton.textContent = "Avançar para o Próximo Cenário ➔";
      nextButton.onclick = proximoCenario;
    }
  } else {
    // Errou: Exibir cena de erro exatamente como a Audrey pediu!
    // "Não, isso só vai piorar. Volte."
    correctScene.classList.add("hidden");
    wrongScene.classList.remove("hidden");
    wrongExplanation.innerHTML = opcao.motivo;
  }
}

// Botão de voltar (Audrey: "Daí tem um botão para voltar. E assim por diante até chegar na certa")
function voltarParaPergunta() {
  wrongScene.classList.add("hidden");
  correctScene.classList.add("hidden");
  questionBox.classList.remove("hidden");
}

// Próximo cenário
function proximoCenario() {
  if (cenarioAtual < cenarios.length - 1) {
    carregarCenario(cenarioAtual + 1);
  }
}

// Mudar de cenário pelas abas
function mudarCenario(indice) {
  carregarCenario(indice);
}

// Atalho vindo dos botões nas histórias
function abrirQuizCenario(indice) {
  carregarCenario(indice);
  document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
}

// Iniciar ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  carregarCenario(0);
});
