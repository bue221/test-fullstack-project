import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProfileQuery } from "../redux/services/app.services";
import usePageAuth from "../hooks/usePageAuth";

const ProfilePage = () => {
  usePageAuth();
  const { data, isLoading } = useGetProfileQuery({});

  const navigate = useNavigate();
  const handleCompleteProfile = () => navigate("/completeProfile");
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      {isLoading && <Loader />}
      <h1 className="text-4xl font-bold">Your profile</h1>
      <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
        <img
          src={
            data?.user?.avatarUrl ??
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimulacionymedicina.es%2Fdefault-avatar-300x300-1%2F&psig=AOvVaw1R071LhXvUbBxgCOoV5pjZ&ust=1682168134873000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKiNr-KCu_4CFQAAAAAdAAAAABAE"
          }
          alt=""
          className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-700">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {data?.user?.name ?? "----"}
            </h2>
            <p className="px-5 text-xs sm:text-base dark:text-gray-400">
              {data?.user?.email ?? "----"}
            </p>
          </div>
          <div className="flex justify-center pt-2 space-x-4 align-center">
            <p className="px-5 text-xs sm:text-base dark:text-gray-400">
              {data?.user?.phone ?? "----"}
            </p>
          </div>
        </div>
      </div>
      <button
        disabled={data?.user?.completed}
        onClick={handleCompleteProfile}
        className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow disabled:cursor-not-allowed disabled:opacity-50"
      >
        Complete your profile!
      </button>
    </div>
  );
};

export default ProfilePage;
