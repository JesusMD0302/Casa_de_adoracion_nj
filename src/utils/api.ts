import axios from "@/lib/axios";

type postData = Omit<AppEvent, "createdAt" | "updatedAt">;

// Events requests
export const getEvents = async () => {
  const { data } = await axios.get("/events");
  return data.data;
};

export const getAllEvents = async () => {
  const { data } = await axios.get("/events/all");
  return data.data;
};

export const postEvent = async (eventData: postData) => {
  const { data } = await axios.post("/events", eventData);
  return data.data;
};

export const updateEvent = async ({
  eventData,
  eventID,
}: {
  eventID: number | string;
  eventData: postData;
}) => {
  const { data } = await axios.put(`/events/${eventID}`, eventData);
  return data.data;
};

export const deleteEvent = async (eventID: number) => {
  const { data } = await axios.delete(`/events/${eventID}`);
  return data.data;
};

// Images rquests
export const getImages = async () => {
  const { data } = await axios.get(`/images`);
  return data.data;
};

export const postImage = async (imageData: any) => {
  const { data } = await axios.post("/images", imageData);
  return data.data;
};

export const deleteImage = async (imageID: number) => {
  const { data } = await axios.delete(`/images/${imageID}`);
  return data.data;
};

// Week Psalm requests
export const getWeekPsalm = async () => {
  const { data } = await axios.get("/week-psalms");
  return data.data.weekPsalm;
};

export const updateWeekPsalm = async (weekPsalmData: any) => {
  const { data } = await axios.put("/week-psalms/1", weekPsalmData);
  return data.data;
};

// Users requests
export const getUsers = async () => {
  const { data } = await axios.get("/users");
  return data.data;
};

export const postUser = async (userData: any) => {
  const { data } = await axios.post("/users", userData);
  return data.data;
};

export const deleteUser = async (userID: number) => {
  const { data } = await axios.delete(`/users/${userID}`);
  return data.data;
};

export const changePassword = async ({
  userID,
  changePasswordData,
}: {
  userID: string | number;
  changePasswordData: any;
}) => {
  const { data } = await axios.patch(`/users/${userID}`, changePasswordData);
  return data.data;
};

// Announcements requests
export const getAnnouncements = async () => {
  const { data } = await axios.get("/announcements");
  return data.data;
};

export const postAnnouncement = async (announcementData: any) => {
  const { data } = await axios.post("/announcements", announcementData);
  return data.data;
};

export const updateAnnouncement = async ({
  announcementData,
  announcementID,
}: {
  announcementID: number | string;
  announcementData: postData;
}) => {
  const { data } = await axios.put(
    `/announcements/${announcementID}`,
    announcementData
  );
  return data.data;
};

export const deleteAnnouncement = async (announcementID: number) => {
  const { data } = await axios.delete(`/announcements/${announcementID}`);
  return data.data;
};
