export enum PageName {
    HOME = 'home',
    NODE_DESIGNER = 'nodeDesigner'
}

//다른 모듈에서 main 페이지 컨퍼넌트 렌더링 변경을 위한 매니저
class MainStateCallbackManager {
    private callbackFuncSetCurrentPageName: any = null;
    private callbackSetCurrentTabHeadId : any = null;
    private callbackopenNodeDesigner : any = null;
    private callbakcsetCurrentTabIfExist : any = null;

    registerSetCurrentPageName(callbackFunc : (v : PageName) => void) {
        this.callbackFuncSetCurrentPageName = callbackFunc;
    }

    registerSetCurrentTabHeadId(f : (v:string) => void) {
      this.callbackSetCurrentTabHeadId = f;
    }

    registerMultiOpenNodeDesigner(f : (data : any) => void) {
      this.callbackopenNodeDesigner = f;
    }

    registerSetCurrentTabIfExist(f : (id : string) => boolean | undefined) {
      this.callbakcsetCurrentTabIfExist = f;
    }

    setCurrentPageName(pageName : PageName) {
        if(!this.callbackFuncSetCurrentPageName) return;
        this.callbackFuncSetCurrentPageName(pageName);
    }

    setCurrentTabHeadId(tabId : string) {
      if(!this.callbackSetCurrentTabHeadId) return;
      this.callbackSetCurrentTabHeadId(tabId);
    }

    openNodeDesigner(data? : any) {
      if(!this.callbackopenNodeDesigner) return;
      this.callbackopenNodeDesigner(data);
    }

    setCurrentTabIfExist(id : string) {
      if(this.callbakcsetCurrentTabIfExist)
        return this.callbakcsetCurrentTabIfExist(id);
      return false;
    }
}

export const mainStateCallbackManager = new MainStateCallbackManager();

//여러개의 노드디자이너(Reactflow)를 동시에 여러개 열어서 렌더링 및 사용할 수 있도록 지원하는 매니저
export class MultiNodeDesignerCallbackManager {
    private callbackShowHideFuncs: { [key: string]: (visible : boolean) => void } = {};
    private callbackOpenNodeDesignerFuncs: any = null;
    private callbackDeleteNodeDesignerFuncs: any = null;

    registerShowHide(id : string, f : any) {
      this.callbackShowHideFuncs[id] = f;
    }

    registerMultiOpenNodeDesigner(f : any) {
      this.callbackOpenNodeDesignerFuncs = f;
    }

    registerMultiDeleteNodeDesigner(f : any) {
      this.callbackDeleteNodeDesignerFuncs = f;
    }
    
    showNodeDesigner(id : string) {
      if(!this.callbackShowHideFuncs.hasOwnProperty(id)) return;
      this.hideAll();
      this.callbackShowHideFuncs[id](true);
    }
  
    hideAll() {
      for(const id in this.callbackShowHideFuncs) {
        this.callbackShowHideFuncs[id](false);
      }
    }

    openNodeDesigner(id : string, data : string) {
      if(!this.callbackOpenNodeDesignerFuncs) return '';
      this.callbackOpenNodeDesignerFuncs(id, data);
    }

    deleteNodeDesigner(id : string) {
      if(!this.callbackDeleteNodeDesignerFuncs) return '';
      this.callbackDeleteNodeDesignerFuncs(id);
      delete this.callbackDeleteNodeDesignerFuncs[id];
    }
  }

  export const multiNodeDesignerCallbackManager = new MultiNodeDesignerCallbackManager();

  //데이터 상태 변경
  export class GlobalDataStateManager {
    private callbackSelectedProjectIdFunc : ((id : string) => void) | null = null;
    private callbackSelectedProjectItemFunc : ((item : any) => void) | null = null;
    
    registerSetSelectedProjectId(f : (id : string) => void) {
      this.callbackSelectedProjectIdFunc = f;
    }
    registerSetSelectedProjectItem(f : (item : any) => void) {
      this.callbackSelectedProjectItemFunc = f;
    }
    setSelectedProjectId(id : string) {
      if(!this.callbackSelectedProjectIdFunc) return;
      this.callbackSelectedProjectIdFunc(id);
    }
    setSelectedProjectItem(item : any) {
      if(!this.callbackSelectedProjectItemFunc) return;
      this.callbackSelectedProjectItemFunc(item);
    }
  }

  export const globalDataStateManager = new GlobalDataStateManager();