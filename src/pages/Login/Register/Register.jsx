import React, { useState } from "react";
import Lottie from "lottie-react";
import registerAnimation from "../../../animation/register.json"; // path to your Lottie animation
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the registration logic here
    console.log("Registering with", name, email, password, confirmPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center  py-10 bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl md:text-4xl font-bold my-4 text-blue-400">
          Register Now
        </h2>
        <div className="w-48 h-48 md:w-64 md:h-64 mb-8">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
          <button
            type="submit"
            className="py-2 bg-blue-500 text-white rounded-md w-full"
          >
            Register
          </button>
          <span className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline text-red-500">
              Login here...
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
