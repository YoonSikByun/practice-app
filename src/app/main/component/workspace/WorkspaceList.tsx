import { InformationCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"
export default function WorkspaceList() {
    return (
        <div className='w-full h-full'>
            {/* 프로젝트 제목 부분 */}
            <div className='w-full h-[50px] flex flex-row items-center'>
                <div className="w-[90%]">
                    <p className='text-2xl ml-3'>Title</p>
                </div>
                <div className="w-[10%] h-full flex flex-row-reverse leading-[50px] items-center">
                    <button><Bars3Icon className='leading-[50px] h-7 w-7 mr-3' /></button>
                </div>
            </div>
            {/* 프로젝트 생성 정보 */}
            <div className='w-full h-[30px] flex flex-row leading-[30px] border-block border-b-2'>
                <div><InformationCircleIcon className='h-7 w-7 mr-1' /></div>
                <div>Create on 2023/02/21 23:35 by hanaTI@mail.com</div>
            </div>
            <div className='h-full w-full bg-red-100'>

            </div>
        </div>
    )
}