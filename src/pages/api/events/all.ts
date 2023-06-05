import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    case "GET":
      getAllEvents(req, res);
      return;

    default:
      return res.status(400).json({ message: "invalid method" });
  }
}

const getAllEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const events = await prisma.events.findMany({
    orderBy: {
      date: "asc",
    },
  });

  return res.status(200).json({ data: { events } });
};
