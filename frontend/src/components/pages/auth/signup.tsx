import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import Loading from "react-loading";
import { shadows } from "@/assets/constants/styles";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LoginSvg from "@/svg/LoginSvg";
import { UserType } from "@/types/user.types";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import AuthValidator from "@/validators/auth-validators";
import AuthHandler from "@/handlers/auth-handler";
import { useGlobalContext } from "@/hooks/use-global-context";

const UserSignup = () => {
  const [formData, setFormData] = useState({} as UserType);
  const [passwordType, setPasswordType] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();

  const handleSubmit = async (e: any) => {
    if (isSubmitting) return;
    console.log(formData);
    e.preventDefault();
    const data = AuthValidator.validateUser(formData);
    if (!data.success) {
      toast.error("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    const res = await AuthHandler.signup(data.data);
    setIsSubmitting(false);
    if (res.success) {
      toast.success("Your account has been created successfully");
      setUser(res.data);
      navigate("/");
    } else {
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

  const handleImageUpload = async () => {
    if (isSubmitting) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (file) {
        // Check the file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload an image file.");
          return;
        }

        // Check the file size
        const fileSizeInMB = file.size / (1024 * 1024);
        const maxSizeInMB = 5;
        if (fileSizeInMB > maxSizeInMB) {
          toast.error(`Please upload an image smaller than ${maxSizeInMB} MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          setFormData({ ...formData, legaldocImg: base64Data });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="relative min-h-screen bg-muted flex justify-center sm:max-h-[90vh] overflow-hidden">
      <motion.div
        //scale up
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.4 } }}
        className={cn(
          "flex justify-center items-center flex-1 max-w-screen-xl m-0 shadow flex-reverse sm:m-10  sm:rounded-lg flex-row-reverse",
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
                  whileHover={{ scale: 1.05 }}
                  autoFocus
                  className="w-full px-4 py-3 text-sm font-medium border border-gray-200 rounded-lg bg-muted placeholder-muted-foreground placeholder:opacity-40 focus:outline-none focus:border-gray-400 focus:bg-background"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  onChange={(e) => handleChange(e)}
                  value={formData.name}
                />
                <motion.input
                  whileHover={{ scale: 1.05 }}
                  autoFocus
                  className="w-full px-4 py-3 text-sm font-medium border border-gray-200 rounded-lg bg-muted placeholder-muted-foreground placeholder:opacity-40 focus:outline-none focus:border-gray-400 focus:bg-background"
                  type="text"
                  id="validId"
                  name="validId"
                  placeholder="Citizenship Number"
                  onChange={(e) => handleChange(e)}
                  value={formData.validId}
                />

                <Button
                  onClick={handleImageUpload}
                  role="button"
                  type="button"
                  variant="secondary"
                  className="border-2 flex gap-3 items-center justify-center"
                >
                  <span>
                    {formData.legaldocImg
                      ? "Citizenship Uploaded"
                      : "Upload Citizenship Image"}
                  </span>
                  <Upload className="w-4 h-4" />
                </Button>

                <motion.input
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
                        className="absolute cursor-pointer text-muted-foreground right-3 inset-y-1/2 -translate-y-1/2"
                      />
                    ) : (
                      <HiOutlineEye
                        onClick={handlePasswordVisibility}
                        className="absolute cursor-pointer text-muted-foreground right-3 inset-y-1/2 -translate-y-1/2"
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
                  <span>Sign Up</span>
                  {isSubmitting ? (
                    <Loading type="spin" color="#000" height={20} width={20} />
                  ) : (
                    <IoIosArrowRoundForward className="w-6 h-6 transition-transform group-hover:translate-x-4" />
                  )}
                </Button>
                <p className="mt-2 text-xs text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="border-b border-gray-500 border-dotted text-primary"
                  >
                    login
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
export default UserSignup;
