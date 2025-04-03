import specialPages from '@/data/specialPages.json';
import Head from 'next/head';
export default function HreflangTagComp({ pageInfo }) {
    const specialCoutries = [
        { name: 'br-pt', language: 'pt-BR' },
        { name: 'fil-ph', language: 'fil-PH' },
    ];
    return (
        <Head>
            <link rel='canonical' href={`https://msg91.com/${pageInfo?.pathURL}`} />
            <link rel='alternate' hrefLang='en' href={`https://msg91.com/${pageInfo?.baseURL}`} />
            {specialPages?.countries.map((country, index) => {
                if (
                    !specialPages?.global.includes(pageInfo?.page) &&
                    !specialPages?.justNested?.includes(pageInfo?.baseURL) &&
                    !(pageInfo?.page === 'case-studies')
                ) {
                    return (
                        <link
                            key={index}
                            rel='alternate'
                            hrefLang={`${
                                specialCoutries.find((cont) => cont?.name === country)?.language ||
                                'en-' + country.toUpperCase()
                            }`}
                            href={`https://msg91.com/${country}/${pageInfo?.baseURL}`}
                        />
                    );
                }
            })}
        </Head>
    );
}
