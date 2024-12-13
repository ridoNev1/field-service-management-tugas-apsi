import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { GrTools } from "react-icons/gr";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="min-h-screen justify-center flex flex-col items-center">
        <div className="justify-center flex space-x-2 items-center">
          <GrTools />
          <p>Under construction</p>
        </div>
        <Link to="/">
          <Button className="mt-10 w-full bg-blue-500 hover:bg-blue-400">
            Logout
          </Button>
        </Link>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
