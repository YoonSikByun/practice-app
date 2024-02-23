export class MultiCheckboxManager {

    private callbackSetCheckFuncs: { [id: string] : (check : boolean) => void } = {};

    registerMultiCallback(id : string, setCheck : (check : boolean) => void) {
        this.callbackSetCheckFuncs[id] = setCheck;
    }
    setCheck(id : string, check : boolean) {
        if(!this.callbackSetCheckFuncs.hasOwnProperty(id)) return;
        this.callbackSetCheckFuncs[id](check);
    }

    allChek(check: boolean) {
        for(const id in this.callbackSetCheckFuncs) {
          this.callbackSetCheckFuncs[id](check);
        }
    }
}

// export const multiCheckboxManager = new MultiCheckboxManager();
