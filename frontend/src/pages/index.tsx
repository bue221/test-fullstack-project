import { useNavigate } from "react-router-dom";
import { FcMoneyTransfer } from "react-icons/fc";
import ProfileProgress from "../components/ProfileProgress";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authManage";
import usePageAuth from "../hooks/usePageAuth";

const indexPage = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/auth/login");
  }

  usePageAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">This is a real example</h1>
      <p className="text-2xl font-bold">Welcome {user?.username}</p>
      <div className="mt-4 flex items-center justify-center">
        <FcMoneyTransfer size={100} />
        <p className="text-2xl font-bold">You have {user?.balance} $</p>
      </div>
      <button
        className="mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => navigate("/dashboard")}
      >
        Go to dashboard
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
      <div className="absolute bottom-12 right-12">
        <ProfileProgress />
      </div>
    </div>
  );
};

export default indexPage;
