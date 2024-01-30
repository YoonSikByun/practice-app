export type Size = {
    width : number;
    height : number;
}

export type LayoutSize = {
    topHead : Size;
    verticalTabMenu : Size;
    sidebarInnerMenu : Size;
    sidebarProperty : Size;
    minBottomSheet : Size;
}

//Node-editor Layout 크기 정의
export const layoutSize : LayoutSize = {
    topHead : {width: 0, height: 50},
    verticalTabMenu : {width: 30, height: 0},
    sidebarInnerMenu : {width: 200, height: 0},
    sidebarProperty : {width: 150, height: 0},
    minBottomSheet : {width: 0, height: 300}
}
