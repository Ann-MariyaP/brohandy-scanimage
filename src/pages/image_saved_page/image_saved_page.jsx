import React, { useEffect, useState } from "react";
import "./image_saved_page.scss";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCamera } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { IoMdClose, IoIosCloseCircle } from "react-icons/io";
import { ROUTES } from "../../routes/index";
import { NavLink, useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function DisplaySavedImage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const SelectImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const [captureimages, setImages] = useState(null);
  const [latestImage, setlatestImage] = useState([]);

  useEffect(() => {
   const storedImages =
     JSON.parse(localStorage.getItem("capturedImages")) || [];
    // const storedImages = localStorage.getItem("capturedImages");
    if (storedImages.length > 0) {
      setlatestImage(storedImages);
      handleOCR(storedImages);
    } else {
      navigate("/scan_page");
    }
    console.log("hhh", latestImage);
    getImagesData();
  }, [navigate]);

  const deleteImage = () => {
    setImages(null);
    localStorage.removeItem("capturedImages");
    // selectedImage(null);
    setlatestImage(null);
  };

  const [getGptResponse, setGetGptResponse] = useState(false);
  const handleClick = () => {
    setGetGptResponse(true);
    handleGPT();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pairs = [
    { label: "Name", value: "Cardoc" },
    { label: "Email", value: "cardocspa@gmail.com" },
    { label: "Country Code", value: "91" },
    { label: "Phone number", value: ["88848 89289", "90877 98848"] },
    { label: "Postal code", value: "603309" },
    { label: "Province", value: "jdkcdok" },
    { label: "Country", value: "India" },
    { label: "Services", value: "Car wash" },
  ];

  // https://backend.helpingflock.com
  const [getImages, setGetImages] = useState([]);
  const [getOCR, setGetOCR] = useState([]);
  const getImagesData = () => {
    axios
      .get("http://localhost:5000/display")
      .then(function (response) {
        // console.log("full data:", response.data);
        const apiResponse = response.data;
        if (Array.isArray(apiResponse)) {
          setGetImages(apiResponse);
        } else {
          throw new Error("Data is not an array");
        }
        // const urls = apiResponse.flatMap((array) =>
        //   array.map((item, index) => {
        //     if (item.length > 1 && index === 1) {
        //       const [...imageUrls] = item.split(",").map((url) => url.trim());
        //       return imageUrls;
        //     }
        //     return [];
        //   })
        // );
        // setGetImages(urls.flat());

        //  const ocrText = apiResponse.map((array) =>
        //    array.map((item, index) => {
        //      if (item.length > 1 && index === 0) {
        //        const [...ocrUrls] = item
        //          .split(",")
        //          .map((line, index) => <div>{line.trim()}</div>);
        //        return ocrUrls;
        //      }
        //      return [];
        //    })
        //  );
        //  setGetOCR(ocrText);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  const [ocrResult, setOcrResult] = useState("");
  const [s3Result, setS3Result] = useState("");
  const [gptResult, setGptResult] = useState("");
  const [s3Urls, setS3Urls] = useState([]);

  const handleOCR = () => {
    if (latestImage.length === 0) return;

    const formData = new FormData();
    latestImage.forEach((dataURL, index) => {
      const blob = dataURItoBlob(dataURL);
      formData.append("images", blob, `image_${index}.jpg`);
    });

    axios
      .post("https://backend.helpingflock.com/generate", formData)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          const ocrTexts = data.map((item) => item.ocr_text).join("\n");
          const s3Urls = data.map((item) => item.s3_url);
          setOcrResult(ocrTexts);
          setS3Result(s3Urls.join("\n"));
          setS3Urls(s3Urls);
        } else {
          console.error("Error: Expected an array but got:", data);
        }
        localStorage.removeItem("capturedImages");
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleGPT = async () => {
    try {
      const response = await axios.post("http://localhost:5000/gpt_response", {
        text: ocrResult,
        s3_urls: s3Urls,
      });

      setGptResult(response.data.gpt_response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [isDivVisible, setIsDivVisible] = useState(true);
  const [generateOCR, setGenerateOCR] = useState(false);
  const handleButtonClick = () => {
    // handleOCR();
    setIsDivVisible(false);
    setGenerateOCR(true);
  };

  return (
    <>
      <div
        className="col d-flex justify-content-between"
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
        <Stack style={{ marginTop: "30px" }}>
          <div
            style={{
              backgroundColor: "#9d9d9d",
              border: "none",
              height: "120.5px",
            }}
          >
            {isDivVisible && (
              <IoMdClose
                onClick={deleteImage}
                style={{
                  fontSize: "20px",
                  color: "#ffffff",
                  marginLeft: "15px",
                  marginTop: "15px",
                }}
              />
            )}
          </div>
          <div className="captured_image d-flex align-items-center">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                style={{ width: "100%", height: "218px" }}
              />
            ) : (
              <img
                src={latestImage}
                alt="Latest Captured"
                style={{ width: "100%", height: "218px" }}
              />
            )}
          </div>
          <div
            className="justify-content-end d-flex"
            style={{
              paddingTop: "75px",
              fontSize: "20px",
              paddingRight: "20px",
              backgroundColor: "#9d9d9d",
              height: "120.5px",
            }}
          >
            <NavLink to={ROUTES.SCAN_PAGE}>
              <FaCamera style={{ color: "#FFFFFF" }} />
            </NavLink>
          </div>
        </Stack>
        {(getImages && getImages.length > 0) ||
        (latestImage && latestImage.length > 0) ? (
          <>
            <div className="d-flex gap-2 pics">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                {latestImage.map((imgs, idex) => (
                  <img
                    key={idex}
                    src={imgs}
                    alt="Latest Captured"
                    // onClick={() => SelectImage()}
                    onClick={() => SelectImage(imgs)}
                    style={{
                      cursor: "pointer",
                      width: "80px",
                      height: "80px",
                      border: "2px solid #5B5555",
                    }}
                  />
                ))}
              </div>
              {getImages.map((item, index) => {
                if (item.length < 3) {
                  return <div key={index}>Invalid data format</div>;
                }
                return (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      display: "flex",
                      marginTop: "10px",
                    }}
                  >
                    {item[1].split(",").map((location, idx) => (
                      <img
                        key={idx}
                        // src={item}
                        src={location.trim()}
                        // alt={`Image ${index}`}
                        alt={`Image-${index}-${idx}`}
                        onClick={() => SelectImage(location)}
                        style={{
                          cursor: "pointer",
                          width: "80px",
                          height: "80px",
                          border: "2px solid #5B5555",
                        }}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          ""
        )}
        <div>
          {/* <NavLink to={ROUTES.GENERATE_OCR}> */}
          <Button
            type="button"
            // onClick={handleButtonClick}
            onClick={() => {
              handleButtonClick();
              handleOCR();
            }}
            className="OCR_button mb-2"
          >
            Generate OCR <GoArrowRight />
          </Button>
          {/* </NavLink> */}
        </div>
        {generateOCR && (
          <>
            <div>
              {/* {pairs.map((pair, index) => (
                <div key={index} className="d-flex">
                  <div className="col-4">{pair.label}</div>{" "}
                  <div>
                    :
                    <span style={{ marginLeft: "4px", color: "#5B5555" }}>
                      {pair.value}
                    </span>
                  </div>
                </div>
              ))} */}
              {ocrResult}
            </div>
            <div className="mb-2">
              <Button
                type="button"
                className="OCR_button"
                onClick={handleClick}
              >
                Get GPT Response <GoArrowRight />
              </Button>
            </div>
          </>
        )}

        {getGptResponse && (
          <>
            <div style={{ color: "#5b5555" }}>{gptResult}</div>
            <div>
              <Button
                className="save_business_btn my-3"
                type="button"
                onClick={handleShow}
              >
                Save this business
              </Button>
            </div>
          </>
        )}
      </div>
      {/* #### modal #### */}

      <Modal
        show={show}
        onHide={handleClose}
        centered
        dialogClassName="business_modal"
      >
        <Modal.Header>
          <Button variant="link" onClick={handleClose} className="close-btn">
            <IoIosCloseCircle />
          </Button>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <Form>
            <Form.Group>
              <Form.Label className="modal_inputLabel">
                Enter your business name
              </Form.Label>
              <Form.Control
                size="md"
                className="modal_input"
                type="text"
                placeholder="Enter your business name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "0 none" }}>
          <Button className="modal_cancelBtn" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="modal_submitBtn"
            onClick={handleClose}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
