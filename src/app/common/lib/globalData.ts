import { ProjectData } from "@/app/common/lib/definition";

class LoginInfo {
    private userId : string = 'admin';
    private loginDateTime : string = '';

    getUserId() { return this.userId; }
    getLoginDateTime() { return this.loginDateTime; }
}

class MenuInfo {
    private selectedProjectItem : ProjectData | null = null;
    getSelectedProject() { return this.selectedProjectItem; }
    getSelectedProjectId() { return this.selectedProjectItem?.id ?? ''; }
    setSelectedProject(projectItem : ProjectData) { this.selectedProjectItem = projectItem; }
}

class GlobalData {
    loginInfo : LoginInfo = new LoginInfo();
    menuInfo : MenuInfo = new MenuInfo();
}

export const globalData = new GlobalData();
