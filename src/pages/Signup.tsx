// components/Button.jsx

// pages/SignUp.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import AuthLayout from "../components/AuthLayout";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Divider from "../components/Divider";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    studentId: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    } else if (!formData.email.endsWith("iiitk.ac.in")) {
      newErrors.email = "Please use your IIIT Kottayam email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      handleNext();
    } else if (validateStep2()) {
      // Submit form
      console.log("Form submitted:", formData);
      // Here you would typically call your API to register the user

      // Show success animation
      setStep(3);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the IIIT Kottayam ride-sharing community"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  icon="mdi:account"
                  error={errors.firstName}
                  required
                  delay={0.1}
                />

                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  icon="mdi:account"
                  error={errors.lastName}
                  required
                  delay={0.2}
                />
              </div>

              <TextField
                label="College Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@iiitk.ac.in"
                icon="mdi:email"
                error={errors.email}
                required
                delay={0.3}
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
                delay={0.4}
              />

              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                icon="mdi:lock-check"
                error={errors.confirmPassword}
                required
                delay={0.5}
              />

              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handleNext}
                  fullWidth
                  icon="mdi:arrow-right"
                  delay={0.6}
                >
                  Continue
                </Button>
              </div>

              <Divider text="Or sign up with" delay={0.7} />

              <div className="grid grid-cols-2 gap-4">
                <SocialButton
                  icon="mdi:google"
                  label="Google"
                  onClick={() => console.log("Google signup")}
                  delay={0.8}
                />

                <SocialButton
                  icon="mdi:microsoft"
                  label="Microsoft"
                  onClick={() => console.log("Microsoft signup")}
                  delay={0.9}
                />
              </div>

              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-yellow-500 hover:text-amber-500 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <TextField
                label="Student ID"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="IIITK2022XXX"
                icon="mdi:card-account-details"
                error={errors.studentId}
                required
                delay={0.1}
              />

              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="10-digit number"
                icon="mdi:phone"
                error={errors.phoneNumber}
                required
                delay={0.2}
              />

              <motion.div
                className="pt-4 space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-yellow-500 hover:text-amber-500"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-yellow-500 hover:text-amber-500"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    primary={false}
                    icon="mdi:arrow-left"
                    delay={0.5}
                  >
                    Back
                  </Button>

                  <Button type="submit" icon="mdi:account-plus" delay={0.6}>
                    Sign Up
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center py-8 space-y-6"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="mdi:check-circle"
                  className="text-green-500 text-4xl"
                />
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Account Created!
                </h3>
                <p className="text-gray-600">
                  Please check your email to verify your account and complete
                  registration.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => (window.location.href = "/login")}
                  fullWidth
                  icon="mdi:login"
                  delay={0.3}
                >
                  Continue to Login
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
