/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";
import AuthLayout from "../components/AuthLayout";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Divider from "../components/Divider";
import OTPInput from "../components/OTPInput";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../utils/validator";
import { useSignup, useVerify } from "../hooks/useAuth";

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

  interface Errors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    studentId?: string;
    phoneNumber?: string;
    otp?: string;
  }
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({});
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [otpError, setOtpError] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const { signup, loading: signupLoading, error: signupError } = useSignup();
  const { verify, loading: verifyLoading, error: verifyError } = useVerify();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the field after change
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        error = validateName(value).success ? "" : validateName(value).payload;
        break;
      case "email":
        error = validateEmail(value).success
          ? ""
          : validateEmail(value).payload;
        break;
      case "password":
        error = validatePassword(value).success
          ? ""
          : validatePassword(value).payload;
        // Also validate confirmPassword if it's already filled
        if (formData.confirmPassword) {
          validateField("confirmPassword", formData.confirmPassword);
        }
        break;
      case "confirmPassword":
        error = value === formData.password ? "" : "Passwords do not match";
        break;
      case "phoneNumber":
        error = validatePhone(value).success
          ? ""
          : validatePhone(value).payload;
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Check step 1 validity whenever form data or errors change
  useEffect(() => {
    const step1Fields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];
    const step1Filled = step1Fields.every(
      (field) => formData[field as keyof typeof formData].trim() !== ""
    );
    const step1NoErrors = step1Fields.every(
      (field) => !errors[field as keyof typeof errors]
    );

    setIsStep1Valid(step1Filled && step1NoErrors);
  }, [formData, errors]);

  const validateStep1 = () => {
    const fieldsToValidate = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ];

    let hasErrors = false;

    fieldsToValidate.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      validateField(field, value);
      if (errors[field as keyof typeof errors] || value.trim() === "") {
        hasErrors = true;
      }
    });

    return !hasErrors && isStep1Valid;
  };

  const handleNext = async () => {
    if (validateStep1()) {
      try {
        await signup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        setStep(2);
      } catch {
        setErrors((prev) => ({
          ...prev,
          email:
            signupError instanceof Error
              ? signupError.message
              : "Failed to send verification code. Please try again.",
        }));
      }
    }
  };

  const handleBack = () => {
    setStep(1);
    setOtpError("");
  };

  const handleOTPComplete = async () => {
    try {
      console.log("whoa");
      await verify({ email: formData.email, code: otp });
      setStep(3);
    } catch {
      setOtpError(
        verifyError instanceof Error
          ? verifyError.message
          : "Invalid verification code"
      );
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleResendOTP = async () => {
    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      setOtpError("");
    } catch {
      setErrors((prev) => ({
        ...prev,
        email:
          signupError instanceof Error
            ? signupError.message
            : "Failed to resend verification code. Please try again.",
      }));
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the IIIT Kottayam ride-sharing community"
    >
      <form className="mt-8 space-y-6">
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                onBlur={handleBlur}
                placeholder="john.doe@iiitkottayam.ac.in"
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                placeholder="••••••••"
                icon="mdi:lock-check"
                error={errors.confirmPassword}
                required
                delay={0.5}
              />

              <div className="pt-4">
                <Button
                  onClick={() => {
                    void handleNext();
                  }}
                  fullWidth
                  icon="mdi:arrow-right"
                  disabled={!isStep1Valid || signupLoading}
                  className={
                    !isStep1Valid || signupLoading
                      ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                      : ""
                  }
                >
                  {signupLoading ? "Sending..." : "Continue"}
                </Button>
              </div>

              <Divider delay={0.7} />

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
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center space-y-2"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  Verify Your Email
                </h3>
                <p className="text-gray-600">
                  We've sent a verification code to{" "}
                  <span className="font-medium text-yellow-600">
                    {formData.email}
                  </span>
                </p>
              </motion.div>

              <OTPInput
                length={6}
                onComplete={(value) => {
                  setOtp(value);
                }}
                isDisabled={verifyLoading}
                error={otpError}
              />

              <motion.div
                className="pt-4 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {!verifyLoading && (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-sm text-gray-600">
                      Didn't receive code?{" "}
                      <button
                        type="button"
                        onClick={void handleResendOTP}
                        className="font-medium text-yellow-500 hover:text-amber-500 transition-colors"
                        disabled={signupLoading}
                      >
                        {signupLoading ? "Sending..." : "Resend code"}
                      </button>
                    </p>
                  </motion.div>
                )}

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
                    checked={termsAccepted}
                    onChange={handleTermsChange}
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
                    onClick={handleBack}
                    icon="mdi:arrow-left"
                    delay={0.5}
                    disabled={verifyLoading}
                  >
                    Back
                  </Button>

                  <Button
                    icon={verifyLoading ? "mdi:loading" : "mdi:check"}
                    delay={0.6}
                    disabled={verifyLoading || !termsAccepted}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => handleOTPComplete()}
                    className={
                      verifyLoading || !termsAccepted
                        ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                        : ""
                    }
                  >
                    {verifyLoading ? "Verifying..." : "Verify"}
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
                  Your email has been verified and your account is ready to use.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => {
                    void navigate("/login");
                  }}
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
