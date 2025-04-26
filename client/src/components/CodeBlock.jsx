import { useState } from "react";

export default function CodeBlock({ code, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative bg-gray-800 text-white rounded-lg overflow-hidden my-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-700 text-sm px-2 py-1 rounded hover:bg-gray-600 transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="overflow-x-auto p-4 text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
