import React from "react";
import Loginform from "./loginform";

function Login() {
  return (
    <div className={className.container}>
      <div className={className.loginCard}>
        <Title />
        <Loginform />
      </div>
      <div className={className.absoluteBg} />
    </div>
  );
}

const className = {
  container:
    "relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black bg-no-repeat bg-cover relative items-center",
  loginCard: "max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10",
  heading: "mt-6 text-3xl font-bold text-gray-900",
  absoluteBg: "absolute bg-black opacity-60 inset-0 z-0",
};

const Title = () => (
  <div className="text-center">
    <h2 className={className.heading}>GG-COVID Dashboard</h2>
  </div>
);

export default Login;
