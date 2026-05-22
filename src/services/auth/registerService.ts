import publicInstance from "@/utils/axiosPublicInstance";

export const register = async (data: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}) => {
  const response = await publicInstance.post("/register", data);
  return response.data;
};
