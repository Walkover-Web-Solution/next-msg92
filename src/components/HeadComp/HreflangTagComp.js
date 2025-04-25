import specialPages from '@/data/specialPages.json';
import Head from 'next/head';
export default function HreflangTagComp({ pageInfo }) {
    return (
        <Head>
            <link rel='canonical' href={`https://msg91.com${pageInfo?.pathURL ? '/' + pageInfo.pathURL : ''}`} />
            <link
                rel='alternate'
                hrefLang='x-default'
                href={`https://msg91.com${pageInfo?.baseURL ? '/' + pageInfo.baseURL : ''}`}
            />
            <link
                rel='alternate'
                hrefLang='en'
                href={`https://msg91.com${pageInfo?.baseURL ? '/' + pageInfo.baseURL : ''}`}
            />
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
                            hrefLang={`${country === 'br-pt' ? 'pt-BR' : 'en-' + country.toUpperCase()}`}
                            href={`https://msg91.com/${country}${pageInfo?.baseURL ? '/' + pageInfo.baseURL : ''}`}
                        />
                    );
                }
            })}
        </Head>
    );
}
