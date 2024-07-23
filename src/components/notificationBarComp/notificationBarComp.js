import styles from "@/components/NotificationBarComp/NotificationBarComp.module.scss";
export default function NotificationBarComp({data}) {
    return (
        <div className="flex justify-center">
            <div className="container">
                <div className={`${styles.bg} ${styles.fs}`}>{data.title}</div>
            </div>
        </div>
    );
}
