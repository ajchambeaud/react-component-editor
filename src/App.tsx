import { useState } from 'react';
import Editor from './components/Editor';
import CodePreview from './components/CodePreview';
import './App.css';

const codeTemplate = `
export default function Hello() {
  return <h1>Hello, World!</h1>;
}
`;

function App() {
  const [code, setCode] = useState<string>(codeTemplate);

  // Handle changes in code from the Editor
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <>
      <Editor initialCode={code} onCodeChange={handleCodeChange} />
      <CodePreview code={code} />
    </>
  );
}

export default App
