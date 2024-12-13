import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import { vehicles } from "@/enum";
import { FaCarSide } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VehicleInspection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isNeedSearch />
      <div className="p-6 pt-24">
        <h2 className="font-bold text-lg">Vehicle Inspection</h2>
        <div className="mt-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="shadow-lg cursor-pointer mb-4 bg-white rounded-xl p-4 flex items-center max-w-md "
              onClick={() => {
                navigate("/vehicle-inspection-detail");
                localStorage.setItem("vehicleDetail", JSON.stringify(vehicle));
              }}
            >
              <div className="w-16 h-16 flex items-center justify-center mr-4">
                <FaCarSide className="text-blue-500 text-3xl" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-lg truncate">
                  {vehicle.name}
                </p>
                <p className="text-sm text-gray-600">Terakhir diinspeksi</p>
                <p className="text-xs text-gray-500 mt-1">
                  {vehicle.lastInspection}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default VehicleInspection;
