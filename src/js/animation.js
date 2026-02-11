let lastTime = 0;

function loop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    if (deltaTime < 0.2) { 
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
            if (!particles[i].isDead) {
                particles[i].calculatePosition();
            }
        }
        
        particles = particles.filter(p => !p.isDead);

        for (let i = 0; i < particles.length; i++) {
            draw(particles[i]);
        }
    }

    requestAnimationFrame(loop);
}