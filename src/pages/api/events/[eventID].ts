import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    case "GET":
      getEventById(req, res);
      return;

    default:
      res.status(400).json({ message: "Invalid method" });
      return;
  }
}

const getEventById = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestEventID = req.query.eventID;

  const eventID = Number(requestEventID);

  if (isNaN(eventID) || eventID == 0) {
    return res.status(404).json({ message: "The id doesn't exist" });
  }

  const event = await prisma.events.findUnique({ where: { eventID: eventID } });

  if (event == null) {
    return res.status(404).json({ message: "The id doesn't exist" });
  }

  return res.status(200).json({
    data: {
      event: event,
    },
  });
};
