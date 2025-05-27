import specialPages from '@/data/specialPages.json';
import countryData from '@/data/availableCountries.json';
import Head from 'next/head';

export default function HreflangTagComp({ pageInfo }) {
    const isPricingPage = specialPages?.pricing?.includes(pageInfo?.page);

    return (
        <Head>
            <link rel='canonical' href={`${process.env.BASE_URL}${pageInfo?.pathURL ? '/' + pageInfo.pathURL : ''}`} />

            <link
                rel='alternate'
                hreflang='x-default'
                href={`${process.env.BASE_URL}${pageInfo?.baseURL ? '/' + pageInfo.baseURL : ''}`}
            />

            <link
                rel='alternate'
                hreflang='en'
                href={`${process.env.BASE_URL}${pageInfo?.baseURL ? '/' + pageInfo.baseURL : ''}`}
            />

            {countryData.map((country, index) => {
                const isGlobalPage = specialPages?.global.includes(pageInfo?.page);
                const isJustNested = specialPages?.justNested.includes(pageInfo?.baseURL);
                const isCaseStudyPage = pageInfo?.page === 'case-studies';

                if ((isPricingPage || !isGlobalPage) && !isJustNested && !isCaseStudyPage) {
                    let hrefPrefix = country.shortname.toLowerCase();
                    if (country.shortname.toLowerCase() === 'br-pt') {
                        hrefPrefix = 'br-pt';
                    } else if (country.shortname.toLowerCase() === 'br') {
                        hrefPrefix = 'br';
                    }
                    return (
                        <link
                            key={index}
                            rel='alternate'
                            hreflang={country.hreflang}
                            href={`${process.env.BASE_URL}/${hrefPrefix}${
                                pageInfo?.baseURL ? '/' + pageInfo.baseURL : ''
                            }`}
                        />
                    );
                }
                return null;
            })}
        </Head>
    );
}
