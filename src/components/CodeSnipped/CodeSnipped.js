// components/CodeSnippet.js
import { useEffect, useState } from 'react';
import { MdCopyAll } from 'react-icons/md';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { sunburst } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const languageMap = {
    curl: 'bash',
    python: 'python',
    node: 'javascript',
    php: 'php',
    ruby: 'ruby',
};

const CodeSnippet = ({ curlKey }) => {
    const [snippets, setSnippets] = useState(null);
    const [error, setError] = useState('');
    const [activeLang, setActiveLang] = useState('python');

    useEffect(() => {
        async function fetchSnippets() {
            try {
                const res = await fetch('/api/curlConvert', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ curlKey }),
                });
                const data = await res.json();
                if (res.ok) {
                    setSnippets(data.snippets);
                    setActiveLang(Object.keys(data.snippets)[0]); // default to first language
                } else {
                    setError(data.error || 'Unknown error');
                }
            } catch (err) {
                setError('Failed to load snippets');
            }
        }

        fetchSnippets();
    }, [curlKey]);

    const copyToClipboard = async () => {
        if (snippets?.[activeLang]) {
            try {
                await navigator.clipboard.writeText(snippets[activeLang]);
                alert('Copied!');
            } catch {
                alert('Failed to copy');
            }
        }
    };

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!snippets) return <p>Loading code snippets...</p>;

    return (
        <div className='md:w-[800px] max-w-full mx-auto flex flex-col gap-0 rounded-lg overflow-hidden border'>
            <div role='tablist' className='flex bg-gray-700'>
                {Object.keys(snippets).map((language, index) => {
                    return (
                        <a
                            key={index}
                            role='tab'
                            className={` w-full p-2 text-center cursor-pointer transition-all  hover:bg-gray-800 text-white text-sm ${
                                activeLang === language ? 'bg-gray-800' : ''
                            }`}
                            onClick={() => setActiveLang(language)}
                        >
                            {language}
                        </a>
                    );
                })}
            </div>
            <div className='relative bg-black '>
                <div className='absolute right-0 z-20 text-white flex gap-1 items-center p-4'>
                    <button
                        className='btn btn-primary btn-sm'
                        onClick={() => {
                            copyToClipboard();
                        }}
                    >
                        <MdCopyAll />
                        Copy
                    </button>
                </div>
                <div className='overflow-auto h-[380px]'>
                    <SyntaxHighlighter
                        language={languageMap[activeLang] || 'text'}
                        style={sunburst}
                        customStyle={{ borderRadius: 6, fontSize: 12, padding: 24 }}
                        wrapLongLines={true}
                    >
                        {snippets[activeLang]}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default CodeSnippet;
