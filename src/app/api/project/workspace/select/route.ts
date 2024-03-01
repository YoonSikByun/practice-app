
import { selectProject } from "@/app/api/service/project";
import { ReceiveProc } from "@/app/api/lib/util";

export async function GET(req : any) {
  return ReceiveProc(req, selectProject);
}