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

class GlobalMessageManager {
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
        this.clearAllMsg();
        if(!this.callbackSetErrorMsg) return;
        this.callbackSetErrorMsg(msg);
    }
    setWarningMsg(msg : string) {
        this.clearAllMsg();

        if(!this.callbackSetWarningMsg) return;
        this.callbackSetWarningMsg(msg);
    }
    setInfoMsg(msg : string) {
        this.clearAllMsg();

        if(!this.callbackSetInfoMsg) return;
        this.callbackSetInfoMsg(msg);
    }
    setSuccessMsg(msg : string) {
        this.clearAllMsg();

        if(!this.callbackSetSuccessMsg) return;
        this.callbackSetSuccessMsg(msg);
    }

    clearAllMsg() {
        if(this.callbackSetErrorMsg) this.callbackSetErrorMsg('');
        if(this.callbackSetWarningMsg) this.callbackSetWarningMsg('');
        if(this.callbackSetInfoMsg) this.callbackSetInfoMsg('');
        if(this.callbackSetSuccessMsg) this.callbackSetSuccessMsg('');
    }
}

export const globalMessageManager = new GlobalMessageManager();

export function StatusPopup({msg, status} : {msg : string, status : POPUP_TYPE}) {
    // console.log(`StatusPopup - msg(${msg}), status(${status})`);
    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 10 seconds set the show value to false
          globalMessageManager.clearAllMsg();
        }, 10000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, [msg, status]);

    const hide = () => {
        switch(status) {
            case POPUP_TYPE.ERROR:
                globalMessageManager.setErrorMsg('');
            case POPUP_TYPE.WARNING:
                globalMessageManager.setWarningMsg('');
            case POPUP_TYPE.INFO:
                globalMessageManager.setInfoMsg('');
            case POPUP_TYPE.SUCCESS:
                globalMessageManager.setSuccessMsg('');
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
                <Button color="inherit" size="medium" onClick={hide}
                    sx={{
                        width: '70px',
                        height: '30px',
                        fontSize: '15px',
                        border: '1px',
                        borderColor: 'black',
                        backgroundColor: 'blueviolet'
                    }}
                >
                    닫기
                </Button>
            }
        >
            <AlertTitle><p className='font-bold text-2xl'>{capitalizeFirstLetter(status)}</p></AlertTitle>
            <p className='font-bold text-xl'>{msg}</p>
        </Alert>
    );
}

