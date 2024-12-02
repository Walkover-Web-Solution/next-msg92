import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import style from './ChatBotDemoComp.module.scss';

export default function ChatBotDemoComp({ pageInfo, data }) {
    const [selectedTemplate, setSelectedTemplate] = useState({});
    const [templateData, setTemplateData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [iframeLoading, setIframeLoading] = useState(true);

    // Function to fetch templates
    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.HELLO_API_URL}/public/bot/template?with_widget=true`);
            if (response?.data?.success) {
                setTemplateData(response.data.data.templates);
            } else {
                setError('Failed to fetch templates');
            }
        } catch (error) {
            setError('Error fetching templates');
        } finally {
            setLoading(false);
        }
    };

    // Fetch templates on component mount
    useEffect(() => {
        fetchTemplates();
    }, []);

    // Set the first template as selected when templateData is available
    useEffect(() => {
        if (templateData.length > 0 && Object.keys(selectedTemplate).length === 0) {
            setSelectedTemplate(templateData[0]);
        }
    }, [templateData]);

    // Memoize handleTemplateSelect to avoid re-creation on every render
    const handleTemplateSelect = useCallback((template) => {
        setSelectedTemplate(template);
        setIframeLoading(true);
    }, []);

    const chatbotContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Chat Widget</title>
            </head>
            <body>
                <script>
                    (function() {
                        document.cookie = 'hello-widget-uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        const script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.onload = function() {
                            initChatWidget({
                                widgetToken: '${selectedTemplate?.token || ''}',
                                hide_launcher: true,
                                launch_widget: true,
                                show_close_button: false,
                                bot_type: '${selectedTemplate?.bot_type}',
                                bot_id: ${selectedTemplate?.bot_id || null},
                            }, 0);
                        };
                        script.src = '${process.env.CHATBOT_TEMPLATE_TEST_URL}/widget/chat-widget.js';
                        document.body.appendChild(script);
                    })();
                </script>
            </body>
        </html>
    `;

    return (
        <>
            <div className='container flex lg:flex-row flex-col cont_p lg:gap-24 gap-10 justify-between'>
                <div className='flex flex-col gap-6 lg:w-2/3 w-full'>
                    <div className='flex flex-col gap-6'>
                        <p className='text-[#8C5D00]'>AI CHATBOT DEMO</p>
                        <h1 className='text-4xl font-semibold'>
                            Experience AI Chatbots in Action, Start Chatting Now!
                        </h1>
                        <h2 className='text-lg'>
                            Integrate AI-powered chatbot with WhatsApp, Chatbot, Facebook Messenger and more channels
                        </h2>
                    </div>

                    <div className='lg:grid hidden lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 rounded-lg gap-6'>
                        {templateData.map((template, index) => (
                            <div
                                onClick={() => handleTemplateSelect(template)}
                                key={index}
                                className={`cursor-pointer rounded bg-neutral p-6 flex flex-col gap-2 hover:border-[#F2CA55] border-2 ${
                                    template?.bot_id === selectedTemplate?.bot_id
                                        ? 'border-[#F2CA55]'
                                        : 'border-neutral'
                                }`}
                            >
                                <h3 className='text-lg font-bold'>{template?.bot_name}</h3>
                                <p>
                                    {template?.description || 'Experience AI Chatbots in Action, Start Chatting Now!'}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className='flex lg:hidden'>
                        <select
                            className='select select-bordered w-full max-w-xs'
                            onChange={(e) => {
                                const selectedTemplate = templateData.find(
                                    (template) => template.bot_name === e.target.value
                                );
                                handleTemplateSelect(selectedTemplate);
                            }}
                            value={selectedTemplate?.bot_name || ''}
                        >
                            {templateData.map((template, index) => (
                                <option key={index} value={template?.bot_name}>
                                    {template?.bot_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={`${style.chatbotwrapper} chatbotwrapper`}>
                    {iframeLoading && <div className={style.loadingIndicator}>Loading...</div>}
                    <iframe
                        style={{ width: '100%', height: '650px', border: 'none' }}
                        className='lg:max-w-full'
                        title='Chatbot Frame'
                        srcDoc={chatbotContent}
                        onLoad={() => setIframeLoading(false)}
                    ></iframe>
                </div>
            </div>
        </>
    );
}
