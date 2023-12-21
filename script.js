document.addEventListener('DOMContentLoaded', function() {
    let currentSceneIndex = 0;
    const scenes = document.querySelectorAll('.scene');
    const rotateTarget = document.getElementById('rotateTarget');
    let currentRotatedElement = null;

    window.showScene = function(index) {
        console.log('Showing scene', index);
        scenes.forEach(scene => scene.style.display = 'none');

        const topNavItems = document.querySelectorAll('.top-navigation li');
        topNavItems.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        scenes[index].style.display = 'block';
        currentSceneIndex = index;
    };

    window.navigate = function(direction) {
        console.log('Navigating', direction);
        if (direction === 'next') {
            currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
        } else if (direction === 'prev') {
            currentSceneIndex = (currentSceneIndex - 1 + scenes.length) % scenes.length;
        }
        window.showScene(currentSceneIndex);
    };

    document.querySelectorAll('.top-navigation li').forEach((navItem, index) => {
        navItem.addEventListener('click', () => window.showScene(index));
    });

    window.showScene(0);

    const navButtons = document.querySelectorAll('.navigation-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 200);
        });
    });

    document.addEventListener('mousemove', function(e) {
        const radius = 50;
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        rotateTarget.style.left = `${e.pageX - radius}px`;
        rotateTarget.style.top = `${e.pageY - radius}px`;

        rotateTarget.style.display = 'none';
        let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        rotateTarget.style.display = 'block';

        if (elemBelow && !elemBelow.classList.contains('non-rotatable')) {
            if(currentRotatedElement !== elemBelow){
                if(currentRotatedElement){
                    currentRotatedElement.style.transform = ''; // Reset the previous element
                    currentRotatedElement.removeEventListener('mouseleave', resetRotation);
                }
                elemBelow.addEventListener('mouseleave', resetRotation); // Add mouseleave event to new element
                currentRotatedElement = elemBelow;
            }
            elemBelow.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
        } else {
            resetRotation();
        }
    });

    function resetRotation() {
        if (currentRotatedElement) {
            currentRotatedElement.style.transform = '';
            currentRotatedElement.removeEventListener('mouseleave', resetRotation);
            currentRotatedElement = null;
        }
    }

    // Auto-download video
    const videoElement = document.getElementById('videoElement');
    const downloadButton = document.getElementById('downloadButton');

    if(videoElement && downloadButton) {
        downloadButton.href = videoElement.querySelector('source').src;
        downloadButton.download = 'Savory Tales of Mountain and Sea.mp4';
        downloadButton.click();
    }
});


