class LoginInfo {
    private userId : string = 'admin';
    private loginDateTime : string = '';

    getUserId() { return this.userId; }
    getLoginDateTime() { return this.loginDateTime; }
}

class GlobalData {
    loginInfo : LoginInfo = new LoginInfo();
}

export const globalData = new GlobalData();