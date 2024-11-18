import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './HelloChatBotComp.module.scss';

export default function Chatbot() {
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [templateData, setTemplateData] = useState([]);
    console.log('🚀 ~ Chatbot ~ templateData:', templateData);
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
        if (template?.bot_id !== selectedTemplate?.bot_id) {
            const iframe = document.querySelector('.chatbotwrapper iframe');
            if (iframe) {
                iframe.src = `/chat-widget.html?widgetToken=${template?.token}&widgetUrl=${process.env.CHATBOT_TEMPLATE_TEST_URL}`;
            }
        }
        setSelectedTemplate(template);
    };

    return (
        <>
            <div className='container flex flex-col lg:flex-row cont_p gap-24 justify-between'>
                <div className='flex flex-col gap-6 lg:w-2/3 w-full'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[#F2CA55]'>AI CHATBOT DEMO</p>
                        <h1 className='text-4xl font-semibold'>
                            Experience AI Chatbots in Action, Start Chatting Now!
                        </h1>
                        <h2 className='text-lg'>
                            Integrate AI-powered chatbot with WhatsApp, Chatbot, Facebook Messenger and more channels
                        </h2>
                    </div>

                    <div className='grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 rounded-lg gap-6'>
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
                </div>
                <div className={`${style?.chatbotwrapper} chatbotwrapper`}>
                    <iframe
                        src={`/chat-widget.html?widgetToken=${selectedTemplate?.token}&widgetUrl=${process.env.CHATBOT_TEMPLATE_TEST_URL}`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    ></iframe>
                </div>
            </div>
            <div className='d-grid grid-cols-2 chatbot_card-cont'></div>
        </>
    );
}
