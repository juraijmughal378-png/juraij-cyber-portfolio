const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for(let x = 0; x < columns; x++) drops[x] = canvas.height;

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00FF00';
  ctx.font = fontSize + 'px monospace';

  for(let i = 0; i < drops.length; i++){
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i]);
    drops[i] += fontSize;
    if(drops[i] > canvas.height && Math.random() > 0.975) drops[i] = 0;
  }
}

setInterval(draw, 50);
