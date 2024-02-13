export enum PageName {
    HOME = 'home',
    NODE_DESIGNER = 'nodeDesigner'
}

//다른 모듈에서 main 페이지 컨퍼넌트 렌더링 변경을 위한 매니저
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

//여러개의 노드디자이너(Reactflow)를 동시에 여러개 열어서 렌더링 및 사용할 수 있도록 지원하는 매니저
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