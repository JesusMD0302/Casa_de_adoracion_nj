type AppEvent = {
  eventID?: number | string;
  title: string;
  ubication: string;
  description: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
};

type EventContext = {
  nextEvent: AppEvent;
  event: AppEvent[];
  getEvents: () => void;
};
