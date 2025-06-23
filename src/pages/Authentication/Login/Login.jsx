import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 mx-auto">
      <h1 className="text-3xl font-extrabold mb-3">Welcome Back</h1>
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email")}
          className="input w-full"
          placeholder="Email"
        />
        <label className="label">Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="input w-full"
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500">
            Passwords must be at least 6 characters or longer
          </p>
        )}
        <div>
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 font-extrabold">
            Register
          </Link>
        </div>
        <button className="btn btn-primary text-[#1e1e1e] text-lg mt-4">
          Login
        </button>
        <SocialLogin className=""></SocialLogin>
      </fieldset>
    </form>
  );
};

export default Login;
