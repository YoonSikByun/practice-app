export function registMouseEvent(
    onDragChange: (deltaX: number, deltaY: number) => void,
    stopPropagation?: boolean,
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
            };

            // 이벤트 핸들러 함수 등록
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler, {once:true});
        },
    }
}

export const inRange = (v: number, min: number, max: number) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
}
