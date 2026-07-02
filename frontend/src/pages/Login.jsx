import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";
import Card from "../components/Card";
import Button from "../components/Button";
import { loginUser } from "../services/auth";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoginError("");

    try {
      setLoading(true);

      const response = await loginUser(data);

      localStorage.setItem("token", response.access_token);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      setLoginError(
        error.response?.data?.detail || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome Back
        </h2>

        <p className="text-slate-400 mb-8">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-3">
              <Mail className="text-slate-400" size={18} />

              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent p-3 outline-none text-white"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-3">
              <Lock className="text-slate-400" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent p-3 outline-none text-white"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-slate-400" />
                ) : (
                  <Eye size={18} className="text-slate-400" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </button>
          </div>

          {loginError && (
            <p className="text-center text-sm text-red-500">
              {loginError}
            </p>
          )}

          <Button>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Register
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  );
}

export default Login;