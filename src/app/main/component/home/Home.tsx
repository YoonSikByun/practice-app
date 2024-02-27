import "@/app/main/scss/layout.scss"
import ProjectContainer from "@/app/main/component/projects/ProjectContainer"
import { calcStyle } from "@/app/main/lib/calcStyleRegion"
import WorkspaceContainer from "@/app/main/component/workspace/WorkspaceContainer"
import clsx from "clsx"

export default function Home() {
    return (
        <div className="flex flex-col h-full w-full"
            style={{
                position: 'absolute',
                top: calcStyle.getTopMargin(),
                height: calcStyle.getHomeHeight()}}
        >
            <div className={clsx(
                    'border-r-[1px] border-borderclr-bold'
                )}
                style={{
                    position: 'absolute',
                    left: calcStyle.getProjectLeft(),
                    height: calcStyle.getProjectHeight(),
                    width: calcStyle.getProjectWidth()
                }}
            >
                <ProjectContainer/>
            </div>
            <div className="bg-slate-100"
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