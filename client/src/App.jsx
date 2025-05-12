import Home from "./Components/Home";
import "./App.css";
import "./Fonts.css";
import "./Animations.css";
import MedCardReg from "./Components/MedCardReg";
import { Navigate, Route, Routes } from "react-router";
import Doctors from "./Components/Doctors";
import Meeting from "./Components/Meeting";
import DeliveryBoy from "./Components/DelivartBoy";
import TrackDelivery from "./Components/Track";
import Docmet from "./doctor meet";
import Glitch from "./Components/Glitch";
import Auth from "./pages/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  localStorage.setItem("delivery", false);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<ProtectedRoute element={<Doctors />} />} />
        <Route path="/medcardreg/:doctorId" element={<ProtectedRoute element={<MedCardReg />} />} />
        <Route path="/meeting/:userid" element={<ProtectedRoute element={<Meeting />} />} />
        <Route path="/delivary" element={<ProtectedRoute element={<DeliveryBoy />} />} />
        <Route path="/track" element={<ProtectedRoute element={<TrackDelivery />} />} />
        <Route path="/doc" element={<ProtectedRoute element={<Docmet />} />} />
        <Route path="/error" element={<Glitch />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
