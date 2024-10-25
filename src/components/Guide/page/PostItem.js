import { MdCalendarMonth } from 'react-icons/md';

export default function PostItem({ post }) {
    function getBlogStyle(titleText) {
        let textLength = titleText?.length;
        let wordLength = titleText?.split(' ').length;
        if (wordLength > 8) {
            console.log(textLength, wordLength);
            return ' blog-card__large';
        } else {
            console.log(titleText);
            return ' blog-card__small';
        }
    }
    return (
        <a
            href={'/guide/' + post?.slug}
            className={`blog-card rounded-lg overflow-hidden blog-card__${getBlogStyle(post?.title)}`}
            style={{
                backgroundImage: post.thumbnail ? 'url("' + post?.thumbnail + '")' : 'none',
                backgroundSize: 'cover',
                backgroundPosition: '50%',
            }}
        >
            <div
                className={`${
                    post?.thumbnail ? ' blog-card__cont text-white ' : 'bg-white'
                }     w-auto h-96 image-full`}
            >
                <div className='card-body  flex flex-col justify-between h-full p-10'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='card-title'>{post?.title}</h2>
                        <p className='blog-card__description'>{post?.description}</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        {post?.tags && (
                            <div className='card-actions justify-start mt-auto'>
                                {post?.tags !== '' &&
                                    post?.tags?.map((category, idx) => (
                                        <span className='bg-gray-400 px-3  rounded-full' key={idx}>
                                            {category}
                                        </span>
                                    ))}
                            </div>
                        )}
                        <div className='flex items-center gap-1'>
                            <MdCalendarMonth />
                            <p className=''>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}
