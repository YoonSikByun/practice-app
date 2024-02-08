import {layoutSize} from '@/app/node-editor/config/layoutFrame'

class CalcStyleRegion {
    topMargin() { return `${layoutSize['topHead'].height}px`; }
    leftMargin() { return `${layoutSize['verticalTabMenu'].width}px`; }

    topHeadHeight() { return `${layoutSize['topHead'].height}px`; }

    verticalMenuHeight() { return `calc(100vh - ${layoutSize['topHead'].height}px)`; }
    verticalMenuWidth() { return `${layoutSize['verticalTabMenu'].width}px`; }
    
    reactFlowCurLeftMargin(tabVisible : boolean[]) {
        return `${layoutSize['verticalTabMenu'].width + this.getShowingMenuWidth(tabVisible)}px`;
    }
    reactFlowCurWidth(tabVisible : boolean[], sideProperty : boolean) {
        const s : number = layoutSize['verticalTabMenu'].width +
                            this.getShowingMenuWidth(tabVisible) +
                            (sideProperty ? layoutSize['sidebarProperty'].width : 0);

        return `calc(100vw - ${s}px)`;
    }
    reactFlowCurHeight(curBottomSheetHeight : number) {
        return `calc(100vh - ${layoutSize['topHead'].height + curBottomSheetHeight}px)`;
    }

    reactFlowHeight() { return this.verticalMenuHeight(); }
    reactFlowWidth() { return `calc(100vw - ${layoutSize['verticalTabMenu'].width}px)`; }
    
    sidePropertyLeftMargin() { return `calc(100vw - ${layoutSize['sidebarProperty'].width}px)`; }
    sidePropertyHeight() { return `calc(100vh - ${layoutSize['topHead'].height}px)`; }
    sidePropertyWidth() { return `${layoutSize['sidebarProperty'].width}px`; }

    accordionHeight() { return `calc(100vh - ${layoutSize['topHead'].height}px)`; }
    accordionWidth() { return `${layoutSize['accordionContainer'].width}px`; }

    getShowingMenuWidth(tabVisible : boolean[]) {
        if(tabVisible[0] || tabVisible[1])
            return layoutSize['accordionContainer'].width;
        return 0;
    }

    bottomSheetCurTopMargin(curHeight : number) { return `calc(100vh - ${curHeight}px)`;}
    bottomSheetCurLeftMargin(tabVisible : boolean[]) {
        return `${layoutSize['verticalTabMenu'].width + this.getShowingMenuWidth(tabVisible)}px`;
    }
    bottomSheetCurWidth(tabVisible : boolean[], sideProperty : boolean) {
        const s : number = layoutSize['verticalTabMenu'].width +
                            this.getShowingMenuWidth(tabVisible) +
                            (sideProperty ? layoutSize['sidebarProperty'].width : 0);
        return `calc(100vw - ${s}px)`;
    }
    bottomSheetCurHeight(curHeight : number) { return `${curHeight}px`;}
}

export const calcStyle : CalcStyleRegion = new CalcStyleRegion();
