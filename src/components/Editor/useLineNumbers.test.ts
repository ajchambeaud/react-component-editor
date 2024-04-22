import { renderHook } from '@testing-library/react-hooks';
import useLineNumbers from './useLineNumbers';

describe('useLineNumbers', () => {
    it('should return "1" for empty input', () => {
        const { result } = renderHook(() => useLineNumbers(''));
        expect(result.current).toBe('1');
    });

    it('should return correct line numbers for multiple lines', () => {
        const multiLineText = 'Line 1\nLine 2\nLine 3';
        const { result } = renderHook(() => useLineNumbers(multiLineText));
        expect(result.current).toBe('1\n2\n3');
    });

    it('should handle input that ends with a newline', () => {
        const textEndingWithNewLine = 'Line 1\nLine 2\n';
        const { result } = renderHook(() => useLineNumbers(textEndingWithNewLine));
        expect(result.current).toBe('1\n2\n3');
    });
});
