export type Size = {
    width : number;
    height : number;
}

export type Rect = {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}

export type ShowingPanelSize = {
    reactFlowRect : any;
    showingMenuSize : Size; //하단시크 현재 높이 크기
    showingPropertySize : Size; //현제 보여지는 메뉴 높이
    showingBottomSheetSize : Size; //현재 보여지는 메뉴 너비
}

class OutsidePadding {
    top: number = 0;
    left: number = 0;
    right: number = 0;
    bottom: number = 0;
    
    set(padding : any) {
        this.top = padding['top'] ?? 0;
        this.left = padding['left'] ?? 0;
        this.right = padding['right'] ?? 0;
        this.bottom = padding['bottom'] ?? 0;
    }
}

export const outSidePadding = new OutsidePadding();

export type LayoutSize = {
    topToolbar : Size;
    verticalTabMenu : Size;
    sidebarInnerMenu : Size;
    sidebarProperty : Size;
    accordionContainer : Size;
    minBottomSheet : Size;
}

//Node-editor Layout 크기 정의
export const layoutSize : LayoutSize = {
    topToolbar : {width: 0, height: 30},
    verticalTabMenu : {width: 30, height: 0},
    sidebarInnerMenu : {width: 200, height: 0},
    sidebarProperty : {width: 200, height: 0},
    accordionContainer : {width: 285, height: 0},
    minBottomSheet : {width: 0, height: 300}
}
