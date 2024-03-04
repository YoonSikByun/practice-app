
import { selectProject } from "@/app/api/lib/service/project";
import { ReceiveProc } from "@/app/api/lib/util";

export async function GET(req : any) {
  return ReceiveProc(req, selectProject);
}