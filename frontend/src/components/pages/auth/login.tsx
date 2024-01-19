import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import Loading from "react-loading";
import { shadows } from "@/assets/constants/styles";
import LoginSvg from "@/svg/LoginSvg";
import { useRef, useState } from "react";
import AuthValidator, { LoginDataType } from "@/validators/auth-validators";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import AuthHandler from "@/handlers/auth-handler";
import { useGlobalContext } from "@/hooks/use-global-context";

const Login = () => {
  const [formData, setFormData] = useState({} as LoginDataType);
  const [passwordType, setPasswordType] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();
  const handleSubmit = async (e: any) => {
    if (isSubmitting) return;
    e.preventDefault();
    console.log(formData);
    const data = AuthValidator.validateLogin(formData);
    console.log(data);
    if (!data.success) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    const res = await AuthHandler.login(data.data);
    setIsSubmitting(false);
    if (res.success) {
      toast.success("Logged in successfully");
      setUser(res.data);
      navigate("/");
    } else {
      console.log(res);
      toast.error(res.message);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div className="relative min-h-screen bg-muted flex justify-center sm:max-h-[90vh] overflow-hidden">
      <motion.div
        //scale up
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }}
        className={cn(
          "flex justify-center items-center flex-1 max-w-screen-xl m-0 shadow flex-reverse sm:m-10  sm:rounded-lg flex-row",
          shadows.sm
        )}
      >
        <div className="flex-1 hidden w-full h-full text-center lg:flex">
          <LoginSvg />
        </div>
        <div className="z-10 p-6 lg:w-1/2 xl:w-5/12 sm:p-12">
          <Link
            to="/"
            className="m-auto w-full flex items-center justify-center"
          >
            <img
              src="logo.png"
              className="relative w-32 transition-opacity w-mx-auto hover:opacity-60"
            />
          </Link>
          <div className="flex flex-col items-center mt-2">
            <div className="flex-1 w-full mt-8">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col max-w-xs gap-4 mx-auto"
              >
                <motion.input
                  autoFocus
                  whileHover={{ scale: 1.05 }}
                  className="w-full px-4 py-3 text-sm font-medium border border-gray-200 rounded-lg bg-muted placeholder-muted-foreground placeholder:opacity-40 focus:outline-none focus:border-gray-400 focus:bg-background"
                  type="email"
                  placeholder="yourname@example.com"
                  id="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={formData.email}
                />
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <motion.input
                    ref={passwordInputRef}
                    className="w-full px-4 py-3 text-sm font-medium border border-gray-200 rounded-lg bg-muted placeholder-muted-foreground placeholder:opacity-40 focus:outline-none focus:border-gray-400 focus:bg-background"
                    type={passwordType}
                    placeholder="Enter a password"
                    id="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    value={formData.password}
                  />
                  {formData.password &&
                    (passwordType === "password" ? (
                      <HiOutlineEyeSlash
                        onClick={handlePasswordVisibility}
                        className="absolute cursor-pointer text-muted-foreground right-3 top-3"
                      />
                    ) : (
                      <HiOutlineEye
                        onClick={handlePasswordVisibility}
                        className="absolute cursor-pointer text-muted-foreground right-3 top-3"
                      />
                    ))}
                </motion.div>
                <Button
                  type="submit"
                  ref={submitBtnRef}
                  className={cn(
                    "flex items-center transition-all group gap-2",
                    isSubmitting && "cursor-not-allowed, opacity-50"
                  )}
                >
                  <span>Login</span>
                  {isSubmitting ? (
                    <Loading type="spin" color="#000" height={20} width={20} />
                  ) : (
                    <IoIosArrowRoundForward className="w-6 h-6 transition-transform group-hover:translate-x-4" />
                  )}
                </Button>
                <p className="mt-2 text-xs text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="border-b border-gray-500 border-dotted text-primary"
                  >
                    sign up{" "}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
