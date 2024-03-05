
import { selectWorkspace } from "@/app/api/lib/service/server/workspace";
import { ReceiveProc } from "@/app/api/lib/util";

export async function GET(req : any) {
  return ReceiveProc(req, selectWorkspace);
}