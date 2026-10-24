import { useRouter } from 'next/router';
import FooterComp from '@/components/FooterComp/FooterComp';
import MenuBarComp from '@/components/menuBarComp/menuBarComp';
import NotificationBarComp from '@/components/notificationBarComp/notificationBarComp';
import ExperimentExposure from '@/components/PageRenderer/ExperimentExposure';
import { resolveSection } from '@/components/PageRenderer/sectionRegistry';

// Renders a JSON-driven page: notification bar, menu, each top-level key of `data` in order, footer.
// `experiment` is set only when an experiment route rendered an assigned variant of this page.
export default function PageRenderer({ data, commonData, pageInfo, experiment }) {
    const router = useRouter();
    const browserPathCase = router.asPath;
    // Check if 'country' cookie is set; if not, set it to pageInfo.country
    if (typeof window !== 'undefined' && pageInfo?.country) {
        const cookieName = 'country';
        const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
        const countryCookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));
        if (!countryCookie) {
            document.cookie = `${cookieName}=${pageInfo.country}; path=/; max-age=3600`; // 1 hour
        }
    }
    return (
        <>
            <NotificationBarComp
                componentData={commonData?.notification}
                country={pageInfo?.country}
                pageInfo={pageInfo}
            />

            <MenuBarComp componentData={commonData?.menu} pageInfo={pageInfo} />
            {data &&
                Object.keys(data).map((key) => {
                    const Component = resolveSection(key, pageInfo);
                    if (!Component) {
                        console.error(`Component "${key}" is undefined. Check your imports and component exports.`);
                        return;
                    }
                    return (
                        <Component
                            key={`section-${key}`}
                            data={data[key]}
                            pageInfo={pageInfo}
                            browserPathCase={browserPathCase}
                        />
                    );
                })}

            <FooterComp componentData={commonData?.footer} pageInfo={pageInfo} />
            {experiment && <ExperimentExposure experiment={experiment} />}
        </>
    );
}
