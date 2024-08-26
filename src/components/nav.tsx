import { useNav } from "@/store/nav-menu-slice";

const Navbar = () => {
  const toggle = useNav((state) => state.toggle);

  return (
    <nav className="relative">
      <div className="flex items-center justify-between">
        <div
          className="cursor-pointer text-sm text-black lg:hidden"
          onClick={toggle}
        >
          Menu
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
