"use client";

import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DataItem, ServiceIdLabel, StatusBadge } from "@/enum";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { MdConfirmationNumber } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const GOOGLE_MAPS_API_KEY = "";

const OrderSummary = () => {
  const [detailData, setDetailData] = useState<DataItem>({
    orderId: "",
    status: 1,
    nama: "",
    serviceId: 1,
    alamat: "",
    startDate: null,
    endDate: null,
    selectedDate: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("order-detail");
    if (savedData) {
      setDetailData(JSON.parse(savedData));
    }
  }, []);

  const [markerLocation] = useState({
    lat: -6.221791,
    lng: 106.843239,
  });

  const handleClick = () => {
    const waLink =
      "https://wa.me/6281217873551?text=Nama%20:%20Howard%20Simpson%0ADetail%20Service%20:%20Pemasangan%20Meteran%20Baru%0AAlamat%20:%20Jl.%20Fatmawati%20No.20,%20Jakarta%20Selatan,%20DKI%20Jakarta%0APilihan%20Tanggal%20:%20Silahkan%20pilih%20salah%20satu%20tanggal%20di%20bawah%20ini%0A%0A%E2%80%A2%2017%20Des%202024%2017:00%0A%E2%80%A2%2018%20Des%202024%2010:00%0A%E2%80%A2%2018%20Des%202024%2013:00%0A%0ACatatan%0ANo%20Request";
    window.open(waLink, "_blank");
  };

  const sendToWhatsAppPegawai = () => {
    const phoneNumber = "6281217873551";
    const templateMessage = `
  Nama : Howard Simpson
  Detail Service : Pemasangan Meteran Baru
  Alamat : Jl. Fatmawati No.20, Jakarta Selatan, DKI Jakarta
  Tanggal : 17 Des 2024 17:00
  Gmaps Lokasi : https://maps.app.goo.gl/g5KbqTMXhq7GAq2X6
  Catatan : No Request
    `;

    const encodedMessage = encodeURIComponent(templateMessage.trim());
    const waLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6 py-24">
        <div className=" mb-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Summary Order</h2>
          <span
            className={`${
              StatusBadge[detailData.status].color
            } text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center space-x-1`}
          >
            <span className="font-bold">
              {StatusBadge[detailData.status].label}
            </span>
          </span>
        </div>
        <div className="rounded-md overflow-hidden">
          <div className="w-full grid grid-cols-2 gap-4 bg-white py-2 px-4">
            <Label className="text-gray-700 leading-none">Order Id</Label>
            <span className="text-[#242424] flex items-center font-medium space-x-1">
              <MdConfirmationNumber />
              <span className="font-bold">{detailData?.orderId}</span>
            </span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 bg-gray-200 py-2 px-4">
            <Label className="text-gray-700 leading-none">Nama</Label>
            <p className="text-ellipsis line-clamp-3">{detailData?.nama}</p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 bg-white py-2 px-4">
            <Label className="text-gray-700 leading-none">Detail Service</Label>
            <p className="text-ellipsis line-clamp-3">
              {ServiceIdLabel[detailData?.serviceId]}
            </p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 bg-gray-200 py-2 px-4">
            <Label className="text-gray-700 leading-none">Alamat</Label>
            <p className="text-ellipsis line-clamp-3">{detailData?.alamat}</p>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 bg-white py-2 px-4">
            <div>
              <Label className="text-gray-700 leading-none">
                Pilihan Tanggal
              </Label>
              <br />
              <span className="text-[10px] text-gray-500">
                {detailData?.selectedDate
                  ? "(Terkonfirmasi oleh pelanggan)"
                  : "(Otomatis di sesuaikan dengan perkiraan cuaca dan jadwal)"}
              </span>
            </div>
            {detailData?.selectedDate ? (
              <p className="text-ellipsis mb-1 line-clamp-1 text-sm">
                {detailData?.selectedDate}
              </p>
            ) : (
              <div>
                <p className="text-ellipsis mb-1 line-clamp-1 text-sm">
                  • 17 Des 2024 17:00
                </p>
                <p className="text-ellipsis mb-1 line-clamp-1 text-sm">
                  • 18 Des 2024 10:00
                </p>
                <p className="text-ellipsis line-clamp-1 text-sm">
                  • 18 Des 2024 13:00
                </p>
                <div className="flex justify-end">
                  <p className="text-ellipsis text-xs line-clamp-1 px-2 py-1 mt-2 border border-gray-300 rounded-full">
                    +3 Lainnya
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full grid grid-cols-2 gap-4 bg-gray-200 py-2 px-4">
            <Label className="text-gray-700 leading-none">Catatan</Label>
            <p className="text-ellipsis line-clamp-3">
              {detailData?.notes ?? "No Request"}
            </p>
          </div>
          <div className="w-full bg-white py-2 px-4">
            <div className="mb-4 flex justify-between items-center">
              <Label className="text-gray-700 leading-none">
                Detail Lokasi
              </Label>
              <span className="text-blue-500 cursor-pointer font-medium">
                Lihat Maps
              </span>
            </div>
            <div className="w-full h-[200px] mb-4">
              <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <Map
                  style={{ borderRadius: "20px" }}
                  defaultZoom={18}
                  defaultCenter={markerLocation}
                  gestureHandling={"greedy"}
                  disableDefaultUI
                >
                  <Marker position={markerLocation} />
                </Map>
              </APIProvider>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button
            className="w-full bg-blue-500 hover:bg-blue-400"
            onClick={() => {
              if (detailData?.selectedDate) {
                sendToWhatsAppPegawai();
              } else {
                handleClick();
              }
            }}
          >
            {detailData?.selectedDate
              ? "Kirim detail ke pegawai"
              : "Follow up User"}
          </Button>
          <Button
            className="mt-2 text-[#242424] w-full bg-white hover:bg-white"
            onClick={() => navigate("/home")}
          >
            Tutup
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default OrderSummary;
