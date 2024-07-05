import { FC } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeLightInit } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: FC<CodeEditorProps> = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      height="1000px"
      theme={vscodeLightInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
      })}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
