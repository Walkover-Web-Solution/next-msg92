export default function Themes() {
    return (
        <div className='container mt-12 cont cont_gap'>
            <div className='flex gap-4 items-center'>
                <span>Button Accent - </span>
                <button className='btn btn-accent btn-sm'>Button Accent SM</button>
                <button className='btn btn-accent'>Button Accent</button>
                <button className='btn btn-accent btn-lg'>Button Accent MD</button>
                <button className='btn btn-accent btn-outline'>Button Outline</button>
                <button className='btn btn-accent btn-ghost'>Button Ghost</button>
            </div>
            <div className='flex gap-4 items-center'>
                <span>Button Primary - </span>
                <button className='btn btn-primary btn-sm'>Button Primary SM</button>
                <button className='btn btn-primary'>Button Primary</button>
                <button className='btn btn-primary btn-lg'>Button Primary MD</button>
                <button className='btn btn-primary btn-outline'>Button Primary Outline</button>
                <button className='btn btn-primary btn-ghost'>Button Primary Ghost</button>
            </div>
            <div className='flex gap-4 items-center'>
                <span>Button Primary - </span>
                <button className='btn btn-secondary btn-sm'>Button Primary SM</button>
                <button className='btn btn-secondary'>Button Primary</button>
                <button className='btn btn-secondary btn-lg'>Button Primary MD</button>
            </div>
        </div>
    );
}
