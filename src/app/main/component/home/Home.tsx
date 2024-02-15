import { mainLayoutSize } from "@/app/main/config/layoutFrame"
import clsx from "clsx"
import ProjectSearchMenu from "../projects/projectSearchMenu"
import "@/app/main/scss/sidebar.scss"
import "@/app/main/scss/layout.scss"
import ProjectListLabel from "../projects/projectListLabel"

export default function Home() {
    return (
        <div className="absolute flex flex-col h-full w-full"
            style={{top: mainLayoutSize['topGNB'].height, height: `calc(100vh - ${mainLayoutSize['topGNB'].height}px)`}}
        >
            <div className="home-sidebar-project-list-area">
                <ProjectSearchMenu/>
                <ProjectListLabel/>
            </div>
            <div className="absolute h-full w-[calc(100vw-300px)] bg-white"
                style={{top: 0, left: 300}}>
                Pipeline<br/>
            </div>
        </div>
    )
}