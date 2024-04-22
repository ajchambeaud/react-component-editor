import { useState, useEffect } from 'react';

function useLineNumbers(code: string): string {
    const [lineNumbers, setLineNumbers] = useState('1');

    const updateLineNumbers = (input: string) => {
        const lines = input.split('\n').length;
        const lineNumberString = Array.from(new Array(lines), (_x, i) => i + 1).join('\n');
        setLineNumbers(lineNumberString);
    };

    useEffect(() => {
        updateLineNumbers(code);
    }, [code]);

    return lineNumbers;
}

export default useLineNumbers;
