import specialPages from '@/data/specialPages.json';
import Head from 'next/head';
export default function HreflangTagComp({ pageInfo }) {
    return (
        <Head>
            <link rel='canonical' href={`https://msg91.com/${pageInfo?.pathURL}`} />
            <link rel='alternate' hreflang='en' href={`https://msg91.com/${pageInfo?.baseURL}`} />
            {specialPages?.countries.map((country, index) => {
                if (!specialPages?.global.includes(pageInfo?.page))
                    return (
                        <link
                            key={index}
                            rel='alternate'
                            hrefLang={`${country === 'br-pt' ? 'pt-BR' : 'en-' + country.toUpperCase()}`}
                            href={`https://msg91.com/${country}/${pageInfo?.baseURL}`}
                        />
                    );
            })}

            {/* <link
            rel='alternate'
            hrefLang={`${
                pageInfo?.country === 'global' || pageInfo?.country === 'br-pt'
                ? 'en'
                : 'en-' + pageInfo?.country.toUpperCase()
                }`}
                href={`https://msg91.com/${pageInfo?.pathURL}`}
                /> */}
        </Head>
    );
}
