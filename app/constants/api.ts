import { API_URL } from "./env";

interface ApiEndpoints {
  [key: string]: string;
}

const API_AUTH = `${API_URL}/api/auth`;

const API_ENDPOINTS_AUTH: ApiEndpoints = {
  LOGIN: `${API_AUTH}/login`,
  LOGOUT: `${API_AUTH}/logout`,
  REGISTER: `${API_AUTH}/register`,
  USER_PROFILE: `${API_URL}/api/user/profile`,
  UPDATE_PROFILE: `${API_URL}/api/user/update-profile`,
  CHANGE_PASSWORD: `${API_URL}/api/user/change-password`,
  GET_POSTS: `${API_URL}/api/posts`,
  CREATE_POST: `${API_URL}/api/posts/create`,
  UPDATE_POST: `${API_URL}/api/posts/update`,
  DELETE_POST: `${API_URL}/api/posts/delete`,
};

export { API_ENDPOINTS_AUTH };