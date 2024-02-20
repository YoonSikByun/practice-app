import { mainLayoutSize } from "@/app/main/config/layoutFrame";

class CalcStyleRegion {
    getTopMargin() {return `${mainLayoutSize['topGNB'].height}px`; }
    getTopHeight() {return `${mainLayoutSize['topGNB'].height}px`; }
    
    getTopLeftWidth() {return `${mainLayoutSize['topGNB_Left'].width}px`; }

    getTopLeftLeft() {return this.getTopLeftWidth(); }
    getTopCenterWidth() {
        const padding = mainLayoutSize['topGNB_Left'].width +
                        mainLayoutSize['topGNB_Right'].width;
        return `calc(100vw - ${padding}px)`;
    }

    getTopRightLeft() {
        return `calc(100vw - ${mainLayoutSize['topGNB_Right'].width}px)` }
    getTopRightWidth() {return `${mainLayoutSize['topGNB_Right'].width}px`; }

    getHomeHeight() { return `calc(100vh - ${mainLayoutSize['topGNB'].height}px)`; }

    getProjectTop() { return this.getTopMargin(); }
    getProjectLeft() { return `0px` }
    getProjectWidth() {return `${mainLayoutSize['project'].width}px`; }
    getProjectHeight() {return this.getHomeHeight(); }

    getWorkspaceTop() { return this.getTopMargin(); }
    getWorkspaceLeft() { return `${mainLayoutSize['project'].width}px` }
    getWorkspaceHeight() { return this.getHomeHeight(); }
    getWorkspaceWidth() { return `calc(100vw - ${mainLayoutSize['project'].width}px)`; }
}

export const calcStyle : CalcStyleRegion = new CalcStyleRegion();
