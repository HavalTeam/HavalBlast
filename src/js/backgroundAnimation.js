document.addEventListener('DOMContentLoaded', () => {
    const CLASSES = gm.blocksClasses;
    const forMenu = document.getElementById('main-menu');
    function spawnBg() {
        const constr = CLASSES[Math.floor(Math.random() * CLASSES.length)];
        const block = new constr(null, forBg = true);

        let scale;
        let duration;
        let startOpacity;

        if (forMenu) {
            scale = 0.6 + Math.random() * 1.5;
            duration = (Math.random() * 5 + scale * 15) * 1000;
            startOpacity = 0.9;
        } else {
            scale = 0.2 + Math.random() * 0.6;
            duration = (Math.random() * 6 + scale * 20) * 1000;
            startOpacity = 0.7; 
        }
        

        Object.assign(block.blockDiv.style, {
            position: 'absolute',
            top: '-100px',
            left: `${Math.random() * (window.innerWidth - block.sizeX)}px`,
            zIndex: (1 + Math.floor(Math.random() * 10)) * -1,
            pointerEvents: 'none',
            transformOrigin: 'top left',
            transform: `translateY(-100px) scale(${scale})`,
            opacity: startOpacity,
        });

        if (forMenu) {
            const anim = block.blockDiv.animate([
                { transform: `translateY(-100px)` },
                { transform: `translateY(110vh)` }
            ], {
                duration,
                easing: 'linear',
                fill: 'both',
            });
            anim.onfinish = () => block.blockDiv.remove();

        } else {
            const anim = block.blockDiv.animate([
                { offset: 0, transform: `translateY(-100px)`, opacity: startOpacity },
                { offset: 0.6, transform: `translateY(${window.innerHeight * 0.6}px)`, opacity: startOpacity },
                { offset: 0.8, transform: `translateY(${window.innerHeight * 0.8}px)`, opacity: 0 },
                { offset: 1,   transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
            ], {
                duration,
                easing: 'linear',
                fill: 'forwards',
            });
            anim.onfinish = () => block.blockDiv.remove();
        }

    }
    if (forMenu) {
        setInterval(spawnBg, (0.5 + Math.random()) * 1000);
    } else {
        setInterval(spawnBg, (1 + Math.random()) * 1000);
    }
});
