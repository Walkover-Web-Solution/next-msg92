import styles from '@/components/NotificationBarComp/NotificationBarComp.module.scss';
export default function NotificationBarComp({ data }) {
    const pageData = require(`@/data/${data?.country}/common.json`);
    const componentData = pageData?.notification;

    return (
        <div className='flex justify-center'>
            <div className='container'>
                <div className={`${styles.bg} ${styles.fs}`}>{componentData?.title}</div>
            </div>
        </div>
    );
}
