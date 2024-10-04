import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./capture_page.scss";
import { Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";

export default function CaptureImg() {
  const location = useLocation();
  const navigate = useNavigate();
  // const { imageSrc } = location.state || {imageSrc};
  const [imageSrc, setImageSrc] = useState(null);
  const [getImageSrc, setGetImageSrc] = useState(null);

  useEffect(() => {
    const image = location.state?.imageSrc;
    if (image) {
      localStorage.setItem("capturedImage", image);
      setImageSrc(image);
      addToLocalStorage(image);
    }
  }, [location.state, navigate]);

  const addToLocalStorage = (image) => {
    const storedImages =
      JSON.parse(localStorage.getItem("capturedImages")) || [];
    storedImages.push(image);
    console.log("kkk", image);

    localStorage.setItem("capturedImages", JSON.stringify(storedImages));
  };

  if (!imageSrc) {
    return null;
  }

  //  if (!imageSrc) {
  //    navigate("/");
  //    return null;
  //  }

  // useEffect(() => {
  //   if (location.state && location.state.capturedImage) {
  //     setSavedImage(location.state.capturedImage);
  //     // Save to localStorage
  //     localStorage.setItem(
  //       "capturedImage",
  //       JSON.stringify(location.state.capturedImage)
  //     );
  //   } else {
  //     navigate("/scan_page");
  //   }
  // }, [location.state, navigate]);

  const saveImage = () => {
    // setSavedImage(imageSrc);
    // localStorage.setItem("capturedImage", imageSrc);
    navigate("/image_saved");
  };
  return (
    <>
      <div
        className="col d-flex justify-content-between mb-2"
        style={{ position: "absolute", top: "50px" }}
      >
        <div className="capture_heading">Capture your business card </div>
        <BsThreeDotsVertical
          style={{
            fontSize: "19px",
            color: "#000000",
            marginRight: "12px",
            zIndex: "999",
          }}
        />
      </div>
      <div className="container-fluid scan-container">
        <div className=" capture_portion">
          {/* {savedImage.length > 0 ? (
            <div>
              {savedImage.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Captured ${index}`}
                  style={{ maxWidth: "100%", height: "459px" }}
                />
              ))}
            </div>
          ) : (
            <p>No images to preview.</p>
          )} */}

          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Captured"
              style={{ width: "100%", height: "459px" }}
            />
          ) : (
            <p>No image captured.</p>
          )}
          {/* <img src={captured} alt="Logo" style={{width:"383px",height:"459px"}}/> */}
        </div>
        <div className="d-flex captureclick_part">
          <div onClick={saveImage} className=" saveButton">
            <FiCheck
              style={{
                fontSize: "40px",
                color: "#9D9D9D",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
