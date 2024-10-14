import pages from '@/data/termsPage.json';
import Link from 'next/link';
export default function TermsComp({ data }) {
    return (
        <>
            <div className='container flex md:flex-row flex-col cont_gap cont_p'>
                <ul className='flex md:flex-col flex-row w-fit gap-4 flex-wrap min-w-52'>
                    {pages.map((page, i) => {
                        return (
                            <li className='w-fit' key={i}>
                                <Link className='text-link active-link w-fit' href={page?.link}>
                                    {page?.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
            </div>
        </>
    );
}
