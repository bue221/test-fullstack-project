import React from "react";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from "../redux/services/app.services";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  avatarUrl: Yup.string().url().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
});

const completeProfile = () => {
  const { data, isLoading } = useGetProfileQuery({});
  const { control, handleSubmit } = useForm({
    values: isLoading
      ? { name: "", avatarUrl: "", email: "", phone: "" }
      : data?.user,
    resolver: yupResolver(schema),
  });
  const [update, { isLoading: loadingUpdate }] = useUpdateUserMutation({});
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await update(data);
      toast.success("Profile updated successfully, you won $1000");
      navigate("/");
    } catch (error) {
      toast.error((error as any).data.message.join(", "));
    }
  };
  return (
    <div className="h-screen flex justify-center items-center gap-2">
      {loadingUpdate && <Loader />}
      <h1 className="text-4xl font-bold">Complete your profile</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <InputField
            control={control}
            name="name"
            label="Name"
            inputProps={{}}
          />
        </div>
        <div className="mb-6">
          <InputField control={control} name="avatarUrl" label="Avatar url" />
        </div>
        <div className="mb-6">
          <InputField control={control} name="email" label="email" />
          <InputField control={control} name="phone" label="phone" />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default completeProfile;
