import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useAuth();

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 mx-auto">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-3xl font-extrabold">Create an Account</h1>
        <p className="font-medium">Register with ProFast</p>
      </div>
      <fieldset className="fieldset">
        {/* Email field */}
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="input w-full"
          placeholder="Email"
        />
        {errors.email?.type === "required" && (
          <p className="text-red-500">Email is required</p>
        )}
        {/* Password field */}
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
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 font-extrabold">
            Login
          </Link>
        </div>
        <button className="btn btn-primary text-[#1e1e1e] text-lg mt-4">
          Register
        </button>
      </fieldset>
    </form>
  );
};

export default Register;
