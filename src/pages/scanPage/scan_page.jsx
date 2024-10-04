import React, { useRef, useCallback, useState } from "react";
import "./scan_page.scss";
import Webcam from "react-webcam";
import {  Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  facingMode: "environment",
};

export default function ScanImage() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // setCapturedImage(imageSrc);
    navigate("/capture_page", { state: { imageSrc } });
  };

  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ position: "absolute", top: "50px" }}
      >
        <div className="capture_heading">Capture your business card </div>
        <BsThreeDotsVertical
          style={{
            fontSize: "19px",
            color: "#000000",
            marginRight: "12px",
          }}
        />
      </div>
      <div className="container-fluid scan-container">
        <div className="scan_portion">
          {" "}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            width="100%"
            // height="640px"
            height={459}
          />
        </div>
        <div className="col d-flex captureclick_part">
          {/* <NavLink to={ROUTES.CAPTURE}> */}{" "}
          <div>
            {" "}
            <Button onClick={capture} className="captureButton"></Button>{" "}
          </div>{" "}
          {/* </NavLink> */}
        </div>
      </div>
    </>
  );
}
