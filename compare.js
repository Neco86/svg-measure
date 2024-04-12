(() => {
    fetch('https://neco86.github.io/svg-measure/')
        .then(res => res.text())
        .then(html => {
            const blob = new Blob([html], { type: 'text/html' });
            return URL.createObjectURL(blob);
        })
        .then(url => {
            const iframe = document.createElement('iframe');
            const styles = {
                position: 'fixed',
                zIndex: '10000',
                top: '0px',
                left: '0px',
                width: '100vw',
                height: '100vh',
                border: 'none',
            };
            Object.keys(styles).forEach(key => {
                iframe.style[key] = styles[key];
            });
            iframe.src = url;
            document.body.appendChild(iframe);
        })

    window.onbeforeunload = e => {
        e.preventDefault();
    }
})()