import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slices/authManage";

const WrapAuthValidation = ({ children }: any) => {
  const navigate = useNavigate();
  const dispacth = useAppDispatch();

  useEffect(() => {
    const userAuth = localStorage.getItem("userAuth");
    if (!userAuth) {
      navigate("/auth/login");
    } else {
      dispacth(setUser({ user: JSON.parse(userAuth), isLoggedIn: true }));
    }
  }, []);

  return <div>{children}</div>;
};

export default WrapAuthValidation;
