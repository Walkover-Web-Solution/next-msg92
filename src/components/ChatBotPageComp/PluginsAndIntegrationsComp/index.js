export default function PluginsAndIntegrationsComp() {
    return (
        <section className='bg-[var(--campaign-lite-color)]'>
            <div className='container flex cont_gap cont_p justify-between items-center '>
                <div className='flex flex-col gap-1 max-w-[640px]'>
                    <span className='text-lg uppercase text-[var(--campaign-dark-color)] font-bold'>
                        Plugins & Integrations
                    </span>
                    <h2 className='text-3xl font-bold'>Connect Instantly—Integrate With All Your Tools</h2>
                    <p className='text-lg text-gray-800'>
                        MSG91 AI chatbot connects with CRMs like Zoho, HubSpot, and Salesforce; e-commerce platforms
                        like Shopify and WooCommerce; and payment gateways like Razorpay and Stripe. It also syncs with
                        tools like Google Sheets, Slack, and Calendar. With APIs and webhooks, you can link any app and
                        automate workflows effortlessly.
                    </p>
                    <ul className='cont gap-1 list-disc text-lg font-medium'>
                        <li>CRM Integrations</li>
                        <li>E-commerce Platforms</li>
                        <li>Payment Gateways</li>
                        <li>Productivity Tools</li>
                        <li>Custom Workflows</li>
                    </ul>
                </div>
                <div className='w-full max-w-[520px] aspect-square bg-[var(--white-color)] rounded-lg border'></div>
            </div>
        </section>
    );
}
