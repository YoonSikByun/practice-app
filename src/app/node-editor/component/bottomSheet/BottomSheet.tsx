const BottomSheet = (
    {
        selectedNodes,
    } : {
        selectedNodes : string[],
    }
) => {
    const nodeId = (selectedNodes.length === 1) ? selectedNodes[0] : '';
    return (
        <div>
            Selected Node ID : {nodeId}
        </div>
    )
}

export default BottomSheet;
