import { createFetch, setupHttpApi, Api } from "@razzib/fetch";

export type LoginAdmin = Api<undefined, Array<{}>>;
export type GetHelpLines = Api<undefined, Array<{}>>;
export type GetQuestions = Api<undefined, Array<{}>>;
export type GetPhotoVideo = Api<undefined, Array<{}>>;
export type GetDashboardData = Api<undefined, Array<{}>>;
export type GetUsersData = Api<undefined, Array<{}>>;
export type GetPanicsData = Api<undefined, Array<{}>>;
export type GetBloodData = Api<undefined, Array<{}>>;
export type AddHelpLines = Api<undefined, Array<{}>>;
export type AddPhotoVideo = Api<undefined, Array<{}>>;

export const httpApi = {
  loginAdmin: setupHttpApi<LoginAdmin>("user/registration"),
  getHelplines: setupHttpApi<GetHelpLines>("/gethelplines"),
  getQuestions: setupHttpApi<GetQuestions>("/question/getquestions"),
  getPhotoVideo: setupHttpApi<GetPhotoVideo>("/getphotovideos"),
  getDashboardData: setupHttpApi<GetDashboardData>("/data/getdashboarddata"),
  getUsersData: setupHttpApi<GetDashboardData>("/data/getusersdata"),
  getPanicsData: setupHttpApi<GetDashboardData>("/data/getpanicsdata"),
  getBloodData: setupHttpApi<GetDashboardData>("/data/getblooddata"),
  addHelplines: setupHttpApi<AddHelpLines>("/registerhelpline"),
  addPhotoVideo: setupHttpApi<AddPhotoVideo>("/registerphotovideo"),
};
