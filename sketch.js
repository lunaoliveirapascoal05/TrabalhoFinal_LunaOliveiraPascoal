

let dots = 0; // 0 bolinhas = ainda não há ao iniciar o site 
let speed = 3; // velocidade que ao iniciar
let vol = 0; // volume da voz
let layer; // criação de camada para desenhar
let mic, fft, micButton; // microfone, sistema para analisar o som e botão para ativar ou desativar o microfone
let micOn = false; // microfone está desligado ou ligado

function setup() {
  createCanvas(windowWidth, windowHeight).style("display", "block"); //faz a tela onde vamos desenhar
  document.body.style.margin = 0; //tira a borda branca da tela
 
  layer = createGraphics(windowWidth, windowHeight); // cria uma camada para desenhar
  layer.noStroke(); // layer sem contorno

  mic = new p5.AudioIn(); // cria o microfone
  fft = new p5.FFT(); // cria o sistema para analisar o som
  fft.setInput(mic); // define o microfone como entrada do sistema de análise de som

  micButton = createButton("turn on microphone").position(20, 20).mousePressed(toggleMic); // botão que liga ou desliga o microfone
  document.body.style.font = "14px " + getComputedStyle(micButton.elt).fontFamily; // fonte e tamanho do texto do botão

}

function draw() {

background(255, 182, 217);

image(layer, 0, 0); // desenha a camada na tela
}

function toggleMic() {
  userStartAudio(); // permite o uso do microfone
  if (micOn === false) {
    micOn = true; // microfone estava desligado: então liga
    mic.start();
    micButton.html("turn off microphone"); // o texto diz que o microfone está ligado e pode ser desligado
  }

  else{
    micOn = false; // microfone estava ligado: então desliga
    mic.stop(); 
    micButton.html("turn on microphone"); // texto do botão indica que o microfone pode ser ligado
  }

  if (micOn) {
    vol = mic.getLevel(); //volume de 0 a 1 
  }
  else {
   vol = 0; //volume 0 = desligado
  }

 if (vol < 0.01) {
  dots = 0; //silêncio: não faz bolinhas
 } 

 else{
  if (dots === 0) { //barulho: cria bolinhas
    //sitios aleatórios do começo das formas generativas
    let x = random (width); 
    let y = random (height);
    let angle = random(TWO_PI); // o random Two Pi pode dar qualquer direção aleatória: cima, baixo, direita, esquerda e diagonal
    dots = [newDot(x, y, angle), newDot(x, y, angle), newDot(x, y, angle), newDot(x, y, angle), newDot(x, y, angle)]; // cria 5 bolinhas que são guardadas numa "caixa" ([]) e ao andarem, elas vão se espalhando e criam 5 linhas diferentes
  }
  layer.fill(255,150); //cor com opacidade menor das bolinhas
  moveDot(dots[0]);
 }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
