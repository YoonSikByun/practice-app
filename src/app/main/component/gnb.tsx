import '@/app/main/scss/layout.scss'
import { mainLayoutSize } from '@/app/main/config/layoutFrame'
import Link from 'next/link'

export default function GNB() {
    return (
        <div className="gnb" style={{height:mainLayoutSize['topGNB'].height}}>
            <Link href='/home'>
                GNB
            </Link>
        </div>
    )
}
