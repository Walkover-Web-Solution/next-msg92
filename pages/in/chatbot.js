import GetStartedSection from '@/components/getStartedSection/getStartedSection';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Chatbot() {
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [templateData, setTemplateData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    async function GetTemplates() {
        try {
            setLoading(true);
            const response = await axios.get(process.env.HELLO_TEST_URL + '/public/bot/template?with_widget=true');
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
                iframe.src = `/${
                    process.env.ENVIRONMENT === 'prod' ? 'chat-widget' : 'chat-widget-test'
                }.html?widgetToken=${template?.token}`;
            }
        }
        setSelectedTemplate(template);
    };

    return (
        <>
            <div className="container py-5 d-flex gap-5 ">
                <div className="d-flex flex-column gap-4">
                    <p className="text-uppercase  c-ls-20 mt-3 hello-dark">AI CHATBOT DEMO</p>
                    <h1 className="heading w-md-75 w-100 mx-auto mb-2 c-fw-xb">
                        Experience AI Chatbots in Action, Start Chatting Now!
                    </h1>
                    <h2 className="c-fs-2 w-md-75 w-100 mx-auto fw-normal">
                        Integrate AI-powered chatbot with WhatsApp, Chatbot, Facebook Messenger and more channels
                    </h2>

                    <div className="d-grid grid-cols-2 chatbot_card-cont">
                        {templateData.map((template, index) => (
                            <div
                                onClick={() => {
                                    handleTemplateSelet(template);
                                }}
                                key={index}
                                className={`d-flex flex-column gap-1 chatbot_card p-4 ${
                                    template?.bot_id == selectedTemplate?.bot_id ? 'active' : ''
                                }`}
                            >
                                <h3 className="c-fs-3 c-fw-sb">{template?.bot_name}</h3>
                                <p>{template?.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatbotwrapper ">
                    <iframe
                        src={`/${
                            process.env.ENVIRONMENT === 'prod' ? 'chat-widget' : 'chat-widget-test'
                        }.html?widgetToken=${selectedTemplate?.token}`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    ></iframe>
                </div>
            </div>
            <div className="d-grid grid-cols-2 chatbot_card-cont"></div>
            <GetStartedSection />
        </>
    );
}
