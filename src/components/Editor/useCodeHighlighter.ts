import { useEffect, useRef, useState } from 'react';
import HighlightWorker from './highlightWorker?worker';

function useCodeHighlighter(code: string, language: string): string {
    const [highlightedCode, setHighlightedCode] = useState('');
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new HighlightWorker();
        workerRef.current.onmessage = (e: MessageEvent) => {
            setHighlightedCode(e.data.highlightedCode);
        };
        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    useEffect(() => {
        if (workerRef.current) {
            workerRef.current.postMessage({ code, language });
        }
    }, [code, language]);

    return highlightedCode;
}

export default useCodeHighlighter;
