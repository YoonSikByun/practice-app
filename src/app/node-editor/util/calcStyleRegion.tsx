import {layoutSize, Size, Rect} from '@/app/node-editor/config/layoutFrame'

class CalcStyleRegion {
    topMargin() { return `${layoutSize['topHead'].height}px`; }
    leftMargin() { return `${layoutSize['verticalTabMenu'].width}px`; }

    topHeadHeight() { return `${layoutSize['topHead'].height}px`; }

    verticalMenuHeight() { return `calc(100vh - ${this.topMargin()})`; }
    verticalMenuWidth() { return `${layoutSize['verticalTabMenu'].width}px`; }
    
    reactFlowHeight() { return this.verticalMenuHeight(); }
    reactFlowWidth() { return `calc(100vw - ${this.leftMargin()})`; }
    
    sidePropertyLeftMargin() { return `calc(100vw - ${layoutSize['sidebarProperty'].width}px)`; }
    sidePropertyHeight() { return `calc(100vh - ${this.topMargin()})`; }
    sidePropertyWidth() { return `${layoutSize['sidebarProperty'].width}px`; }

    accordionHeight() { return `calc(100vh - ${this.topMargin()})`; }
    accordionWidth() { return `${layoutSize['accordionContainer'].width}px`; }

    getShowingMenuWidth(tabVisible : boolean[]) {
        if(tabVisible[0])
            return layoutSize['accordionContainer'].width;
        return 0; }

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
