import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Profile from "../profile/profile";
import Side from "@/components/shared/sidebar/Side";

const LandingPage = () => {
  return (
    <>
    <Side/>
    <Profile/>
    <div className="flex flex-col gap-4">
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/report">
        <Button>Report</Button>
      </Link>
      <Link to="/profile">
        <Button>Profile</Button>
      </Link>
    </div>
      </>
  )
};

export default LandingPage;
