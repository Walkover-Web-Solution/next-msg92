import GetStartedSection from '@/components/getStartedSection/getStartedSection';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { MdCheck, MdDoneAll, MdSend } from 'react-icons/md';

export default function Chatbot() {
    const [selectedTemplate, setSelectedTemplate] = useState();
    const [templateData, setTemplateData] = useState([
        {
            'bot_type': 'lex',
            'bot_id': 900,
            'bot_name': 'BotTemplate',
            'description': "This bot template for test created bot bot team. Please don't delete",
            'token': '1d31e',
        },
        {
            'bot_type': 'lex',
            'bot_id': 1057,
            'bot_name': 'cloneTestingI',
            'description': '',
            'token': '1d31e',
        },
    ]);

    async function GetTemplates() {
        try {
            const response = await fetch(
            //backend API endpoint
            );
            if (response.ok) {
                const data = await response.json();
                // setTemplateData(data?.data?.templates);
            } else {
                console.error('Failed to fetch templates');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        // GetTemplates();
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
                iframe.src = `/chat-widget.html?widgetToken=${template.token}`;
            }
        }
        setSelectedTemplate(template);
    };
    if (templateData.length > 0) {
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
                                    <p>
                                        This bot will help you order pizza, track your delivery and provide support
                                        related to that.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chatbotwrapper">
                        <iframe
                            src={`/chat-widget.html?widgetToken=${selectedTemplate?.token}`}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                        ></iframe>
                    </div>
                </div>
                <GetStartedSection />
            </>
        );
    }
}
