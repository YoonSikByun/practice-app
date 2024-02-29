import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from '@mui/material';
import { capitalizeFirstLetter } from '@/app/common/lib/util';
import { useEffect } from 'react';

export enum POPUP_TYPE {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success'
}

class GlobalStatusPopupManager {
    callbackSetErrorMsg : any = null;
    callbackSetWarningMsg : any = null;
    callbackSetInfoMsg : any = null;
    callbackSetSuccessMsg : any = null;

    registerSetErrorMsgCallback(f : (msg : string) => void) {
        this.callbackSetErrorMsg = f;}
    registerSetWarningMsgCallback(f : (msg : string) => void) {
        this.callbackSetWarningMsg = f;}
    registerSetInfoMsgCallback(f : (msg : string) => void) {
        this.callbackSetInfoMsg = f;}
    registerSetSuccessMsgCallback(f : (msg : string) => void) {
        this.callbackSetSuccessMsg = f;}
    
    setErrorMsg(msg : string) {
        if(!this.callbackSetErrorMsg) return;
        this.callbackSetErrorMsg(msg);
    }
    setWarningMsg(msg : string) {
        if(!this.callbackSetWarningMsg) return;
        this.callbackSetWarningMsg(msg);
    }
    setInfoMsg(msg : string) {
        if(!this.callbackSetInfoMsg) return;
        this.callbackSetInfoMsg(msg);
    }
    setSuccessMsg(msg : string) {
        if(!this.callbackSetSuccessMsg) return;
        this.callbackSetSuccessMsg(msg);
    }

    clearAllMsg() {
        this.setErrorMsg('');
        this.setWarningMsg('');
        this.setInfoMsg('');
        this.setSuccessMsg('');
    }
}

export const gStatusPopup = new GlobalStatusPopupManager();

export function StatusPopup({msg, status} : {msg : string, status : POPUP_TYPE}) {
    // console.log(`StatusPopup - msg(${msg}), status(${status})`);
    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 10 seconds set the show value to false
          gStatusPopup.clearAllMsg();
        }, 10000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, [msg, status]);

    const hide = () => {
        switch(status) {
            case POPUP_TYPE.ERROR:
                gStatusPopup.setErrorMsg('');
            case POPUP_TYPE.WARNING:
                gStatusPopup.setWarningMsg('');
            case POPUP_TYPE.INFO:
                gStatusPopup.setInfoMsg('');
            case POPUP_TYPE.SUCCESS:
                gStatusPopup.setSuccessMsg('');
        }
    }

    return (
        <Alert sx={{
                position: 'absolute',
                top: 'calc(100vh - 120px)',
                width: 'calc(100vw - 20px)',
                marginLeft: '10px',
                marginRight: '10px',
                zIndex: 'modal'
            }}
            // variant="outlined"
            variant="filled"
            severity={status}
            color={status}
            action={
                <Button color="inherit" size="small" onClick={hide}>
                    닫기
                </Button>
            }
        >
            <AlertTitle>{capitalizeFirstLetter(status)}</AlertTitle>
            {msg}
        </Alert>
    );
}

