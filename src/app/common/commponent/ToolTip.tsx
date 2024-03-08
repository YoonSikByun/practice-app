import './ToolTip.scss';

export default function ToolTip(
    {
        tooltipText,
        children
    } : {
        tooltipText : string,
        children : React.ReactNode
    }) {

    return (
        <div className="tooltip">
            {children}
            <span className="tooltiptext">{tooltipText}</span>
        </div>
    );
}