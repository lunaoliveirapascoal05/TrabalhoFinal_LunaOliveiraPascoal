let mic, fft, micButton, lineColor, bgColor, speedSlider; // microfone, sistema para analisar o som e botão para ativar ou desativar o microfone
let count = 5; // quantas bolinhas andam de 1 a 5
let dots = 0; // 0 bolinhas = ainda não há ao iniciar o site 
let speed = 3; // velocidade que ao iniciar
let vol = 0; // volume da voz
let layer; // criação de camada para desenhar
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

  //salva o desenho criado clicando no botão save image
  createButton("save image").position(20,55).mousePressed(saveImage);
  //limpa a tela clicando no botão clear
  createButton("clear").position(20,90).mousePressed(clearDrawing);

  //cria um color picker para se poder escolher a cor da linha que começa branca
  createSpan("line color").position(20,135);
  lineColor = createColorPicker ("#FFFFFF").position(20, 155);

  //cria um color picker para se escolher a cor do fundo que começa rosa
  createSpan("background color").position(20, 200);
  bgColor = createColorPicker("#FFB6D9").position(20, 220);

  //cria um slider para se escolher a velocidade da criação das bolinhas conforme o som
  createSpan("speed").position(20, 265);
  speedSlider = createSlider(1, 10, 3, 0.5).position(20, 285);

}

function draw() {

background(bgColor.value()); //pinta o fundo da cor que o color picker indicar
image(layer, 0, 0); // desenha a camada na tela



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
    count = floor(random(1, 6));
    dots = [newDot(x, y, angle), newDot(x, y, angle), newDot(x, y, angle), newDot(x, y, angle), newDot(x, y, angle)]; // cria 5 bolinhas que são guardadas numa "caixa" ([]) e ao andarem, elas vão se espalhando e criam 5 linhas diferentes
  }

  fft.analyze(); //analisa o som no preciso momento que se ativa o microfone
  speed = speedSlider.value() * map(fft.getCentroid(), 100, 4000, 0.6, 2, true); //converte o tom da voz numa velocidade
  layer.fill(lineColor.value() + "96"); //cor com opacidade "96" deixa transparência nas bolinhas
 
  //5 bolinhas a serem desenhadas
  moveDot(dots[0]);

  if (count > 1) moveDot(dots[1]);
  if (count > 2) moveDot(dots[2]);
  if (count > 3) moveDot(dots[3]);
  if (count > 4) moveDot(dots[4]);
 }
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
}

 function newDot(x, y, angle) { // cria uma bolinha, recebendo as coordenadas e enviando de volta já pronta
  return { x: x, y: y, angle: angle + random(-0.3, 0.3) }; //devolve a bolinha com as 3 informações (x, y e angle), o random faz com que as bolinhas se vão separando apesar de "nascerem" no mesmo ponto
 }

 function moveDot(dot) {
  //o noise() dá um número de 0 a 1 que muda lentamente, que faz com que as curvas sejam suaves, e os números controlam a direção, força da curva e ângulo da curva das bolinhas criadas
  dot.angle += (noise(dot.x * 0.005, dot.y * 0.005, frameCount * 0.002) - 0.5) * 0.4;
  //o cos() transforma o ângulo em movimento para a direita ou esquerda e o sin() para cima ou para baixo
  //multiplica pela velocidade que determina se a bolinha anda mais devagar ou mais depressa
  dot.x += cos(dot.angle) * speed;
  dot.y += sin(dot.angle) * speed;

  //se a bolinha passar da borda direita do ecrã (x > que a largura), então volta para a borda esquerda
  if (dot.x > width) dot.x = 0;
  //senão, se passou a borda esquerda do ecrã (x < que 0), aparece do lado direito
  else if (dot.x < 0) dot.x = width;
  //se passou a borda de baixo do ecrã, (y > que a altura), volta para a parte superior da tela (0)
  if(dot.y > height) dot.y = 0;
  //senão, se passou a borda de cima (y < que 0) aparece em baixo
  else if (dot.y < 0) dot.y = height;
 
  layer.circle(dot.x + random(-2, 2), dot.y + random (-2, 2), 1 + vol * 60);
 }


function saveImage() {
  saveCanvas("synesthesia", "png"); //guarda o desenho feito como png 
}

function clearDrawing() {
  layer.clear(); //limpa a página para se conseguir fazer outro desenho
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
