import { insertProject } from "../../data/crud";

export default async function create(req : any, res : any) {
    try {
      if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        return res.json(await insertProject(body))
      }
  
    } catch (err : any) {
      return res.status(500).json({ error: err.message })
    }
  }