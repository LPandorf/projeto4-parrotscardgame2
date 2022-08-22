let qntDeCartas;
let baralho=[];
let passaro=["1","2","3","4","5","6","7"];
let cartaUm, cartaDois;
let idCronometro;
let tempo=0;
let acertos=0;
let movimentos=0;


// aleatoriedade
function random() {
    return Math.random() - 0.5;
}

//cronometro
function cronometro(){
    document.querySelector(".relogio").classList.add("mostrar-relogio");
    tempo++;
    document.querySelector(".relogio").innerHTML = tempo;
}

//perguntar e validar quantidade de cartas da partida
function perguntar(){
    while(invalido()){
        qntDeCartas=Number(prompt("Quer jogar com quantas cartas?"));
    }
    //função pra começar o jogo (começar)
    começar(); 
}
function invalido(){
    if(qntDeCartas>=4 && qntDeCartas<=14 && qntDeCartas%2==0){
        return false;
    }else{
        return true;
    }
}

//começar o jogo e distribuir as cartas
function começar(){
    for(let i=0; i<qntDeCartas/2; i++){
        let carta=passaro[i];
        baralho.push(carta);
        baralho.push(carta);
    }
    baralho.sort(random);
    //função para mostrar as cartas (mostrar)
    mostrar()  
}

//mostrar as cartas e assim iniciar de fato o jogo
function mostrar(){
    let tabuleiro=document.querySelector(".tabuleiro");
    for(let i=0; i<baralho.length; i++){
        //chama a função que desvira a carta (desvira)
        let cartinha= `
            <li class="carta virada" onClick="desvira(this)">
                <div class='frente face'>
                    <img src='img/back.png'>
                </div>
                <div class='costas face'>
                    <img src='img/${baralho[i]}.jpg'>
                </div>
            </li>
        `;
        tabuleiro.innerHTML+= cartinha;
    }
    //chama função que desvira todas as cartas depois de 2600 segundos (desviraTudo)
    setTimeout(desviraTudo, 2600);
}

//desvira a carta
function desvira(carta){
    if(idCronometro=== undefined){
        idCronometro= setInterval(cronometro, 2600);
    }
    if(carta.classList.contains("virada")){
        return;
    }
    if(cartaUm!=undefined && cartaDois!=undefined){
        return;
    }
    carta.classList.add("virada");
    movimentos++;
    if(cartaUm==undefined){
        cartaUm=carta;
    }else{
        if(cartaDois==undefined){
            cartaDois=carta;
            if(cartaUm.innerHTML==cartaDois.innerHTML){
                //chama função que deixa as cartas com as costas para frente (fixa)
                fixa();
                acertos+=2;
                //chama função que checa se todas as cartas ja foram encontradas (confereSeTerminou)
                confereSeTerminou();
            }else{
                //chama função que vira a carta (vira)
                setTimeout(vira, 2600);
            }
        }
    }
}

//desvira todas as cartas depois de 2600 segundos
function desviraTudo(){
    const cartas=document.querySelectorAll(".virada");
    for(let i=0; i<cartas.length; i++){
        cartas[i].classList.remove("virada");
    }
}

//deixa as cartas fixas depois de acertar o par, retirando a carta específica da variável antes de virar dnv
function fixa(){
    cartaUm=undefined;
    cartaDois=undefined;
}

//confere se o jogo terminou
function confereSeTerminou(){
    if(acertos==baralho.length){
        //chama função que termina o jogo
        setTimeout(terminar,2650);
        clearInterval(idCronometro);
    }else{
        console.log("continue...");
    }
}

//vira a carta
function vira(){
    cartaUm.classList.remove("virada");
    cartaDois.classList.remove("virada");
    fixa();
}

//terminar o jogo
function terminar(){
    alert(`Você terminou o jogo em ${movimentos} movimentos e ${tempo}segundos`);
    const recomeçar=confirm("Deseja jogar novamente?");
    if(recomeçar==true){
        window.location.reload();
    }else{
        console.log("Obrigado por jogar");
    }
} 

//chama a função inicial
perguntar();