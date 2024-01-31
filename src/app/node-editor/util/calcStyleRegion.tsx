import {layoutSize} from '@/app/node-editor/config/layoutFrame'

export const getElementSize = (elementId : string) => {
    const elementDom : any = document.getElementById(elementId);
    const elementRect : any = elementDom.getBoundingClientRect();
    const height = elementRect.bottom - elementRect.top;
    const width = elementRect.right - elementRect.left;

    return {height: height, width: width};
}

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

    bottomSheetTopMargin() { return `calc(100vh - ${layoutSize['minBottomSheet'].height}px)`}
    bottomSheetHeight() { return `${layoutSize['minBottomSheet'].height}px`}
    bottomSheetCurTopMargin(curHeight : number) { return `calc(100vh - ${curHeight}px)`}
    bottomSheetCurHeight(curHeight : number) { return `${curHeight}px`}
}

export const calcStyle : CalcStyleRegion = new CalcStyleRegion();
