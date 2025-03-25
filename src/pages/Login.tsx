// pages/Login.jsx
import { useState } from "react";
import { motion } from "motion/react";
import AuthLayout from "../components/AuthLayout";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  // Use our fixed auth hook
  const { login, loading, error } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name as keyof Errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {} as Errors;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const result = await login(formData);
        console.log("Login successful:", result.payload.token);
        // Handle successful login (e.g., store token, redirect, etc.)
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          general:
            error instanceof Error
              ? error.message
              : "An error occurred during login",
        }));
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your HopAlong account"
    >
      <form
        className="mt-8 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit();
        }}
      >
        <div className="space-y-4">
          {errors.general && (
            <motion.div
              className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.general}
            </motion.div>
          )}

          <TextField
            label="Institute Email ID"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@iiitk.ac.in"
            icon="mdi:email"
            error={errors.email}
            required
            delay={0.1}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            icon="mdi:lock"
            error={errors.password}
            required
            delay={0.2}
          />

          <div className="flex items-center justify-between mt-4">
            <motion.a
              href="#"
              className="text-sm font-medium text-yellow-500 hover:text-amber-500 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              Forgot password?
            </motion.a>
          </div>

          <div className="pt-4">
            <Button
              fullWidth
              icon="mdi:login"
              disabled={loading}
              delay={0.4}
              onClick={void handleSubmit}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <Divider delay={0.5} />

          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-yellow-500 hover:text-amber-500 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
