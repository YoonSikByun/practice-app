import SideNav from "../../ui/workflow/navi";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="grid grid-cols-[150px_auto_150px] gap-0 grid-rows-2">
        <div className="w-150px h-screen bg-blue-100">
          <SideNav />
        </div>
        <div className="bg-grey-100">
          {children}
        </div>
        <div className="bg-red-100">
          Left
        </div>
      </div>
    );
}