
import { deleteTaskCards } from "@/app/api/lib/service/server/workspace";
import { ReceiveProc } from "@/app/api/lib/util";

export async function POST(req : any) {
  return ReceiveProc(req, deleteTaskCards);
}