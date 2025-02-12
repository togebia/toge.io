// scripts/main.js
document.addEventListener('DOMContentLoaded', () => {
    // 路径标准化函数（增强版）
    const normalizePath = (path) => {
        // 处理Windows路径的反斜杠
        return path.replace(/\\/g, '/')
                  .replace(/\/{2,}/g, '/')
                  .replace(/\/+$/, '')
                  .toLowerCase();
    };

    // 智能路径计算
    const getBasePath = () => {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/pages/')) {
            return currentPath.startsWith('/pages/') ? '../' : './';
        }
        return 'pages/';
    };

    // 导航激活逻辑（带容错机制）
    const currentPath = normalizePath(window.location.pathname);
    const navLinks = document.querySelectorAll('.nav-link');
    
    try {
        navLinks.forEach(link => {
            const linkUrl = new URL(link.href);
            const linkPath = normalizePath(linkUrl.pathname);
            
            // 精确匹配逻辑
            const isActive = currentPath === linkPath || 
                           (currentPath.endsWith('/index.html') && linkPath.endsWith('/'));
            
            if (isActive) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    } catch (error) {
        console.error('导航状态处理异常:', error);
    }

    // 新版文章跳转逻辑（完全重写）
    const handleArticleNavigation = () => {
        // 自动修复归档页面的链接（防止/pages重复）
        document.querySelectorAll('.article-link').forEach(link => {
            const rawHref = link.getAttribute('href');
            if (rawHref.startsWith('pages/')) {
                link.href = rawHref.replace('pages/', '');
            }
        });

        // 动态路径修正
        document.querySelectorAll('[data-article]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const articleId = item.dataset.article;
                const basePath = getBasePath();
                window.location.href = `${basePath}articles/${articleId}.html`;
            });
        });
    };

    // 安全执行跳转逻辑
    try {
        handleArticleNavigation();
    } catch (error) {
        console.error('文章导航处理异常:', error);
        // 降级处理：恢复默认链接行为
        document.querySelectorAll('.article-link').forEach(link => {
            link.onclick = null;
        });
    }

    // 控制台提示
    console.log('核心脚本加载完成，当前路径：', normalizePath(window.location.pathname));
});
