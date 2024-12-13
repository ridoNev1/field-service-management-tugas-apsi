import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdConfirmationNumber } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
const BottomNav = () => {
  return (
    <nav className="fixed w-full max-w-[412px] bg-white shadow-lg bottom-0 border-t">
      <ul className="flex justify-around items-center py-2">
        <Link to="/home">
          <li className="flex flex-col items-center">
            <button className="text-blue-500">
              <MdConfirmationNumber />
            </button>
            <span className="text-xs text-gray-500">Order</span>
          </li>
        </Link>
        <Link to="/vehicle-inspection">
          <li className="flex flex-col items-center">
            <button className="text-blue-500">
              <FaCarSide />
            </button>
            <span className="text-xs text-gray-500">Vehicle Inspection</span>
          </li>
        </Link>

        <Link to="/profile">
          <li className="flex flex-col items-center">
            <button className="text-blue-500">
              <CgProfile />
            </button>
            <span className="text-xs text-gray-500">Profile</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default BottomNav;
