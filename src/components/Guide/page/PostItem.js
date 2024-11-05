import { MdCalendarMonth } from 'react-icons/md';

export default function PostItem({ post }) {
    function getBlogStyle(titleText) {
        let textLength = titleText?.length;
        let wordLength = titleText?.split(' ').length;

        if (wordLength > 8 || textLength > 48) {
            return ' blog-card--large';
        } else {
            return ' blog-card--small';
        }
    }
    return (
        <div className=''>
            <a
                href={'/guide/' + post?.slug}
                className={'blog-card' + (post.thumbnail ? ' bg-dark' : ' bg-light') + getBlogStyle(post?.title)}
                style={{
                    backgroundImage: post.thumbnail ? 'url("' + post?.thumbnail + '")' : 'none',
                    margin: 'clamp(0px, 0px, 10px)',
                    '@media (min-width: 1440px)': {
                        margin: 0,
                    },
                }}
            >
                <div className='card w-auto h-96 image-full '>
                    {post?.thumbnail && (
                        <figure style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                            <img
                                src={post?.thumbnail}
                                alt='Thumbnailpost'
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </figure>
                    )}
                    <div className='card-body '>
                        <h2 className='card-title'>{post?.title}</h2>
                        <p>
                            {post?.description?.split(' ').slice(0, 25).join(' ') +
                                (post?.description?.split(' ').length > 25 ? '...' : '')}
                        </p>
                        {post?.tags && (
                            <div className='card-actions justify-start'>
                                {post?.tags !== '' &&
                                    post?.tags?.map((category, idx) => (
                                        <span className='bg-gray-300 p-2 border rounded-full' key={idx}>
                                            {category}
                                        </span>
                                    ))}
                            </div>
                        )}
                        <div className='flex items-center'>
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
            </a>
        </div>
    );
}
