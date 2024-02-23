export default function CheckBox(
    {
        className,
        value,
    } : {
        className : string,
        value : string,
    }
) {
    return <input type="check" checked className={className} value={value} />
}