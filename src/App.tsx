import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SplashScreen,
  Login,
  Home,
  AddNewOrder,
  OrderSummary,
  Profile,
  VehicleInspection,
  VehicleInpectionDetail,
  UpdateVehicleDetail,
} from "@/pages/export";

const App = () => {
  return (
    <div className="bg-slate-600 text-[#242424]">
      <div className="max-w-[412px] mx-auto bg-white min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="add-order" element={<AddNewOrder />}></Route>
            <Route path="order-summary" element={<OrderSummary />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="vehicle-inspection"
              element={<VehicleInspection />}
            ></Route>
            <Route
              path="vehicle-inspection-detail"
              element={<VehicleInpectionDetail />}
            ></Route>
            <Route
              path="update-vehicle-inspection-detail"
              element={<UpdateVehicleDetail />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
