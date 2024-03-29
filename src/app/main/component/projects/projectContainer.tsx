import { useState, useEffect, useCallback } from "react"
import ProjectList from "@/app/main/component/projects/ProjectList";
import ProjectSearchMenu from "@/app/main/component/projects/projectSearchMenu"
import NewProjectPopup from "@/app/main/component/popup/NewProjectPopup";
import ImportProjectPopup from "@/app/main/component/popup/ImportProjectPopup";
import { InboxArrowDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/react/16/solid";
import { calcStyle } from "@/app/main/lib/calcStyleRegion";
import { ProjectData } from "@/app/api/lib/service/common/definition";
import clsx from "clsx";
import useSWR from 'swr'
import { RQ_URL } from "@/app/api/lib/service/client/request";
import { Get } from "@/app/common/lib/fetchServer";


function ProjectTitle (
    {
        projectCount,
        showProject,
        setShowProject
    } : {
        projectCount : number,
        showProject : boolean,
        setShowProject : (visible : boolean) => void
    }
) {
    const [newProjectPopupVisible, setNewProjectPopupVisible] = useState(false);
    const [importProjectPopupVisible, setImportProjectPopupVisible] = useState(false);

    const handleToggle = (showProject : boolean) => { setShowProject(showProject); }

    return (
        <div className={clsx(
                'pb-1 border-b-[2px] border-borderclr-bold',
                'flex flex-row items-center'
            )}
        >
            <div className="flex w-[80px]">
                <p>프로젝트</p>
            </div>
            <div className="flex w-[30px]">
                <p className="w-full text-center font-bold">{projectCount}</p>
            </div>
            <div className="flex w-full flex-row-reverse">
                <button
                    title="펴기/접기"
                    onClick={() => handleToggle(!showProject)}
                >
                    {showProject ?
                        <ArrowUpCircleIcon
                            className={clsx("h-6 w-6",
                            "fill-borderclr-bold",
                            "hover:fill-mouseoverclr-bold")}
                        /> :
                        <ArrowDownCircleIcon
                            className={clsx("h-6 w-6",
                            "fill-borderclr-bold",
                            "hover:fill-mouseoverclr-bold")}
                        />
                    }
                </button>
                <button className="mr-4 ml-1"
                    title="프로젝트 가져오기"
                    onClick={() => setImportProjectPopupVisible(!importProjectPopupVisible)}
                >
                    <InboxArrowDownIcon className="h-6 w-6 stroke-borderclr-bold hover:stroke-mouseoverclr"/>
                </button>
                <button
                    title="새로운 프로젝트 생성"
                    onClick={() => setNewProjectPopupVisible(!newProjectPopupVisible)}
                >
                    <PlusIcon className="h-6 w-6 stroke-borderclr-bold hover:stroke-mouseoverclr"/>
                </button>
            </div>

            <NewProjectPopup visible={newProjectPopupVisible} setVisible={setNewProjectPopupVisible} />
            <ImportProjectPopup visible={importProjectPopupVisible} setVisible={setImportProjectPopupVisible} />
        </div>
    )
}

export default function ProjectContainer() {
    const [projectCount, setProjectCount] = useState<number>(0);
    const [showProject, setShowProject] = useState<boolean>(true);
    const [projectList, setProjectList] = useState<ProjectData[]>([]);

    const fetcher = useCallback(async (url : string) => await Get(url), []);
    const { data, isLoading, error } = useSWR(RQ_URL.SELECT_PROJECT, fetcher);

    console.log(`[${RQ_URL.SELECT_PROJECT}] data : ${data}, isLoading : ${isLoading}, error : ${error}`);

    useEffect(() => {
        const count = (data) ? data['data']?.length ?? 0 : 0;
        const list = (data) ? data['data'] : [];
        setProjectList(list);
        setProjectCount(count);
    }, [data, isLoading, error]);

    return (
        <div className='flex flex-col'>
            <div
                style={{
                    height: calcStyle.project.getSearchHeight()
                }}
            >
                <ProjectSearchMenu/>
            </div>
            <div className="ml-[15px] mr-[15px]"
                style={{
                    height: calcStyle.project.getTitleHeight()
                }}
            >
                <ProjectTitle
                    projectCount={projectCount}
                    showProject={showProject}
                    setShowProject={setShowProject}/>
            </div>
            <div className={clsx("ml-[15px] mr-[15px]",
                    "border-t-[1px] border-borderclr-bold")}
            >
                <div className='overflow-auto'
                    style={{
                        height: calcStyle.project.getListHeight()
                    }}
                >
                    {(projectList && projectList.length > 0) && <ProjectList
                        data={projectList}
                        showProject={showProject}/>}
                </div>
            </div>
            <div className={clsx('ml-[15px] mr-[15px]',
                        'text-center items-center',
                        'border-t-[1px] border-borderclr-bold')}
                style={{
                    height: calcStyle.project.getPagingListHeight()}}
            >
                <span className={clsx('text-xl font-bold')}
                    style={{lineHeight: calcStyle.project.getPagingListHeight()}}
                >
                {'<  0  1  2  3  4  5  ... >'}
                </span>
            </div>
        </div>
    )
}
