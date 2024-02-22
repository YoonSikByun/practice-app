import ProjectSearchMenu from "@/app/main/component/projects/projectSearchMenu"
import "@/app/main/scss/sidebar.scss"
import "@/app/main/scss/layout.scss"
import ProjectListLabel from "@/app/main/component/projects/projectListLabel"
import { calcStyle } from "@/app/main/util/calcStyleRegion"
import WorkspaceContainer from "@/app/main/component/workspace/WorkspaceContainer"

export default function Home() {
    return (
        <div className="flex flex-col h-full w-full"
            style={{
                position: 'absolute',
                top: calcStyle.getTopMargin(),
                height: calcStyle.getHomeHeight()}}
        >
            <div className="home-sidebar-project-list-area"
                style={{
                    position: 'absolute',
                    left: calcStyle.getProjectLeft(),
                    height: calcStyle.getProjectHeight(),
                    width: calcStyle.getProjectWidth()
                }}
            >
                <ProjectSearchMenu/>
                <ProjectListLabel/>
            </div>
            <div className="bg-white"
                style={{
                    position: 'absolute',
                    left: calcStyle.getWorkspaceLeft(),
                    height: calcStyle.getWorkspaceHeight(),
                    width: calcStyle.getWorkspaceWidth()
                }}
            >
                <WorkspaceContainer/>
            </div>
        </div>
    )
}