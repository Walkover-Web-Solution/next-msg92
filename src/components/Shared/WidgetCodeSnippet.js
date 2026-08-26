import React from 'react';
import { MdContentCopy } from 'react-icons/md';

const WidgetCodeSnippet = ({ widgetCode, onCopy, copySuccess }) => {
    // Encode HTML entities for display
    const displayCode = widgetCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return (
        <div className='w-full flex flex-col gap-4'>
            <span className='text-xl font-semibold'>Widget code snippet</span>
            <pre
                style={{
                    position: 'relative',
                    background: '#1e293b',
                    color: '#e2e8f0',
                    padding: '3rem 1rem 1rem 1rem',
                    borderRadius: '0.5rem',
                    overflow: 'auto',
                    fontSize: '0.75rem',
                    lineHeight: '1.5',
                }}
            >
                <div className='absolute right-2 top-2'>
                    <button onClick={onCopy} className='btn btn-sm btn-white'>
                        <MdContentCopy />
                        <span>{copySuccess ? 'Copied!' : 'Copy code'}</span>
                    </button>
                </div>
                <code
                    className='language-javascript'
                    style={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                        background: 'transparent',
                        color: 'inherit',
                    }}
                    dangerouslySetInnerHTML={{ __html: displayCode }}
                ></code>
            </pre>
            <p>Copy and paste this code on every page of your website.</p>
        </div>
    );
};

export default WidgetCodeSnippet;
