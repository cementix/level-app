import AuthManagement from "./AuthManagement";
import CreateDayButton from "./CreateDayButton";
import DaysList from "./DaysList";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-full flex flex-col items-center w-[15%] bg-primary">
      <div className="flex justify-between w-full items-center px-3 pt-2 mb-2">
        <h2 className="font-bold text-xl">Level App</h2>
        <AuthManagement />
      </div>
      <hr />
      <DaysList />
      <CreateDayButton />
    </nav>
  );
};

export default Navbar;
