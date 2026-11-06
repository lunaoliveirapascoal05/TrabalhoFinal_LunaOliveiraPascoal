function setup() {
  createCanvas(windowWidth, windowHeight).style("display", "block");
  document.body.style.margin = 0; //tira a borda branca da tela
  
}

function draw() {

background(255, 182, 217);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
