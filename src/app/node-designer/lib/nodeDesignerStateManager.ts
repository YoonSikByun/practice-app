class NodeStateCallbackManager {
    private prevSelectedNodeId: string = '';
    private nodesCallbackFuncs: { [key: string]: (show : boolean) => void } = {};
    private setBottomsheetNodeIdFunc: any = null;
    private reStructureEdgesFunc: any = null;
    private saveReactflowCallbackFunc: any = null;
    private restoreReactflowCallbackFunc: any = null;

    registerReStructureEdges(reStructureEdges : any) {
        this.reStructureEdgesFunc = reStructureEdges;
    }
    registerSetBottomSheet(setBottomsheetNodeId : (v : string ) => void) {
        this.setBottomsheetNodeIdFunc = setBottomsheetNodeId;
    }
    registerSetShowOptButtons(key : string, setShowOptButtons : any) {
        this.nodesCallbackFuncs[key] = setShowOptButtons;
    }

    registerSaveReactflow(f : any) {
        this.saveReactflowCallbackFunc = f;
    }

    registerRestoreReactflow(f : any) {
        this.restoreReactflowCallbackFunc = f;
    }

    deleteSetShowOptButtons(key : string) {
        if(this.nodesCallbackFuncs.hasOwnProperty(key))
        {
            delete this.nodesCallbackFuncs[key];
        }
    }

    getPrevNodeId() { return this.prevSelectedNodeId; }
    setPrevNodeId(nodeId : string) { this.prevSelectedNodeId = nodeId; }

    setBottomsheetNodeId(nodeId : string) {
        if(!this.setBottomsheetNodeIdFunc) return;
        this.setBottomsheetNodeIdFunc(nodeId);
    }

    setShowOptButtons(key : string, value : any) {
        if(!this.nodesCallbackFuncs.hasOwnProperty(key))
            return;
        this.prevSelectedNodeId = key;
        this.nodesCallbackFuncs[key](value);
    }

    reStructureEdges(nodes : any) {
        if(this.reStructureEdgesFunc) this.reStructureEdgesFunc(nodes);
    }

    saveReactflow() {
        if(!this.saveReactflowCallbackFunc) null;
        return this.saveReactflowCallbackFunc();
    }

    restoreReactflow(data : string) {
        if(this.restoreReactflowCallbackFunc) this.restoreReactflowCallbackFunc(data);
    }

}

class MultiNodeStateCallback {
    private callbackManager: { [key: string]: NodeStateCallbackManager} = {};
    add(id : string) {
        if(this.callbackManager.hasOwnProperty(id)) return;
        this.callbackManager[id] = new NodeStateCallbackManager;
    }
    call(id : string) {
        if(!this.callbackManager.hasOwnProperty(id)) this.add(id);
        return this.callbackManager[id];
    }
}

export const multiNodeStateCallback = new MultiNodeStateCallback;