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

    registerShowHideCallback(id : string, f : any) {
      this.callbackShowHideFuncs[id] = f;
    }

    registerAddNodeDesignerCallback(f : any) {
      this.callbackAddNodeDesignerFuncs = f;
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
  }

  export const multiNodeDesignerCallbackManager = new MultiNodeDesignerCallbackManager();