// Countdown Timer
function countdown() {
    const countDate = new Date("January 1, 2024 00:00:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById('timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      
      if (distance < 0) {
        clearInterval(interval);
        document.getElementById('timer').innerHTML = "Happy New Year!";
      }
    }, 1000);
  }
  
  // Fireworks Animation
  function fireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 300;
  
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function Firework() {
      this.x = random(0, canvas.width);
      this.y = canvas.height;
      this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
      this.radius = random(1, 4);
      this.velocity = { x: random(-2, 2), y: random(-12, -8) };
      this.gravity = 0.1;
      this.opacity = 1;
      this.decay = random(0.015, 0.03);
    }
  
    Firework.prototype.update = function() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.velocity.y += this.gravity;
      this.opacity -= this.decay;
  
      if (this.opacity <= this.decay) {
        fireworks.splice(fireworks.indexOf(this), 1);
      }
    };
  
    Firework.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.closePath();
    };
  
    const fireworks = [];
  
    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
      });
  
      requestAnimationFrame(animate);
    }
  
    canvas.addEventListener('click', (e) => {
      const numberOfFireworks = 30;
      for (let i = 0; i < numberOfFireworks; i++) {
        fireworks.push(new Firework());
      }
    });
  
    animate();
  }
  
  // Start Countdown and Fireworks
  countdown();
  fireworks();
  