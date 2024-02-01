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

export type LayoutSize = {
    topHead : Size;
    verticalTabMenu : Size;
    sidebarInnerMenu : Size;
    sidebarProperty : Size;
    accordionContainer : Size;
    minBottomSheet : Size;
}

//Node-editor Layout 크기 정의
export const layoutSize : LayoutSize = {
    topHead : {width: 0, height: 50},
    verticalTabMenu : {width: 30, height: 0},
    sidebarInnerMenu : {width: 200, height: 0},
    sidebarProperty : {width: 200, height: 0},
    accordionContainer : {width: 285, height: 0},
    minBottomSheet : {width: 0, height: 300}
}

export type PanelVisible = {
    bottomSheet: boolean;
    sideProperty: boolean;
}