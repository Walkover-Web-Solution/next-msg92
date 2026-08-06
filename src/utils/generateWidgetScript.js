/**
 * Generates widget script code for different messaging platforms
 * @param {string} widgetType - Type of widget ('apple' or 'whatsapp')
 * @param {object} options - Widget configuration options
 * @param {string} baseUrl - Base URL for assets (optional, defaults to relative paths)
 * @returns {string} - Generated script HTML
 */
export const generateWidgetScript = (widgetType, options, baseUrl = '') => {
    const widgetConfigs = {
        apple: {
            scriptSrc: `${baseUrl}/js/appleMessagesWidget.js`,
            onloadFunction: 'CreateAppleMessagesWidget',
            defaultOptions: {
                businessId: '',
                intentId: '',
                groupId: '',
                preFilledMessage: '',
                chatButtonSetting: {
                    backgroundColor: '#50EE6A',
                    ctaText: 'Message Us',
                    marginLeft: '0',
                    marginRight: '20',
                    marginBottom: '20',
                    position: 'right',
                },
                enabled: true,
            },
        },
        whatsapp: {
            scriptSrc: `${baseUrl || 'https://msg91.com'}/js/waWidget.js`,
            onloadFunction: 'CreateWhatsappChatWidget',
            defaultOptions: {
                brandSetting: {
                    brandImg: `${baseUrl || 'https://msg91.com'}/img/icon/walink-whatsapp.svg`,
                    welcomeText: 'Hi there!\nHow can I help you?',
                    messageText: '',
                    phoneNumber: '',
                },
                chatButtonSetting: {
                    backgroundColor: '#24d366',
                    ctaText: 'Chat with us',
                    marginLeft: '0',
                    marginRight: '20',
                    marginBottom: '20',
                    position: 'right',
                },
                enabled: true,
                isNewChatWidget: true,
            },
        },
    };

    const config = widgetConfigs[widgetType];
    if (!config) {
        throw new Error(`Unknown widget type: ${widgetType}`);
    }

    // Merge provided options with defaults
    const mergedOptions =
        typeof options === 'object' ? deepMerge(config.defaultOptions, options) : config.defaultOptions;

    // Generate the options object as a string
    const optionsString = formatOptions(mergedOptions);

    // Generate the complete script HTML
    return `<script>
var options = ${optionsString}
<\/script>
<script type="text/javascript" onload="${config.onloadFunction}(options)" src="${config.scriptSrc}"><\/script>`;
};

/**
 * Deep merge two objects
 */
const deepMerge = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, { [key]: source[key] });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
};

const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Format options object as a JavaScript string
 */
const formatOptions = (obj) => {
    if (typeof obj === 'string') {
        return `\`${obj}\``;
    }
    if (typeof obj === 'number' || typeof obj === 'boolean') {
        return String(obj);
    }
    if (Array.isArray(obj)) {
        return `[${obj.map(formatOptions).join(', ')}]`;
    }
    if (isObject(obj)) {
        const entries = Object.entries(obj).map(([key, value]) => {
            return `  ${key}: ${formatOptions(value)}`;
        });
        return `{\n${entries.join(',\n')}\n}`;
    }
    return JSON.stringify(obj);
};
