import { useRef, useEffect } from 'react';
import styles from './CodePreview.module.css';
import debounce from 'lodash/debounce';

interface CodePreviewProps {
    code: string;
}

const htmlTemplate = `
    <html>
    <head>
        <style>
            body, html {
                height: 100%;
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f0f0f0; /* Light gray background */
            }
            #root {
                width: 100%;
                max-width: 960px; /* or any max-width or width you prefer */
            }
        </style>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://unpkg.com/react@latest/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script>
        window.onerror = function(message, source, lineno, colno, error) {
            console.log('Error in code');
        }
        </script>
        <script type="text/babel">BABEL_CODE</script>
    </body>
    </html>
`;

function CodePreview({ code }: CodePreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleUpdateIframe = debounce(() => {
            if (!iframeRef.current) return;

            const doc = iframeRef.current.contentWindow?.document;
            if (!doc) return;

            let componentCode = code.replace('export default', 'const UserComponent=');
            componentCode += `const root = ReactDOM.createRoot(document.getElementById('root'));`;
            componentCode += `root.render(<UserComponent/>);`;
            const fullCode = htmlTemplate.replace('BABEL_CODE', componentCode);

            doc.open();
            doc.write(fullCode);
            doc.close();
        }, 1000);

        handleUpdateIframe();
        return () => handleUpdateIframe.cancel();
    }, [code]);

    return (
        <div className={styles.container}>
            <iframe ref={iframeRef} style={{ width: '100%', height: '400px', border: 'none' }} title="Preview" />
        </div>
    );
}

export default CodePreview;
