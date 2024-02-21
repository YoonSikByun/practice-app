import { useState } from "react"
import Image from 'next/image';
import addProjectBtn from '@/app/main/scss/img/home/addProject.png'
import ProjectContainer from "@/app/main/component/projects/projectContainer";
import NewProjectPopup from "@/app/main/component/popup/NewProjectPopup";
import ImportProjectPopup from "@/app/main/component/popup/ImportProjectPopup";
import { InboxArrowDownIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ProjectListLabel () {
    const [pjtCount , setPjtCount] = useState(0)
    const [showProject, setShowProject] = useState<boolean>(false);

    const [newProjectPopupVisible, setNewProjectPopupVisible] = useState(false);
    const [importProjectPopupVisible, setImportProjectPopupVisible] = useState(false);

    const handleToggle = (showProject : boolean) => {
        setShowProject(showProject)
    }

    return (
        <div className="home-sidebar-project-list-item-label">
            프로젝트
            <span style={{paddingLeft : 10}}>{pjtCount}</span>
            <span className={`arrow ${showProject ? 'down' : 'up'}`} onClick={() => handleToggle(!showProject)}/>
            <button className="home-sidebar-project-brtc-project-new"
                title="새로운 프로젝트 생성"
                onClick={() => setNewProjectPopupVisible(!newProjectPopupVisible)}
            >
                <PlusIcon className="h-5 w-5"/>
            </button>
            <button className="home-sidebar-project-brtp-add-new"
                title="프로젝트 가져오기"
                onClick={() => setImportProjectPopupVisible(!importProjectPopupVisible)}
            >
                <InboxArrowDownIcon className="h-5 w-5"/>
            </button>
            <ProjectContainer showProject={showProject} setPjtCount ={setPjtCount}></ProjectContainer>

            <NewProjectPopup visible={newProjectPopupVisible} setVisible={setNewProjectPopupVisible} />
            <ImportProjectPopup visible={importProjectPopupVisible} setVisible={setImportProjectPopupVisible} />
        </div>
    )
}
