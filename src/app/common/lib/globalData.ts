import { ProjectData } from "@/app/api/lib/service/common/definition";

class LoginInfo {
    private userId : string = 'admin';
    private loginDateTime : string = '';

    getUserId() { return this.userId; }
    getLoginDateTime() { return this.loginDateTime; }
}

class MenuInfo {
    private selectedProjectItem : ProjectData | null = null;
    getSelectedProjectData() { return this.selectedProjectItem; }
    getSelectedProjectId() { return this.selectedProjectItem?.id ?? ''; }
    setSelectedProjectData(projectItem : ProjectData) { this.selectedProjectItem = projectItem; }
}

class GlobalData {
    loginInfo : LoginInfo = new LoginInfo();
    menuInfo : MenuInfo = new MenuInfo();
}

export const globalData = new GlobalData();
