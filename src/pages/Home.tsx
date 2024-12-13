import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { data, DataItem, ServiceIdLabel, StatusBadge } from "@/enum";
import { MdConfirmationNumber } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import BottomNav from "@/components/layout/BottomNav";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [dataSet, setDataSet] = useState<DataItem[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    const savedData = localStorage.getItem("mainData");
    if (!savedData) localStorage.setItem("mainData", JSON.stringify(data));
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("mainData");
    if (savedData) setDataSet(JSON.parse(savedData));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isNeedSearch onSearch={setSearch} />
      <div className="p-6 pt-24">
        <div className=" flex justify-between items-center">
          <h2 className="font-bold text-lg">List Order</h2>
          <Link to="/add-order">
            <Button className="bg-blue-500 hover:bg-blue-400 text-sm py-1">
              <FaPen /> Create Order
            </Button>
          </Link>
        </div>
        <div className="mt-4 max-h-[75vh] pr-2 overflow-y-scroll">
          {dataSet
            .filter((el) =>
              el.orderId.toLowerCase().includes(search.toLowerCase())
            )
            .map((el, indx) => (
              <div
                key={indx}
                onClick={() => {
                  localStorage.setItem("order-detail", JSON.stringify(el));
                  navigate("/order-summary");
                }}
                className="shadow-md cursor-pointer mb-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 max-w-sm"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center space-x-1">
                    <MdConfirmationNumber />
                    <span className="font-bold">{el.orderId}</span>
                  </span>
                  <span
                    className={`${
                      StatusBadge[el.status].color
                    } text-white text-xs font-semibold px-2 py-1 rounded-lg flex items-center space-x-1`}
                  >
                    <span className="font-bold">
                      {StatusBadge[el.status].label}
                    </span>
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900">{el.nama}</p>
                <p className="font-medium text-gray-700">
                  {ServiceIdLabel[el.serviceId]}
                </p>
                <p className="font-medium mt-2 text-xs text-gray-500 line-clamp-2 text-ellipsis">
                  {el.alamat}
                </p>
              </div>
            ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
