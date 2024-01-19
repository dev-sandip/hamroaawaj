import { useGlobalContext } from "@/hooks/use-global-context";

const Profile = () => {
  const { user } = useGlobalContext();
  return (
    <div className="flex flex-col gap-4 max-w-2xl m-auto">
      <img src={user?.profileImg} alt="" className="h-12 w-12 rounded-full" />
      <h3>{user?.name}</h3>
      <p>{user?.email}</p>
      <p>{user?.validId}</p>
      <img
        src={user?.legaldocImg}
        alt=""
        className="h-44 w-auto rounded-md object-contain origin-center"
      />
    </div>
  );
};
export default Profile;
