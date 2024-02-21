import { Position } from "@/app/common/util/definition";

export function registMouseEvent(
    onDragChange: (deltaX: number, deltaY: number, initPosition?: Position) => void,
    onMouseUp?: any,
    stopPropagation? : boolean,
) {
    return {
        // React Node에 적용할 이벤트 정의
        onMouseDown: (mouseDownEvent: React.MouseEvent<Element, MouseEvent>) =>
        {
            //부모 DOM에 마우스 이벤트 전달 방지
            if (stopPropagation) mouseDownEvent.stopPropagation();

            // 마우스 포인터 움직임 이벤트 핸들러 함수 정의
            const mouseMoveHandler = (mouseMoveEvent: MouseEvent) => {
                const deltaX = mouseMoveEvent.screenX - mouseDownEvent.screenX;
                const deltaY = mouseMoveEvent.screenY - mouseDownEvent.screenY;

                onDragChange(deltaX, deltaY);
            };

            // 마우스 버튼업 핸들러 함수 정의
            const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.body.style.removeProperty('user-select');
                if(onMouseUp) onMouseUp();
            };

            // 이벤트 핸들러 함수 등록
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler, {once:true});

            document.body.style.userSelect = 'none';
        },
    }
}

export const inRange = (v: number, min: number, max: number) => {
    let size = v;
    let limited = false;

    if (v < min) {
        size = min;
        limited = true;
    } else if (v > max) {
        size = max;
        limited = true;
    }

    return {size, limited};
}
