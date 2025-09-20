// 动态加载 JS 文件
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 加载 KaTeX 和 Pseudocode.js
Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.js'),
    loadScript('https://cdn.jsdelivr.net/npm/pseudocode@2.4.1/build/pseudocode.min.js')
]).then(() => {
    if (typeof pseudocode === 'undefined') {
        console.error('Pseudocode.js not loaded');
        return;
    }
    // 匹配 Hexo 渲染后的伪代码块
    const pseudocodes = document.querySelectorAll('figure.highlight table tr td.code pre code.hljs.pseudocode');
    // 渲染每个伪代码块
    const options = {
        lineNumber: true,
        lineNumberPunc: ':',
        noEnd: false,
        titlePrefix: 'Algorithm'
    };
    pseudocodes.forEach((codeBlock) => {
        try {
            const code = codeBlock.textContent;
            const container = codeBlock.closest('figure.highlight');
            const newContainer = document.createElement('div');
            newContainer.className = 'pseudocode-container';
            pseudocode.render(code, newContainer, options);
            container.parentNode.replaceChild(newContainer, container);
        } catch (error) {
            console.error('Error rendering pseudocode:', error);
        }
    });
}).catch(error => {
    console.error('Error loading required scripts:', error);
});