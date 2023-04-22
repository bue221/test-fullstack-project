import { useEffect } from "react";
import { useLazyRefecthQuery } from "../redux/services/app.services";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setUser } from "../redux/slices/authManage";
import { useNavigate } from "react-router-dom";

const usePageAuth = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [refecth] = useLazyRefecthQuery();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = (await refecth({})).data;
      dispatch(setUser({ user: res, isLoggedIn: true }));
    })();
  }, []);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/auth/login");
  //   }
  // }, [isLoggedIn]);
};

export default usePageAuth;
