import { ExampleLaporan, TemplateLaporan } from "@/assets/export";
import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/enum";
import { InspectionStatus } from "@/enum";
import { useEffect, useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isSameDay, parse } from "date-fns";
import { id } from "date-fns/locale";

const VehicleInpectionDetail = () => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle>({
    name: "",
    id: 1,
    inspectionDetails: {
      kondisiBan: 1,
      kondisiFilter: 1,
      kondisiKelistrikan: 1,
      kondisiMesin: 1,
      kondisiRem: 1,
      timingBelt: 1,
    },
    lastInspection: "",
    licensePlate: "",
    transmission: "",
  });

  function openPDF() {
    const pdfPath = TemplateLaporan;
    window.open(pdfPath, "_blank");
  }

  function openPDFExample() {
    const pdfPath = ExampleLaporan;
    window.open(pdfPath, "_blank");
  }

  useEffect(() => {
    const savedData = localStorage.getItem("vehicleDetail");
    if (savedData) {
      setVehicle(JSON.parse(savedData));
    }
  }, []);

  const getStatusLabel = (status: InspectionStatus): string => {
    switch (status) {
      case InspectionStatus.GOOD:
        return "Good";
      case InspectionStatus.MEDIUM:
        return "Medium";
      case InspectionStatus.POOR:
        return "Poor";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: InspectionStatus): string => {
    switch (status) {
      case InspectionStatus.GOOD:
        return "text-green-600";
      case InspectionStatus.MEDIUM:
        return "text-yellow-600";
      case InspectionStatus.POOR:
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const isToday = (dateString: string) => {
    const inputDate = parse(dateString, "dd MMM yyyy HH:mm", new Date(), {
      locale: id,
    });
    return isSameDay(inputDate, new Date());
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 pt-24">
        <h2 className="font-bold text-lg">Detail Kendaraan</h2>
        <div className="bg-white mt-6 shadow-md rounded-xl p-6 mb-4">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 border rounded-lg flex items-center justify-center mr-4">
              <FaCarSide className="text-blue-500 text-2xl" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{vehicle.name}</p>
              <p className="text-sm text-gray-600">
                License Plate: {vehicle.licensePlate}
              </p>
              <p className="text-xs text-gray-500">{vehicle.transmission}</p>
            </div>
          </div>
          <div
            className={`${
              isToday(vehicle.lastInspection)
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            } p-2 text-sm font-medium rounded mb-4`}
          >
            {isToday(vehicle.lastInspection)
              ? "Data inspeksi telah diperbarui"
              : "Segera update data inspeksi kendaraan"}
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600">Terakhir diinspeksi</p>
            <button
              className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-400"
              onClick={() => navigate("/update-vehicle-inspection-detail")}
            >
              Perbarui
            </button>
          </div>
          <p className="text-xs text-gray-500">{vehicle.lastInspection}</p>
          <h3 className="font-bold text-gray-800 mt-4 mb-2">Detail Inspeksi</h3>
          <hr className="mb-4" />
          <ul>
            {Object.entries(vehicle.inspectionDetails).map(([key, value]) => (
              <li key={key} className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <span
                  className={`text-sm font-semibold ${getStatusColor(value)}`}
                >
                  {getStatusLabel(value)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          className="mt-10 w-full bg-blue-500 hover:bg-blue-400"
          onClick={openPDF}
        >
          Unduh Template Laporan Inspeksi
        </Button>
        <Button
          className="mt-2 text-[#242424] w-full bg-white hover:bg-white"
          onClick={openPDFExample}
        >
          Contoh Pengisian Laporan Inspeksi
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default VehicleInpectionDetail;
