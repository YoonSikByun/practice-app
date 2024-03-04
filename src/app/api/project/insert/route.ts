
import { insertProject } from "@/app/api/lib/service/project";
import { ReceiveProc } from "@/app/api/lib/util";

export async function POST(req : Request) { 
  return ReceiveProc(req, insertProject);
}