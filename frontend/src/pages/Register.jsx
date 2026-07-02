import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import toast from "react-hot-toast";

import AuthLayout from "../layouts/AuthLayout";
import Card from "../components/Card";
import Button from "../components/Button";
import { registerUser } from "../services/auth";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setRegisterError("");

    try {
      setLoading(true);

      await registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      });

      toast.success("Registration Successful");

      navigate("/");
    } catch (error) {
      setRegisterError(
        error.response?.data?.detail || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <h2 className="text-3xl font-bold text-white mb-2">
          Create Account
        </h2>

        <p className="text-slate-400 mb-8">
          Create your AI Interview Pilot account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-3">
              <User className="text-slate-400" size={18} />

              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent p-3 outline-none text-white"
                {...register("full_name", {
                  required: "Full Name is required",
                })}
              />
            </div>

            {errors.full_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.full_name.message}
              </p>
            )}
          </div>

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
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters",
                  },
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

          {/* Confirm Password */}
          <div>
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-3">
              <Lock className="text-slate-400" size={18} />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full bg-transparent p-3 outline-none text-white"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-slate-400" />
                ) : (
                  <Eye size={18} className="text-slate-400" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {registerError && (
            <p className="text-center text-sm text-red-500">
              {registerError}
            </p>
          )}

          <Button>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-400 hover:text-blue-300"
            >
              Login
            </Link>
          </p>
        </form>
      </Card>
    </AuthLayout>
  );
}

export default Register;