# Projeto Final Luna Oliveira- Sinestesia como arte
***Conceito***

Para o projeto quis recriar a experiência da Sinestesia, fenómeno em que se associam cores, formas, padrões ou movimentos a cada som ou vibração.

Para desenvolver o código usei o AI Claude.
As decisões estéticas, mudanças de planos e conceito foram definidos por mim.
Adicionei comentários no código para compreender a lógica das linhas conforme ia fazendo e alterando.


***Ingredientes***

No *Input* utilizei o som, controlado pelo fft, o tempo através do frameCount() e o random() para gerar formas e coordenadas.
Para o *Output* criei uma web app onde interagimos pelo microfone, criando grafismos, com controlo das linhas, fundo e velocidade, que gera um png para guardar os grafismos.
Para a expressão utilizei a relação do som com a imagem, animações generativas, o tom para definir a velocidade, o volume da voz para controlar o tamanho das bolinhas e partículas que se movem de maneiras diferentes com o noise().


***Relação com o (com)FORMA / projeto pessoal***

O png dos desenhos gerados pode criar o design do exterior do dispensador de fita-cola, mas também funciona como projeto pessoal, é interessante e permite aplicar estes desenhos em vários contextos.



***Referências usadas:***

-Claude Ai para código mais complexo

-Tom da voz	new p5.FFT(), fft.analyze(), fft.getCentroid()- https://p5js.org/reference/p5.FFT

-Permissão do som	userStartAudio()- https://p5js.org/reference/#/p5/userStartAudio

-Direção e movimento	cos(), sin(), TWO_PI- https://p5js.org/reference/#/p5/cos

-noise()- https://p5js.org/reference/#/p5/noise

-4.1 Particle System Simulation, The Nature of Code- https://www.youtube.com/watch?v=syR0klfncCk

-I.3 noise() vs random()- https://thecodingtrain.com/tracks/noise/noc/perlin/noise-vs-random