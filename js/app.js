// CARTAS DO JOGO (adicionadas melhorias e emojis)
const CARDS = [
  {id:'1', q:'O que é osmose?', a:'Passagem de água pela membrana.', img:'💧'},
  {id:'2', q:'Difusão simples?', a:'Passagem do + para o - concentrado.', img:'↔️'},
  {id:'3', q:'Transporte ativo?', a:'Gasta energia (ATP).', img:'⚡'},
  {id:'4', q:'Como entram moléculas grandes?', a:'Endocitose.', img:'🫧'},
  {id:'5', q:'Como saem moléculas grandes?', a:'Exocitose.', img:'📤'},
  {id:'6', q:'Fagocitose é?', a:'Célula comendo partículas.', img:'🍽️'},
];

// VARIÁVEIS DE JOGO
let turno = 1;
let p1 = 0;
let p2 = 0;

let deck = [];
let flipped = [];

const board = document.getElementById("board");

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
}

// GERAR CARTAS
function gerarBaralho(){
  deck = [];
  CARDS.forEach(c=>{
    deck.push({type:'Q', id:c.id, text:c.q, img:c.img, uid:Math.random()});
    deck.push({type:'A', id:c.id, text:c.a, img:c.img, uid:Math.random()});
  });

  shuffle(deck);
}

// DESENHAR TABULEIRO
function desenhar(){
  board.innerHTML = "";

  deck.forEach(card=>{
    const el = document.createElement("div");
    el.className = "card";
    el.dataset.uid = card.uid;

    el.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">🂠</div>
        <div class="card-face card-front">
          <h3>${card.img}</h3>
          <p>${card.text}</p>
        </div>
      </div>
    `;

    el.addEventListener("click", ()=>virar(el, card));
    board.appendChild(el);
  });
}

function virar(el, card){
  if(el.classList.contains("flipped") || el.classList.contains("matched")) return;
  if(flipped.length === 2) return;

  el.classList.add("flipped");
  flipped.push({el, card});

  if(flipped.length === 2){
    setTimeout(()=>verificar(), 700);
  }
}

function verificar(){
  const [c1, c2] = flipped;
  const correta = c1.card.id === c2.card.id && c1.card.type !== c2.card.type;

  if(correta){
    c1.el.classList.add("matched");
    c2.el.classList.add("matched");

    if(turno === 1){
      p1++;
      document.getElementById("p1").textContent = p1;
    } else {
      p2++;
      document.getElementById("p2").textContent = p2;
    }
  } else {
    setTimeout(()=>{
      c1.el.classList.remove("flipped");
      c2.el.classList.remove("flipped");
    }, 400);

    turno = turno === 1 ? 2 : 1;
    document.getElementById("turn").textContent = `Jogador ${turno}`;
  }

  flipped = [];
}

// RESET
function reset(){
  p1 = 0; p2 = 0;
  turno = 1;

  document.getElementById("p1").textContent = 0;
  document.getElementById("p2").textContent = 0;
  document.getElementById("turn").textContent = "Jogador 1";

  gerarBaralho();
  desenhar();
}

document.getElementById("restart").onclick = reset;

reset();
