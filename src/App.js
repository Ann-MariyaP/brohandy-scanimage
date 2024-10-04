import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import Header from "./components/header/header";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";
import Layout from "./layout/layout";
import SignIn from "./pages/sign_in/sign_in";
import ScanImage from "./pages/scanPage/scan_page";
import CaptureImg from "./pages/CapturePage/capture_page";
import DisplaySavedImage from "./pages/image_saved_page/image_saved_page";
import GenerateOCR from "./pages/generateOCR/generateOCR";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* <Route> */}
            <Route path={ROUTES.SIGNIN} element={<SignIn />} />
            {/* <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.SCAN_PAGE} element={<ScanImage />} />
            </Route> */}{" "}
            <Route path={ROUTES.SCAN_PAGE} element={<ScanImage />} />
            <Route path={ROUTES.CAPTURE} element={<CaptureImg />} />
            <Route path={ROUTES.IMAGE_SAVED} element={<DisplaySavedImage />} />
            <Route path={ROUTES.GENERATE_OCR} element={<GenerateOCR />} />
            {/* </Route> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
