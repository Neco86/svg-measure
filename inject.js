(() => {
    const createUrl = (value, type) => {
        const blob = new Blob([value], { type });
        return URL.createObjectURL(blob);
    };

    const setStyle = (element, style) => {
        Object.keys(style).forEach(key => {
            element.style[key] = style[key];
        })
    };

    const BASE = 'https://neco86.github.io/svg-measure/';

    fetch(BASE)
        .then(res => res.text())
        .then(html => {
            const paths = html.match(/("\.\/assets\/\S+")/g);
            Promise.all(
                paths.map(path => {
                    return fetch(`${BASE}${path.slice(2, -1)}`).then(res => res.text());
                })
            )
                .then(([js, css]) => {
                    const jsUrl = createUrl(js, 'text/javascript');
                    const cssUrl = createUrl(css, 'text/css');
                    const htmlText = html.replace(paths[0], jsUrl).replace(paths[1], cssUrl);
                    return createUrl(htmlText, 'text/html');
                })
                .then(url => {
                    const iframe = document.createElement('iframe');
                    setStyle(iframe, {
                        position: 'fixed',
                        zIndex: '10000',
                        top: '0px',
                        left: '0px',
                        width: '100vw',
                        height: '100vh',
                        border: 'none',
                    });
                    iframe.src = url;
                    document.body.appendChild(iframe);
                })
        });

    window.onbeforeunload = e => {
        e.preventDefault();
    }
})()