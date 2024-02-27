import '@/app/main/scss/DefaultPopup.scss';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Boundary from '@/app/common/util/Boundary';
import {registMouseEvent} from "@/app/common/util/moudeMove";
import { Rect, Size, Position } from '@/app/common/util/definition';

const INVALID_INDEX = -10000;
let PIVOT_POSITION : Position = {x: INVALID_INDEX, y: INVALID_INDEX};

function Popup(
    {
        title,
        closePopup,
        width,
        height,
        closeOutsideClick,
        children
    } : {
        title : string,
        closePopup : () => void,
        width : number,
        height : number,
        closeOutsideClick : boolean,
        children: React.ReactNode
    }) {

    const popupSize : Size = useMemo<Size>(() => (
        {width: width, height: height}
    ), [width, height]);

    const [popupTop, setPopupTop] = useState<string>(`100px`);
    const [popupLeft, setPopupLeft] = useState<string>(`calc(50% - ${(popupSize.width/2)}px)`);

    const popupRef = useRef<HTMLDivElement>(null);

    //ESC키를 누르면 팝업을 닫는다.
    const EscKeyDown = useCallback((event : any) => {
        if(event.key === 'Escape') closePopup();
    }, [closePopup]);

    const getRefPosition = (ref : any) => {

        const r : Rect = ref.current?.getBoundingClientRect() as Rect;
        if(!r) return {x: INVALID_INDEX, y: INVALID_INDEX};
        else  return {x: r.left, y: r.top}; }

    const OnDragChange = (deltaX : number, deltaY : number) => {
        if(PIVOT_POSITION.x === INVALID_INDEX &&
            PIVOT_POSITION.y === INVALID_INDEX) {
            PIVOT_POSITION = getRefPosition(popupRef); }

        setPopupTop(`${PIVOT_POSITION.y + deltaY}px`);
        setPopupLeft(`${PIVOT_POSITION.x + deltaX}px`); }

    const OnMouseUp = () => { PIVOT_POSITION = {x:INVALID_INDEX, y:INVALID_INDEX}}

    useEffect(() => {if(popupRef.current) popupRef.current.focus(); }, []);

    return (
    <div className='popup_outer'>
        <Boundary
            className='popup_inner border-solid border-black rounded-md'
            style={{
                top: popupTop,
                left: popupLeft
            }}
            ref={popupRef}
            onKeyDown={EscKeyDown}
            tabIndex={0}
            onBlur={closeOutsideClick ? closePopup : ()=>{}}
        >
            <div className='m-3'>
                {/* Header 부분 */}
                <div className={clsx('flex',
                        'border-b-2',
                        'border-black',
                        'cursor-all-scroll')}
                    {...registMouseEvent(OnDragChange, OnMouseUp)}
                    style={{width: popupSize.width}}
                >
                    <div className='text-xl'
                        style={{width: '90%'}}
                    >
                        {title}
                    </div>
                    <div style={{width: '10%', textAlign: 'right'}}>
                        <button title='닫기' onClick={closePopup}>
                            <XCircleIcon className={clsx("h-7 w-7 text-gray-700")} />
                        </button>
                    </div>
                </div>

                {/* Content 부분 */}
                <div style={{
                    // lineHeight: `${popupSize.height}px`,
                    height: popupSize.height,
                    width: popupSize.width }}
                >
                    {children}
                </div>
            </div>
        </Boundary>
    </div>
    );
}

export default function DefaultPopup(
    {
        title,
        visible,
        setVisible,
        contentWidth,
        contentHeight,
        closeOutsideClick = false,
        children
    } : {
        title : string,
        visible : boolean,
        setVisible : (visible:boolean) => void,
        contentWidth : number,
        contentHeight : number,
        closeOutsideClick? : boolean
        children: React.ReactNode
    }) {

    const overlayRootEl = (typeof document !== 'undefined') ?
                            document.querySelector('#main-body')
                            : null;

    const closePopup = () => setVisible(false);

    return (
    <>
        {
            (visible && overlayRootEl) && createPortal(
                <Popup
                    width={contentWidth}
                    height={contentHeight}
                    title={title}
                    closePopup={closePopup}
                    closeOutsideClick={closeOutsideClick}
                >
                    {children}
                </Popup>,
                overlayRootEl
            )
        }
    </>
    );
}
