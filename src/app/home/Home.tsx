import { mainLayoutSize } from "../main/config/layoutFrame"
import Link from "next/link"

export default function Home() {
    return (
        <div className="absolute flex flex-col h-full w-full"
            style={{top: mainLayoutSize['topGNB'].height, height: 'calc(100vh - 30px)'}}
        >
            <div className="absolute h-full w-[300px] bg-orange-600"
                style={{top: 0}}
            >
                Project
            </div>
            <div className="absolute h-full w-[calc(100vw-300px)] bg-white"
                style={{top: 0, left: 300}}
            >
                Pipeline<br/>
                <Link href='/node-designer'>Node designer</Link>
            </div>
        </div>
    )
}