const canvas = document.getElementById('animated-background');
const ctx = canvas.getContext('2d');

let width;
let height;
let gridSize = 30;

let symbols = [];
const symbolCount = 10; 
const symbolSize = 15;
const minSymbolLife = 200;
const maxSymbolLife = 500; 
const symbolsList = ['♦', '✕', '✦', '✕', '★', '⯀'];


function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    calculateGridSize();
}


function calculateGridSize(){
    
    gridSize = Math.max(20,Math.min(30, Math.floor(width / 30)));
}

function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;


    for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }


    for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}


class Symbol {
    constructor(x, y, size, symbolText) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.symbolText = symbolText;
        this.life = Math.floor(Math.random() * (maxSymbolLife - minSymbolLife + 1) + minSymbolLife);
        this.maxLife = this.life;  
        this.alpha = 0; t
        this.fadeDuration = 20; 
    }

    draw() {
        ctx.font = `${this.size}px monospace`;
        ctx.fillStyle = `rgba(100, 100, 100, ${this.alpha})`; 
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbolText, this.x, this.y);
    }

    update() {
        this.life--;


        if(this.life > (this.maxLife - this.fadeDuration)){
          this.alpha =  Math.min(1,(this.maxLife - this.life) / this.fadeDuration)
        }

        else if(this.life <= this.fadeDuration) {
           this.alpha =  Math.max(0,this.life / this.fadeDuration)
        } else {
            this.alpha = 1; 
        }

        if(this.life <= 0) {
          this.remove = true;
        }

        this.draw();
    }
}

function createSymbol() {

      const gridX = Math.floor(Math.random() * (width / gridSize));
      const gridY = Math.floor(Math.random() * (height / gridSize));


      const x = gridX * gridSize + gridSize / 2;
      const y = gridY * gridSize + gridSize / 2;


      const randomSymbol = symbolsList[Math.floor(Math.random() * symbolsList.length)]
      symbols.push(new Symbol(x, y, symbolSize, randomSymbol));
}


function manageSymbols() {
  if (symbols.length < symbolCount) {
    createSymbol();
  }


  for (let i = symbols.length - 1; i >= 0; i--) {
      symbols[i].update();
    if(symbols[i].remove) {
      symbols.splice(i, 1);
        }
  }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    manageSymbols();
    requestAnimationFrame(draw);
}


resizeCanvas();
draw();

window.addEventListener('resize', function() {
    resizeCanvas();
});