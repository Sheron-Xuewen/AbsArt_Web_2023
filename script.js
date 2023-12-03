document.addEventListener('DOMContentLoaded', function() {
    let currentSceneIndex = 0;
    const scenes = document.querySelectorAll('.scene');

    // 显式地将showScene绑定到window对象，以便在全局作用域中使用
    window.showScene = function(index) {
        console.log('Showing scene', index);
        scenes.forEach(scene => scene.style.display = 'none');
        scenes[index].style.display = 'block';
        currentSceneIndex = index;
    };

    // 显式地将navigate绑定到window对象，以便在全局作用域中使用
    window.navigate = function(direction) {
        console.log('Navigating', direction);
        if (direction === 'next') {
            currentSceneIndex = (currentSceneIndex + 1) % scenes.length;
        } else if (direction === 'prev') {
            currentSceneIndex = (currentSceneIndex - 1 + scenes.length) % scenes.length;
        }
        window.showScene(currentSceneIndex); // 调用showScene时使用window前缀
    };

    // 绑定顶部导航和按钮事件
    document.querySelectorAll('.top-navigation li').forEach((navItem, index) => {
        navItem.addEventListener('click', () => window.showScene(index));
    });
    
    // 默认显示第一个场景
    window.showScene(0);

    // 为按钮添加点击效果
    const navButtons = document.querySelectorAll('.navigation-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 200);
        });
    });
    document.addEventListener('DOMContentLoaded', (event) => {
        const videoElement = document.getElementById('videoElement');
        const downloadButton = document.getElementById('downloadButton');
    
        downloadButton.href = videoElement.querySelector('source').src;
        downloadButton.download = 'Savory Tales of Mountain and Sea.mp4';
    
        downloadButton.click();
    });
    
});
