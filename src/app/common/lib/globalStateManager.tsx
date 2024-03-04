export enum PageName {
    HOME = 'home',
    NODE_DESIGNER = 'nodeDesigner'
}

//다른 모듈에서 main 페이지 컨퍼넌트 렌더링 변경을 위한 매니저
class MainStateCallbackManager {
    private callbackFuncSetCurrentPageName: any = null;

    registerSetCurrentPageName(callbackFunc : (v : PageName) => void) {
        this.callbackFuncSetCurrentPageName = callbackFunc;
    }

    setCurrentPageName(pageName : PageName) {
        if(!this.callbackFuncSetCurrentPageName) return;
        this.callbackFuncSetCurrentPageName(pageName);
    }
}

export const mainStateCallbackManager = new MainStateCallbackManager();

//여러개의 노드디자이너(Reactflow)를 동시에 여러개 열어서 렌더링 및 사용할 수 있도록 지원하는 매니저
export class MultiNodeDesignerCallbackManager {
    private callbackShowHideFuncs: { [key: string]: (visible : boolean) => void } = {};
    private callbackAddNodeDesignerFuncs: any = null;
    private callbackDeleteNodeDesignerFuncs: any = null;

    registerShowHideCallback(id : string, f : any) {
      this.callbackShowHideFuncs[id] = f;
    }

    registerAddNodeDesignerCallback(f : any) {
      this.callbackAddNodeDesignerFuncs = f;
    }

    registerDeleteNodeDesignerCallback(f : any) {
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

    addNodeDesigner() {
      if(!this.callbackAddNodeDesignerFuncs) return '';
      const id = this.callbackAddNodeDesignerFuncs();
      return id;
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
    registerSetSelectedProjectIdCallback(f : (id : string) => void) {
      this.callbackSelectedProjectIdFunc = f;
    }
    setSelectedProjectId(id : string) {
      if(!this.callbackSelectedProjectIdFunc) return;
      this.callbackSelectedProjectIdFunc(id);
    }
  }

  export const globalDataStateManager = new GlobalDataStateManager();