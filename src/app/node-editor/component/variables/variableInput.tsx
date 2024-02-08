export function VariablesInput () {
    return (
      <input className="sidebar-add-btn"type="search" placeholder="변수 검색" role="textbox" style={{textAlign:"left" , paddingLeft:"10px"}}></input>
    )
}

export function VariableAddBtn ({ onClick }: { onClick: () => void }) {
  return (
    <input className="sidebar-add-btn"type="button" value="+변수 추가" role="button" onClick={onClick}></input>    
  )
}
