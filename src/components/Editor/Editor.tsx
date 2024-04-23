import { useState, useRef } from 'react';
import styles from './Editor.module.css';
import useCodeHighlighter from './useCodeHighlighter';
import useLineNumbers from './useLineNumbers';
import 'prismjs/themes/prism.css';

interface EditorProps {
    initialCode: string;
    onCodeChange: (newCode: string) => void;
}

export default function Editor({ initialCode, onCodeChange }: EditorProps) {
    const [code, setCode] = useState<string>(initialCode);
    const lineNumbers = useLineNumbers(code);
    const highlightedCode = useCodeHighlighter(code, 'jsx');

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
        if (text[text.length - 1] == '\n') {
            text += ' ';
        }
        setCode(text);
        onCodeChange(text);
        handleScroll();
    }

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
