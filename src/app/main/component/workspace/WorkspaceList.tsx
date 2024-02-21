import '@/app/main/scss/WorkspaceList.scss';

import { InformationCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"

export default function WorkspaceList() {
    return (
        <div className='workspace-container bg-red-300'>
            {/* 프로젝트 제목 부분 */}
            <div className='project-title'>
                <div className="title">
                    <p className='text-2xl'>Title</p>
                </div>
                <div className="edit">
                    <button><Bars3Icon className='h-7 w-7' /></button>
                </div>
            </div>
            {/* 프로젝트 생성 정보 */}
            <div className='project-information'>
                <div className='project-information-inner'>
                    <div><InformationCircleIcon className='h-5 w-5 mr-1' /></div>
                    <div>Create on 2023/02/21 23:35 by hanaTI@mail.com</div>
                </div>
            </div>
            <div className='list'>
                Workspace list
            </div>
        </div>
    )
}