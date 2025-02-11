// scripts/clickEffect.js
document.addEventListener('DOMContentLoaded', () => {
    const coreValues = [
        "富强", "民主", "文明", "和谐",
        "自由", "平等", "公正", "法治",
        "爱国", "敬业", "诚信", "友善"
    ];

    const generateRandomColor = () => {
        // 生成鲜艳的随机颜色（HSL色彩模式）
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 100%, 50%)`;
    };

    const createEffect = (e) => {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        
        // 随机选择社会主义核心价值观词汇
        const text = coreValues[Math.floor(Math.random() * coreValues.length)];
        
        // 设置随机颜色
        effect.style.color = generateRandomColor();
        effect.textContent = text;

        // 位置设置
        effect.style.left = `${e.clientX}px`;
        effect.style.top = `${e.clientY}px`;

        // 动画参数
        const angle = (Math.random() * 30) - 15; // -15°到15°随机角度
        const distance = 50 + Math.random() * 100; // 移动距离

        effect.style.transform = `
            translate(
                ${Math.cos(angle) * distance}px,
                ${Math.sin(angle) * distance}px
            )
            scale(${0.2 + Math.random() * 0.8})
        `;

        effect.style.opacity = 0;
        document.body.appendChild(effect);

        // 动画效果
        requestAnimationFrame(() => {
            effect.style.transition = 'all 1s ease-out';
            effect.style.opacity = 1;
            effect.style.transform += ' scale(1.2)';
            
            // 移除元素
            setTimeout(() => {
                effect.remove();
            }, 1000);
        });
    };

    // 添加点击事件监听
    document.addEventListener('click', (e) => {
        // 排除功能按钮点击
        if (!e.target.closest('button, a, [data-no-effect]')) {
            createEffect(e);
        }
    });
});
