import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './ChatBotDemoComp.module.scss';

export default function ChatBotDemoComp({ pageInfo, data }) {
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [templateData, setTemplateData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    async function GetTemplates() {
        try {
            setLoading(true);
            const response = await axios.get(process.env.HELLO_API_URL + '/public/bot/template?with_widget=true');
            if (response?.data?.success === true) {
                const data = await response;
                setTemplateData(data?.data?.data?.templates);
                setLoading(false);
            } else {
                console.error('Failed to fetch templates');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        GetTemplates();
    }, []);

    useEffect(() => {
        if (templateData.length > 0) {
            setSelectedTemplate(templateData[0]);
        }
    }, [templateData]);

    const handleTemplateSelet = (template) => {
        // if (template?.bot_id !== selectedTemplate?.bot_id) {
        //     const iframe = document.querySelector('.chatbotwrapper iframe');
        //     if (iframe) {
        //         iframe.src = `/chat-widget.html?widgetToken=${template?.token}&widgetUrl=${process.env.CHATBOT_TEMPLATE_TEST_URL}&botId=${template?.bot_id}&botType=${template?.bot_type}`;
        //     }
        // }
        setSelectedTemplate(template);
    };

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
                                onClick={() => {
                                    handleTemplateSelet(template);
                                }}
                                key={index}
                                className={`cursor-pointer rounded bg-neutral p-6 flex flex-col gap-2 hover:border-[#F2CA55] border-2 ${
                                    template?.bot_id == selectedTemplate?.bot_id
                                        ? 'border-[#F2CA55]  border-2'
                                        : ' border-neutral'
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
                                handleTemplateSelet(selectedTemplate);
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
                <div className={`${style?.chatbotwrapper} chatbotwrapper`}>
                    <iframe
                        src={`/chat-widget.html?widgetToken=${selectedTemplate?.token}&widgetUrl=${process.env.CHATBOT_TEMPLATE_TEST_URL}&botId=${selectedTemplate?.bot_id}&botType=${selectedTemplate?.bot_type}`}
                        style={{ width: '100%', height: '650px', border: 'none' }}
                        className='lg:max-w-full '
                    ></iframe>
                </div>
            </div>
            <div className='d-grid grid-cols-2 chatbot_card-cont'></div>
        </>
    );
}
