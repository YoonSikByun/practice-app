import { MenuRole } from "@/app/main/component/menuContext/lib";

type ContextMenuVisible = {
    x : number;
    y : number;
    visible : boolean;
    id : string;
}

class ContextMenuManager {
    private currentMenuRole : MenuRole = '';
    private contextMenuRef : React.RefObject<HTMLInputElement> | null = null;
    private contextMenuVisible : ContextMenuVisible = {x:0,y:0,visible:false,id:''};

    setRef(ref : React.RefObject<HTMLInputElement> ) {
        this.contextMenuRef = ref;
    }

    getCurrentMenuRole() { return this.currentMenuRole; }
    getContextMenuVisible() { return this.contextMenuVisible; }

    onClick(e : React.MouseEvent<HTMLElement> , MenuRole : MenuRole , id : string) {
        e.preventDefault();

        this.currentMenuRole = MenuRole;
        this.contextMenuVisible.id = id;

        if(this.contextMenuRef && this.contextMenuRef.current) {
            const contextMenuAttr = this.contextMenuRef.current.getBoundingClientRect();
            const isLeft = e.clientX < window?.innerWidth / 2;
            this.contextMenuVisible.y = e.clientY;

            if(isLeft) {
                this.contextMenuVisible.x = e.clientX
            } else {
                this.contextMenuVisible.x = e.clientX - contextMenuAttr.width;
            }
        }
    }
}