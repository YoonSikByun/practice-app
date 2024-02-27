import { useState, useEffect } from "react"

export default function CheckBox(
    {
        className = '',
        id='',
        value = '',
        checked = false,
        disabled=false,
        checkBoxManager = null
    } : {
        className? : string,
        id? : string,
        value? : string,
        checked? : boolean,
        disabled? : boolean,
        checkBoxManager? : any
    }
) {
    const [check, setCheck] = useState(checked);

    useEffect(() => {
        if(checkBoxManager) checkBoxManager.registerMultiCallback(id, setCheck);
    }, [id, checkBoxManager]);

    const updateCheck = (e : any) => {
        setCheck(e.target.checked);
        checkBoxManager.updateCheck(id, e.target.checked);
    }

    return <input type="checkbox" disabled={disabled} checked={check} onChange={(e) => updateCheck(e)} className={className} value={value}/>
}