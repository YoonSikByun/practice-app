import clsx from "clsx"
import Left from "../top/Left"

export default function ProjectSearchMenu ({onChange} : any) {
    return (
      <div className="h-full w-full flex items-center">
        <input
          className={clsx(
            'border-[1px] border-borderclr-bold',
            'ml-[20px] mr-[20px] w-full h-[25px] pl-[5px]'
          )}
          type="search"
          placeholder="프로젝트 검색"
          role="textbox"
          onChange = {onChange} />
      </div>
    )
}
