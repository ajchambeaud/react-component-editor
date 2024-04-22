import { useState, useRef, useEffect } from 'react';
import styles from './Editor.module.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';

interface EditorProps {
    initialCode: string;
    onCodeChange: (newCode: string) => void;
}

export default function Editor({ initialCode, onCodeChange }: EditorProps) {
    const [code, setCode] = useState<string>(initialCode);
    const [highlightedCode, setHighlightedCode] = useState<string>('');
    const [lineNumbers, setLineNumbers] = useState('1');

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const preRef = useRef<HTMLPreElement>(null);
    const marginRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (textAreaRef.current && preRef.current && marginRef.current) {
            preRef.current.scrollLeft = textAreaRef.current.scrollLeft;
            preRef.current.scrollTop = textAreaRef.current.scrollTop;
            marginRef.current.scrollTop = textAreaRef.current.scrollTop;
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let text = event.target.value;
        if (text[text.length - 1] == "\n") {
            text += " ";
        }
        setCode(text);
        onCodeChange(text);
        handleScroll();
    }

    const updateLineNumbers = (input: string) => {
        const lines = input.split('\n').length;
        const lineNumberString = Array.from(new Array(lines), (_x, i) => i + 1).join('\n');
        setLineNumbers(lineNumberString);
    };

    useEffect(() => {
        setHighlightedCode(Prism.highlight(code, Prism.languages.jsx, 'jsx'));
    }, [code]);

    useEffect(() => {
        updateLineNumbers(code);
    }, [code]);

    return (
        <div className={styles.editorContainer}>
            <div className={styles.editorMargin} ref={marginRef}>
                <pre>{lineNumbers}</pre>
            </div>
            <textarea ref={textAreaRef}
                className={styles.editorTextarea}
                value={code}
                onChange={handleChange}
                onScroll={handleScroll} />
            <pre ref={preRef} className={styles.editorPreview} dangerouslySetInnerHTML={{ __html: highlightedCode }}></pre>
        </div>
    )
}
