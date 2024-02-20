import { ProjectItems } from "../../config/projectItems"
import { ProjectItem } from "../../config/projectItems"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import clsx from "clsx"

export default function ProjectContainer({ showProject, setPjtCount}: { showProject: boolean, setPjtCount : Dispatch<SetStateAction<number>> }) {
    const [checkedIndex, setcheckedIndex] = useState(0);
    useEffect(() => {
        setPjtCount(ProjectItems.length);
    }, [setPjtCount]);

    return (
        <div className = {clsx("home-sidebar-project-list-container" )}>
            {showProject && ProjectItems.map((item , idx) => {
                return (
                    <div key={item.id} >
                        <Project projectItem={item} idx={idx} checked={idx == checkedIndex ? true : false} setCheckedIndex={setcheckedIndex}></Project>
                    </div>
                )})
            }
        </div>
    )
}

function Project({
    projectItem,
    idx,
    checked,
    setCheckedIndex,
} : {
    projectItem : ProjectItem
    idx:number
    checked : boolean
    setCheckedIndex : any
}) {
    const handleOnClick = () => {
        setCheckedIndex(idx);
    }
    return (
        <>
            <div
                className={clsx(
                        "home-sidebar-project-list-item",
                        {"home-sidebar-project-active" : checked == true},
                    )}
                onClick={handleOnClick}
            >

                {projectItem.projectName}

                <div className= {clsx("home-sidebar-project-list-item-model")}>
                    <span>모델</span>
                    <span>{projectItem.modelCount}</span>
                    <span>리포트</span>    
                    <span>{projectItem.report}</span>    
                </div>
            </div>
        </>
    );
}