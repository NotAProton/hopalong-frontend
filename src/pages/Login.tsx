// pages/Login.jsx
import { useState } from "react";
import { motion } from "motion/react";
import AuthLayout from "../components/AuthLayout";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  interface Errors {
    email?: string;
    password?: string;
  }

  const [errors, setErrors] = useState({} as Errors);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData);
        // Here you would typically call your API to login the user
        setIsLoading(false);

        // Redirect to dashboard or home page
        // window.location.href = '/dashboard';
      }, 1500);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your HopAlong account"
    >
      <form className="mt-8 space-y-6">
        <div className="space-y-4">
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
              disabled={isLoading}
              delay={0.4}
              onClick={handleSubmit}
            >
              {isLoading ? "Signing in..." : "Sign in"}
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
