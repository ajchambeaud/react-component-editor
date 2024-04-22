import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';

self.onmessage = (event: MessageEvent) => {
    const { code, language } = event.data;
    try {
        const highlightedCode = Prism.highlight(code, Prism.languages[language], language);
        postMessage({ highlightedCode });
    } catch (error) { }
};
