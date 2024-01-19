import Card from "../card/card";
import Profile from "../profile/profile";
import Contributors from "../top-contributors/contributors";

const LandingPage = () => {
  return (
    <>
      <Profile />
      <Card />
      <Card />
      <Contributors />
    </>
  );
};

export default LandingPage;
