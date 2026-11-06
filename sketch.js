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

  micButton = createButton('turn on microphone').position(20, 20).style("font-size", "20px").mousePressed(toggleMic); // botão que liga ou desliga o microfone
document.body.style,font = "14" + getComputedStyle(micButton.elt).fontFamily; //fonte e tamanho do texto do botão


}

function draw() {

background(255, 182, 217);

image(layer, 0, 0); // desenha a camada na tela
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
