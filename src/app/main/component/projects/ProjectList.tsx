import { useEffect, useState } from "react"
import clsx from "clsx"
import { ProjectData } from "@/app/api/lib/service/common/definition";
import { globalData } from "@/app/common/lib/globalData";
import { globalDataStateManager } from "@/app/common/lib/globalStateManager";

export default function ProjectList(
    {
        data,
        showProject
    } : {
        data : ProjectData[],
        showProject : boolean
    }) {
    const [checkedIndex, setcheckedIndex] = useState(0);

    return (
        <>
            {showProject && (data?.length ?? 0 > 0) && data.map((item , idx) => {
                
                return (
                    <Project
                        key={idx}
                        projectItem={item}
                        idx={idx}
                        checked={idx == checkedIndex ? true : false}
                        setCheckedIndex={setcheckedIndex}/>
                )})
            }
        </>
    )
}

function Project({
    projectItem,
    idx,
    checked,
    setCheckedIndex,
} : {
    projectItem : ProjectData
    idx:number
    checked : boolean
    setCheckedIndex : any
}) {
    const [projectData, setProjectData] = useState<ProjectData>(projectItem);
    const handleOnClick = () => {
        setCheckedIndex(idx);
    }

    useEffect(() => {
        if(checked)
        {
            globalDataStateManager.setSelectedProjectId(projectItem.id);
            globalDataStateManager.registerSetSelectedProjectItemCallback(setProjectData);
            globalData.menuInfo.setSelectedProjectData(projectItem);
        }
    }, [checked, projectItem]);

    return (
        <>
            <div
                className={clsx(
                    'h-[80px] pr-[23px]',
                    'mt-3 mb-2 mr-1 shadow-md',
                    'border-[1px] rounded border-borderclr-light',
                    {'ml-[10px] border-borderclr-light' : checked !== true},
                    {'border-l-[10px] border-[1px] border-borderclr-bold' : checked === true},
                    'hover:bg-mouseoverclr-light')}
                onClick={handleOnClick}
            >
                <div className="flex flex-col m-2">
                    <span className='font-bold'>
                        {projectData?.name ?? ''}
                    </span>
                    <div className={clsx("flex flex-row mt-2")}>
                        <span className='text-sm'>생성자 : {projectData?.creatorId ?? ''}</span>
                    </div>
                    <div className={clsx("flex flex-row mt-2")}>
                        <span className='text-sm'>작업공간 : {projectData?._count['workspaces'] ?? 0}</span>
                    </div>
                </div>
            </div>
        </>
    );
}