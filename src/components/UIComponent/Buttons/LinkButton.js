import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const arrowIcon = (
    <svg viewBox='0 0 6 9' fill='none' xmlns='http://www.w3.org/2000/svg' className='arrow-icon'>
        <g className='arrow-head'>
            <path d='M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8' stroke='currentColor' strokeWidth='1.5' />
        </g>
        <g className='arrow-body'>
            <path d='M3.5 4.5H0' stroke='currentColor' strokeWidth='1.5' />
        </g>
    </svg>
);

export function LinkButton({ href, content, target, customClasses }) {
    return (
        <>
            <a href={href || '/'} target={target || '_self'} className={`link-btn ${customClasses || ''}`}>
                {content}
                {arrowIcon}
            </a>
        </>
    );
}

export function LinkText({ children, customClasses }) {
    return (
        <>
            <span className={`link-btn ${customClasses || ''}`}>
                {children}
                {arrowIcon}
            </span>
        </>
    );
}
export function BtnWithHideIco({ children, customClasses }) {
    return (
        <>
            <span className={`link-btn hide-ico ${customClasses || ''}`}>
                {children}
                {arrowIcon}
            </span>
        </>
    );
}
export function MoreButton({ content, customClasses, open }) {
    return (
        <>
            <span className={`link-btn text-link cursor-pointer  ${customClasses || ''}`}>
                {content}
                {open ? <MdKeyboardArrowUp fontSize={24} /> : <MdKeyboardArrowDown fontSize={24} />}
            </span>
        </>
    );
}
