import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    case "GET":
      getEvents(req, res);
      return;

    case "POST":
      createEvent(req, res);
      return;
    default:
      return res.status(400).json({ message: "invalid method" });
  }
}

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  const events = await prisma.events.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (events.length === 0) {
    return res
      .status(404)
      .json({ data: { message: "There are no events nearby" } });
  }
  
  const nextEvent = events.shift() ?? [];


  return res
    .status(200)
    .json({ data: { nextEvent: nextEvent, events: events } });
};

const createEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: { title: string; description: string; ubication: string } =
    req.body;
  const newEvent = await prisma.events.create({
    data: {
      title: body.title,
      description: body.description,
      ubication: body.description,
      date: moment().add(1, "days").format().toString(),
    },
  });
  return res.status(200).json({ data: { event: newEvent } });
};
