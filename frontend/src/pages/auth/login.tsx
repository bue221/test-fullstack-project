import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/services/app.services";
import { setUser } from "../../redux/slices/authManage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";

const schemaValidation = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const [loggin] = useLoginMutation();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await loggin(data);
      toast.success("Login success");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/3">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <InputField
              control={control}
              name="username"
              label="Username"
              inputProps={{}}
            />
          </div>
          <div className="mb-6">
            <InputField
              control={control}
              name="password"
              label="Password"
              inputProps={{
                type: "password",
                placeholder: "******************",
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 test IA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
