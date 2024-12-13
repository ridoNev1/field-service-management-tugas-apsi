import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import { Vehicle } from "@/enum";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { id } from "date-fns/locale";

const UpdateVehicleDetail = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          setError("Ukuran file melebihi 5MB.");
          return;
        }
        if (!file.type.startsWith("image/")) {
          setError("Hanya file gambar yang diizinkan.");
          return;
        }
        newImages.push(URL.createObjectURL(file));
      }
      setError("");
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      setError("Harap unggah setidaknya satu gambar sebelum mengirim.");
      return;
    }
    const today = new Date();
    const formattedToday = format(today, "dd MMM yyyy HH:mm", { locale: id });
    const savedData = localStorage.getItem("vehicleDetail") || "[]";
    const workedData: Vehicle = JSON.parse(savedData);
    workedData.inspectionDetails.kondisiMesin = 1;
    workedData.inspectionDetails.kondisiBan = 1;
    workedData.inspectionDetails.kondisiRem = 1;
    workedData.lastInspection = formattedToday;

    localStorage.setItem("vehicleDetail", JSON.stringify(workedData));
    navigate("/vehicle-inspection-detail");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-6 pt-24">
        <h2 className="font-bold text-xl text-center mb-6">
          Update Inspeksi Kendaraan
        </h2>

        <div className="flex flex-col items-center space-y-6">
          {/* Image Upload Area */}
          <div
            className="w-72 h-72 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden hover:shadow-lg hover:border-blue-400 transition-all"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <label
              htmlFor="imageUpload"
              className="text-gray-500 text-center flex flex-col items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16s-1 0-1-1 1-4 4-4h14a1 1 0 010 2H7l-1.5 3h10.5a1 1 0 010 2H4s-1 0-1-1z"
                />
              </svg>
              <p className="font-medium">Take Photo / Upload</p>
              <p className="text-sm text-gray-400">
                Max 5MB, format gambar saja
              </p>
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              multiple
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Image Preview */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="mt-10 w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 rounded-lg"
          onClick={handleSubmit}
        >
          Submit Hasil Inspeksi
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default UpdateVehicleDetail;
