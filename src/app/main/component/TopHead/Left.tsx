import Link from 'next/link'

//Global Navigation Bar
export default function Left() {
    return (
        <>
            <Link href='/home'>
                <p className='font-bold'>Node Designer</p>
            </Link>
        </>
    );
}
