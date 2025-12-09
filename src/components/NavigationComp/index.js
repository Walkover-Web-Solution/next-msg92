import MenuBarComp from './menuBarComp/menuBarComp';
import NotificationBarComp from './notificationBarComp/notificationBarComp';

export default function NavigationComp() {
    <>
        <div className='relative !h-[130px]'>
            <div className={`fixed right-0 left-0 z-[99] bg-base-100`}>
                <NotificationBarComp />
                <MenuBarComp />
            </div>
        </div>
    </>;
}
