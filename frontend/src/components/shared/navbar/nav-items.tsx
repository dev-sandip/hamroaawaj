interface NavItemTypes {
  label: string;
  href: string;
}

const navItems: NavItemTypes[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Feedback",
    href: "/feedback",
  },
  {
    label: "Top Contributors",
    href: "/top-contributors",
  },
];

export default navItems;
