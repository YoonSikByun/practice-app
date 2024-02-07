class NodeStateCallbackManager {
    private prevSelectedNodeId: string = '';
    private nodesCallbackFuncs: { [key: string]: (show : boolean) => void } = {};
    private setBottomsheetNodeIdFunc: any = null;
    private reStructureEdgesFunc: any = null;

    registerReStructureEdgesCallback(reStructureEdges : any) {
        this.reStructureEdgesFunc = reStructureEdges;
    }
    registerSetBottomSheetCallback(setBottomsheetNodeId : (v : string ) => void) {
        this.setBottomsheetNodeIdFunc = setBottomsheetNodeId;
    }
    registerSetShowOptButtonsCallback(key : string, setShowOptButtons : any) {
        // console.log(`registerSetShowOptButtonsCallback key : ${key}`);
        this.nodesCallbackFuncs[key] = setShowOptButtons;
    }
    deleteSetShowOptButtonsCallback(key : string) {
        // console.log(`deleteSetShowOptButtonsCallback key : ${key}`);
        if(this.nodesCallbackFuncs.hasOwnProperty(key))
        {
            delete this.nodesCallbackFuncs[key];
            // console.log(`deleteSetShowOptButtonsCallback key : ${key}`);
        }
    }

    getPrevNodeId() { return this.prevSelectedNodeId; }
    setPrevNodeId(nodeId : string) { this.prevSelectedNodeId = nodeId; }

    setBottomsheetNodeId(nodeId : string) {
        if(!this.setBottomsheetNodeIdFunc) return;
        this.setBottomsheetNodeIdFunc(nodeId);
    }

    setShowOptButtons(key : string, value : any) {
        // console.log(`setShowOptButtons key : ${key}`);
        if(!this.nodesCallbackFuncs.hasOwnProperty(key))
            return;
        this.prevSelectedNodeId = key;
        this.nodesCallbackFuncs[key](value);
    }

    reStructureEdges(nodes : any) {
        if(this.reStructureEdgesFunc) this.reStructureEdgesFunc(nodes);
    }
}

export const nodeChangeCallBackManager = new NodeStateCallbackManager();