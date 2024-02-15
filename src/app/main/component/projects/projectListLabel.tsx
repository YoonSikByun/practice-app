import { useState } from "react"
import Image from 'next/image';
import addProjectBtn from '@/app/main/scss/img/home/addProject.png'
import ProjectContainer from "./projectContainer";

export default function ProjectListLabel () {
    const [pjtCount , setPjtCount] = useState(0)
    const [showProject, setShowProject] = useState<boolean>(false);

    const handleToggle = (showProject : boolean) => {
        setShowProject(showProject)
    }

    return (
        <div className="home-sidebar-project-list-item-label">
            프로젝트
            <span style={{paddingLeft : 10}}>{pjtCount}</span>
            <span className={`arrow ${showProject ? 'down' : 'up'}`} onClick={() => handleToggle(!showProject)}/>
            <button className="home-sidebar-project-brtc-project-new" title="새로운 프로젝트 생성">+</button>
            <button className="home-sidebar-project-brtp-add-new">
                <Image src={addProjectBtn} alt="no Image"/>
            </button>
            <ProjectContainer showProject={showProject} setPjtCount ={setPjtCount}></ProjectContainer>
        </div>
    )
}