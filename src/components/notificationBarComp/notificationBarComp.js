import styles from "@/components/NotificationBarComp/NotificationBarComp.module.scss";
export default function NotificationBarComp({data}) {
    const pageData = require(`@/data/${data.country}/notification.json`);    
    return (
        <div className="flex justify-center">
            <div className="container">
                <div className={`${styles.bg} ${styles.fs}`}>{pageData.title}</div>
            </div>
        </div>
    );
}