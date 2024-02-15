export default function ProjectSearchMenu ({onChange} : any) {
    return (
      <input className="home-sidebar-search-input" type="search" placeholder="프로젝트 검색" role="textbox" onChange = {onChange}></input>
    )
}
