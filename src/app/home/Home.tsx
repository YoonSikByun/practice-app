import { mainLayoutSize } from "@/app/main/config/layoutFrame"
import Link from "next/link"
import clsx from "clsx"

export default function Home() {
    return (
        <div className="absolute flex flex-col h-full w-full"
            style={{top: mainLayoutSize['topGNB'].height, height: `calc(100vh - ${mainLayoutSize['topGNB'].height}px)`}}
        >
            <div className={clsx("absolute h-full", `w-[${mainLayoutSize['project'].width}px]`, "bg-orange-600")}
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