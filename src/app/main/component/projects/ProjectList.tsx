import { useState } from "react"
import clsx from "clsx"
import { ProjectItem } from "@/app/main/config/projectItems"

export default function ProjectList(
    {
        data,
        showProject
    } : {
        data : ProjectItem[],
        showProject : boolean
    }) {
    const [checkedIndex, setcheckedIndex] = useState(0);

    return (
        <>
            {showProject && data.map((item , idx) => {
                return (
                    <Project
                        key={item.id}
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
                    'h-[80px] pr-[23px]',
                    'mt-3 mb-2 mr-1 shadow-md',
                    'border-[1px] rounded border-borderclr-light',
                    {'border-borderclr-light' : checked !== true},
                    {'border-t-[7px] border-[1px] border-borderclr-bold' : checked === true},
                    'hover:bg-mouseoverclr-light')}
                onClick={handleOnClick}
            >
                <div className="flex flex-col m-2">
                    <span className='font-bold'>
                        {projectItem.projectName}
                    </span>
                    <div className={clsx("flex flex-row mt-2")}>
                        <span className='text-sm'>작업공간 : {projectItem.workspace}</span>
                    </div>
                </div>
            </div>
        </>
    );
}