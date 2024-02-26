import {
    mainLayoutSize,
    workspaceLayoutSize,
    projectLayoutSize
} from "@/app/main/config/layoutFrame";

class Project {
    getSearchHeight() { return `${projectLayoutSize['projectSearch'].height}px`; }
    getTitleHeight() { return `${projectLayoutSize['projectTitle'].height}px`; }
    getListHeight() {
        const bottomPadding = 13; //이유를 알 수 없게, 내용이 많아지면 하단이 잘려서 추가 공간을 임의로 더한다.
        const extrMargin = mainLayoutSize['topGNB'].height +
                        projectLayoutSize['projectSearch'].height +
                        projectLayoutSize['projectTitle'].height + 
                        projectLayoutSize['projectPagingList'].height;
        return `calc(100vh - ${extrMargin + bottomPadding}px)`;
    }
    getPagingListHeight() { return `${projectLayoutSize['projectPagingList'].height}px`; }
}

class Workspace {
    getOuterMargin() { return `${workspaceLayoutSize['outerMargin'].width}px`; }
    getContainerWidth() { return `calc(100% - ${workspaceLayoutSize['outerMargin'].width} * 2)`; }
    getContainerHeight() { return this.getContainerWidth(); }
    getProjectContainerHeight() { return `${workspaceLayoutSize['projectTitle'].height}px`; }
    getProjectInfoHeight() { return `${workspaceLayoutSize['projectInformation'].height}px`; }
    getTaskListHeadHeight() { return `${workspaceLayoutSize['taskListHead'].height}px`; }
    getTaskListBodyPadding() { return `${workspaceLayoutSize['taskListBodyPadding'].height}px`; }
    getTaskListBodyOuterHeight() {
        const extrMargin : number = mainLayoutSize['topGNB'].height +
                            (workspaceLayoutSize['outerMargin'].width * 2) +
                            workspaceLayoutSize['projectTitle'].height +
                            workspaceLayoutSize['projectInformation'].height +
                            workspaceLayoutSize['taskListHead'].height + 
                            workspaceLayoutSize['taskPagingList'].height;
        return `calc(100vh - ${extrMargin}px)`;
    }
    getTaskListBodyInnerHeight() {
        const bottomPadding = 10; //이유를 알 수 없게, 내용이 많아지면 하단이 잘려서 추가 공간을 임의로 더한다.
        const extrMargin : number = mainLayoutSize['topGNB'].height +
                            (workspaceLayoutSize['outerMargin'].width * 2) +
                            workspaceLayoutSize['projectTitle'].height +
                            workspaceLayoutSize['projectInformation'].height +
                            workspaceLayoutSize['taskListHead'].height +
                            (workspaceLayoutSize['taskListBodyPadding'].width * 2) + 
                            workspaceLayoutSize['taskPagingList'].height;;
        return `calc(100vh - ${extrMargin+bottomPadding}px)`;
    }
    getPagingListHeight() { return `${workspaceLayoutSize['taskPagingList'].height}px`; }
}

class CalcStyleRegion {
    workspace : Workspace = new Workspace();
    project :  Project = new Project();

    getTopMargin() {return `${mainLayoutSize['topGNB'].height}px`; }
    getTopHeight() {return `${mainLayoutSize['topGNB'].height}px`; }
    
    getTopLeftWidth() {return `${mainLayoutSize['topGNB_Left'].width}px`; }

    getTopLeftLeft() {return this.getTopLeftWidth(); }
    getTopCenterWidth() {
        const padding = mainLayoutSize['topGNB_Left'].width +
                        mainLayoutSize['topGNB_Right'].width;
        return `calc(100vw - ${padding}px)`;
    }

    getTopRightLeft() {
        return `calc(100vw - ${mainLayoutSize['topGNB_Right'].width}px)` }
    getTopRightWidth() {return `${mainLayoutSize['topGNB_Right'].width}px`; }

    getHomeHeight() { return `calc(100vh - ${mainLayoutSize['topGNB'].height}px)`; }

    getProjectTop() { return this.getTopMargin(); }
    getProjectLeft() { return `0px` }
    getProjectWidth() {return `${mainLayoutSize['project'].width}px`; }
    getProjectHeight() {return this.getHomeHeight(); }

    getWorkspaceTop() { return this.getTopMargin(); }
    getWorkspaceLeft() { return `${mainLayoutSize['project'].width}px` }
    getWorkspaceHeight() { return this.getHomeHeight(); }
    getWorkspaceWidth() { return `calc(100vw - ${mainLayoutSize['project'].width}px)`; }

    
}

export const calcStyle : CalcStyleRegion = new CalcStyleRegion();
