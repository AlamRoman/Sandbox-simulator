let lastTime = 0;

function loop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    if (deltaTime < 0.2) { 
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.calculatePosition();
            updatePosition(particle, deltaTime);
            draw(particle);
        });
    }

    requestAnimationFrame(loop);
}