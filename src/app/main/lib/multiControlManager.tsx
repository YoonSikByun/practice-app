export class MultiCheckboxManager {

    private callbackSetCheckFuncs: { [id: string] : (check : boolean) => void } = {};
    private checkStates: { [id: string] : boolean } = {};

    registerMultiCheckBox(id : string, setCheck : (check : boolean) => void) {
        this.callbackSetCheckFuncs[id] = setCheck;
    }
    setCheck(id : string, check : boolean) {
        if(!this.callbackSetCheckFuncs.hasOwnProperty(id)) return;
        this.callbackSetCheckFuncs[id](check);
    }

    setStates(workspaceList : []){
        this.checkStates = {}
        for(let workspace of workspaceList){
            this.checkStates[workspace['id']] = false;
        }
    }
    
    updateCheck(id : string, check : boolean) {
        this.checkStates[id] = check;

    }

    allUnCheck() {
        for(let id in this.checkStates){
            this.setCheck(id, false);
        }
    }

    deleteCheckBox(id : string) {
        if(id in this.checkStates){
            delete this.checkStates[id]
        }
    }

    getCheck(id : string) {
        
        if(!this.checkStates.hasOwnProperty(id)) return false;
        this.checkStates[id];
    }

    getAllChecked() {
        const temp = []
        for(const id in this.checkStates) {
            if(this.checkStates[id]) temp.push(id)
        }
        return temp;
    }
    
    allChek(check: boolean) {
        for(const id in this.checkStates) {
          this.checkStates[id] = check;
        }
    }

    stateClear(){
        this.callbackSetCheckFuncs = {}
        this.checkStates = {}
    }
}
