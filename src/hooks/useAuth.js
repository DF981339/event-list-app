import { useSelector } from "react-redux";

export const useAuth = () => {
  const { username } = useSelector((state) => state.user);
  if (username !== "") {
    return true;
  } else {
    return false;
  }
};
