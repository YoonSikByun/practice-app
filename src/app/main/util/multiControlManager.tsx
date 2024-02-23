export class MultiCheckboxManager {

    private callbackSetCheckFuncs: { [id: string] : (check : boolean) => void } = {};
    private checkStates: { [id: string] : boolean } = {};

    registerMultiCallback(id : string, setCheck : (check : boolean) => void) {
        this.callbackSetCheckFuncs[id] = setCheck;
    }
    setCheck(id : string, check : boolean) {
        if(!this.callbackSetCheckFuncs.hasOwnProperty(id)) return;
        this.callbackSetCheckFuncs[id](check);
    }

    updateCheck(id : string, check : boolean) {
        if(!this.checkStates.hasOwnProperty(id)) return;
        this.checkStates[id] = check;
    }

    deleteCheckBox(id : string) {
        if(this.checkStates.hasOwnProperty(id))
            delete this.checkStates[id];

        if(this.callbackSetCheckFuncs.hasOwnProperty(id))
            delete this.callbackSetCheckFuncs[id];
    }

    getCheck(id : string) {
        if(!this.checkStates.hasOwnProperty(id)) return false;
        this.checkStates[id];
    }

    allChek(check: boolean) {
        for(const id in this.callbackSetCheckFuncs) {
          this.callbackSetCheckFuncs[id](check);
        }
    }
}
