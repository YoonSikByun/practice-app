export enum PageName {
    HOME = 'home',
    NODE_DESIGNER = 'nodeDesigner'
}

class MainStateCallbackManager {
    private callbackFuncSetCurrentPageName: any = null;

    registerSetCurrentPageName(callbackFunc : (v : PageName) => void) {
        this.callbackFuncSetCurrentPageName = callbackFunc;
        console.log('call registerSetCurrentPageName'); }

    setCurrentPageName(pageName : PageName) {
        if(!this.callbackFuncSetCurrentPageName) return;
        this.callbackFuncSetCurrentPageName(pageName);
        console.log(`call setCurrentPageName : ${pageName}`); }
}

export const mainStateCallbackManager = new MainStateCallbackManager();

export class MultiNodeDesignerCallbackManager {
    private callbackShowHideFuncs: { [key: string]: (visible : boolean) => void } = {};
    private callbackAddNodeDesignerFuncs: any = null;
    
    registerShowHideCallback(id : string, f : any) {
      console.log(`registerShowHideCallback id : ${id}`);
      this.callbackShowHideFuncs[id] = f;
    }

    registerAddNodeDesignerCallback(f : any) {
      console.log('registerAddNodeDesignerCallback');
      this.callbackAddNodeDesignerFuncs = f;
    }
  
    showNodeDesigner(id : string) {
      console.log(`before - showNodeDesigner id : ${id} callbackFuncs.length : ${Object.keys(this.callbackShowHideFuncs).length}`);
      if(!this.callbackShowHideFuncs.hasOwnProperty(id)) return;
      console.log(`after - showNodeDesigner id : ${id}`);
      this.hideAll();
      this.callbackShowHideFuncs[id](true);
    }
  
    hideAll() {
      for(const id in this.callbackShowHideFuncs) {
        this.callbackShowHideFuncs[id](false);
      }
    }

    addNodeDesigner() {
      console.log(`before - addNodeDesigner`);
      if(!this.callbackAddNodeDesignerFuncs) return '';
      const id = this.callbackAddNodeDesignerFuncs();
      console.log(`after - addNodeDesigner id : ${id}`);
      return id;
    }
  }

  export const multiNodeDesignerCallbackManager = new MultiNodeDesignerCallbackManager();