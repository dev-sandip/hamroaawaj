interface UserCompProps {
  name: string;
  img: string;
  email: string;
}

const UserComp = ({ name, img, email }: UserCompProps) => {
  return (
    <div className="flex items-center gap-4">
      <img className="w-10 h-10 rounded-full" src={img} alt="" />
      <div className="font-medium text-foreground">
        <div>{name}</div>
        <div className="text-sm text-muted-foreground">{email}</div>
      </div>
    </div>
  );
};
export default UserComp;
