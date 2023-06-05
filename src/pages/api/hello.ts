import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.method, req.url);
  
  res.status(200).json({method: req.method, url: req.url})
}