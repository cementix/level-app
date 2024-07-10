import AuthManagement from "./AuthManagement";
import DaysList from "./DaysList";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-full flex flex-col w-[15%] bg-primary">
      <div className="flex justify-between items-center px-3 pt-2 mb-2">
        <h2 className="font-bold text-xl">Level App</h2>
        <AuthManagement />
      </div>
      <hr />
      <DaysList />
    </nav>
  );
};

export default Navbar;
