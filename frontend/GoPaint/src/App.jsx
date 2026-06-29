import { Routes, Route } from "react-router-dom";
import Layout from "./components/user/Layout";
import Home from "./pages/user/Home";
import Colors from "./pages/user/Colors";
import FindPainters from "./pages/user/FindPainters";
import HirePainter from "./pages/user/HirePainter";
import HowItWorks from "./pages/user/HowItWorks";
import Login from "./pages/user/Login";
import PainterSignUp from "./pages/painter/PainterSignUp";
import UserDashboard from "./pages/user/UserDashboard";
import UserProject from "./pages/user/UserProject";
import NewProject from "./pages/user/NewProject";
import ViewBids from "./pages/user/ViewBids";
import ViewProject from "./pages/user/ViewProject";
import UserSignUp from "./pages/user/UserSignUp";
import UserProfile from "./pages/user/UserProfile";
import PainterLayout from "./components/painter/Layout";
import PainterDashboard from "./pages/painter/PainterDashboard";
import BrowseProject from "./pages/painter/BrowseProject";
import MyBids from "./pages/painter/MyBids";
import PainterProfile from "./pages/painter/PainterProfile";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<UserSignUp />} />
      <Route path="/painter-signup" element={<PainterSignUp />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/user-projects" element={<UserProject />} />
      <Route path="/new-project" element={<NewProject />} />
      <Route path="/view-bids/:projectId" element={<ViewBids />} />
      <Route path="/view-project/:projectId" element={<ViewProject />} />
      <Route element={<PainterLayout />}>
        <Route path="/painter-dashboard" element={<PainterDashboard />} />
        <Route path="/browse-projects" element={<BrowseProject />} />
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/painter-profile" element={<PainterProfile />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="colors" element={<Colors />} />
        <Route path="find-painters" element={<FindPainters />} />
        <Route path="hire-painter/:painterId?" element={<HirePainter />} />
        <Route path="how-it-works" element={<HowItWorks />} />
      </Route>
    </Routes>
  );
}

export default App;
