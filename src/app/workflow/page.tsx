// import DropdownMenu from "@/ui/dropdonw-menu"
import ReactFlowApp from "./reactflow"
export default function Page() {
  return (
  <main>
    <div className="grid grid-rows-2 grid-flow-col gap-0">
      <div>
        <ReactFlowApp/>
      </div>
      <div className="block h-96 z-50 bg-yellow-200">
        Center-bottom
      </div>
    </div>
  </main>
  )
}
