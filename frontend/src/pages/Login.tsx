import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signin } from "../services/authService";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const resData = await signin({ email, password });
      if (resData) navigate("/");
    } catch (error) {
      if (error instanceof Error)
        setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cs-light-gray flex-col">
      <div className="flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6">Sign in</h2>
      </div>
      <form
        className="rounded px-8 pt-2 pb-8 w-[350px]"
        onSubmit={handleSubmit}
      >
        <div className="mb-1">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="appearance-none border border-black rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-1">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="appearance-none border border-black rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {error && <p className="text-cs-red">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full bg-cs-orange text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Log in
        </button>
      </form>
      <div className="text-center w-[20%] flex flex-col items-center">
        <p className="text-xs">
          By continuing, you agree to our{" "}
          <span className="font-bold text-cs-orange">Terms of Service</span>,{" "}
          <span className="font-bold text-cs-orange">Privacy Policy</span>.
        </p>
        <div className="border border-black border-b-1 w-[50%] my-6"></div>
        <div className="flex">
          <p className="font-bold mr-2">Don't have an account?</p>
          <NavLink to="/signup" className="text-cs-orange font-bold">
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
