import React, { FormEvent, useState } from "react";
import { signup } from "../services/authService";
import { NavLink, useNavigate } from "react-router-dom";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const hasMinimumLength = (password: string) => password.length >= 8;
  const hasLetter = (password: string) => /[a-zA-Z]/.test(password);
  const hasNumber = (password: string) => /\d/.test(password);
  const hasSpecialChar = (password: string) =>
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

  const isFormValid = () => {
    return (
      hasMinimumLength(password) &&
      hasLetter(password) &&
      hasNumber(password) &&
      hasSpecialChar(password)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (isFormValid()) {
      try {
        const resData = await signup({ name, email, password });
        if (resData) navigate("/login");
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cs-light-gray flex-col">
      <div className="flex flex-col items-center w-[350px]">
        <h2 className="text-4xl font-bold mb-6">Sign Up</h2>
      </div>
      <form
        data-testid="signup-form" // Add this line to set the data-testid
        className="w-[350px] rounded px-8 pt-2 pb-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-1">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="appearance-none border border-black rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
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
            id="re-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="appearance-none border border-black rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {isSubmitted && (
          <>
            {hasMinimumLength(password) ? null : (
              <p className="text-cs-red text-sm">
                Password must be at least 8 characters long
              </p>
            )}
            {hasLetter(password) ? null : (
              <p className="text-cs-red text-sm">
                Password must contain at least 1 letter
              </p>
            )}
            {hasNumber(password) ? null : (
              <p className="text-cs-red text-sm">
                Password must contain at least 1 number
              </p>
            )}
            {hasSpecialChar(password) ? null : (
              <p className="text-cs-red text-sm">
                Password must contain at least 1 special character
              </p>
            )}
          </>
        )}
        <button
          type="submit"
          className="mt-4 w-full bg-cs-orange text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Sign up
        </button>
      </form>
      <div className="flex">
        <p className="font-bold mr-2">Already have an account?</p>
        <NavLink to="/login" className="text-cs-orange font-bold">
          Sign in
        </NavLink>
      </div>
      <div className="text-center w-[60%] flex flex-col items-center">
        <p className="text-xs">
          By continuing, you agree to our{" "}
          <span className="font-bold text-cs-orange">Terms of Service</span>,{" "}
          <span className="font-bold text-cs-orange">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
