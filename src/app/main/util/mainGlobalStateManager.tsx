export enum PageName {
    HOME = 'home',
    NODE_DESIGNER = 'nodeDesigner'
}

class MainStateCallbackManager {
    private currentPageName: PageName = PageName.HOME;
    private setCurrentPageNameFunc: any = null;

    private currentnodeDesginerId : string = '';
    private setCurrentNodeDesignerIDFunc: any = null;

    registerSetCurrentPageName(callbackFunc : (v : PageName) => void) {
        this.setCurrentPageNameFunc = callbackFunc;
        console.log('call registerSetCurrentPageName');
    }
    setCurrentPageName(pageName : PageName) {
        if(!this.setCurrentPageNameFunc) return;
        this.currentPageName = pageName;
        this.setCurrentPageNameFunc(pageName);
        console.log(`call setCurrentPageName : ${pageName}`);
    }
    registerSetCurrentNodeDesignerID(callbackFunc : (v : string) => void) {
        this.setCurrentNodeDesignerIDFunc = callbackFunc;
    }
    setCurrentNodeDesignerID(nodeDesginerId : string) {
        if(!this.setCurrentNodeDesignerIDFunc) return;
        this.currentnodeDesginerId = nodeDesginerId;
        this.setCurrentNodeDesignerIDFunc(nodeDesginerId);
        console.log(`call setCurrentNodeDesignerID : ${nodeDesginerId}`);
    }

    // setCurrentNodeDesignerID(id : string) {
    //     this.currentnodeDesginerId = id;
    // }
    getCurrentNodeDesignerID() {
        return this.currentnodeDesginerId;
    }
}

export const mainStateCallBackManager = new MainStateCallbackManager();