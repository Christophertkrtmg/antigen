import { createFetch } from "@razzib/fetch";
import { httpApi } from "./api";

export const baseUrl =
  "http://ec2-3-8-237-29.eu-west-2.compute.amazonaws.com:8000";
// export const baseUrl = "http://localhost:8000";

export const AUTH_API = `${baseUrl}/dashboard`;
export const HELPLINE_API = `${baseUrl}/helpline`;
export const QUESTION_API = `${baseUrl}/question`;
export const PHOTOVIDEO_API = `${baseUrl}/dashboard/photovideo`;
export const IMAGE_API = `${baseUrl}/uploads/`;

export const registerUser = createFetch(httpApi.loginAdmin, AUTH_API);
export const allHelplines = createFetch(
  httpApi.getHelplines,
  HELPLINE_API,
  "POST"
);
export const allQuestions = createFetch(httpApi.getQuestions, AUTH_API, "POST");
export const allPhotoVideos = createFetch(
  httpApi.getPhotoVideo,
  PHOTOVIDEO_API,
  "POST"
);
export const addHelplines = createFetch(
  httpApi.addHelplines,
  HELPLINE_API,
  "POST"
);

export const allDashboardData = createFetch(httpApi.getDashboardData, AUTH_API);
export const allUsersData = createFetch(httpApi.getUsersData, AUTH_API, "POST");
export const allPanicsData = createFetch(
  httpApi.getPanicsData,
  AUTH_API,
  "POST"
);
export const allBloodData = createFetch(httpApi.getBloodData, AUTH_API, "POST");
