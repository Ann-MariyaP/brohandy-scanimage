
import React, { useRef, useEffect, useState,useCallback } from "react";
import axios from "axios";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/display");
        const data = response.data;

        if (Array.isArray(data)) {
          setData(data);
        } else {
          throw new Error("Data is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div id="results">
      {data.map((item, index) => {
        // Ensure item has at least 3 elements
        // if (item.length < 3) {
        //   return <div key={index}>Invalid data format</div>;
        // }

        return (
          <div key={index} className="card">
            {/* Image locations */}
            {item[1].split(",").map((location, idx) => (
              console.log("iii",location),
              <img
                key={idx}
                src={location.trim()} // Ensure there are no leading/trailing spaces
                alt={`img-${index}-${idx}`}
              />
            ))}

            {/* Text from the third column (OCR text) */}
            <pre>{item[2]}</pre>

            {/* Text from the first column (GPT response) */}
            <div>
              {item[0]
                .replace(/\\n/g, "\n")
                .replace(/\\/g, "")
                .split("\n")
                .map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataDisplay;

// import "./generateOCR.scss";
// import DisplaySavedImage from "../image_saved_page/image_saved_page";

// import Form from "react-bootstrap/Form";
// import Webcam from "react-webcam";

// const FACING_MODE_USER = "user";
// const FACING_MODE_ENVIRONMENT = "environment";

// const videoConstraints = {
//   facingMode: FACING_MODE_USER,
// };

  
    // const [message, setMessage] = useState("");
    // const getImagesData = () => {
    //   axios
    //     .get("http://127.0.0.1:5000/test")
    //     .then(function (response) {
    //       console.log("image data:", response.message);
    //       setMessage(response.message);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };

    // useEffect(() => {
    //   getImagesData()
    // }, []);

  // const [isVisible, setIsVisible] = useState(false);
  // const handleClick = () => {
  //   setIsVisible(!isVisible);
  // };

  // const pairs = [
  //   { label: "Name", value: "Cardoc" },
  //   { label: "Email", value: "cardocspa@gmail.com" },
  //   { label: "Country Code", value: "91" },
  //  
  // ];

  // return (
  //   <>
  //     <div className="row mt-5">
        
        {/* <button onClick={handleClick} style={{ width: "50px" }}>
          Switch camera
        </button> */}
       
       
        
      // </div>
      {/* <DisplaySavedImage />
      <div className=" generate_ocr_container">
        <div>
          {pairs.map((pair, index) => (
            <div key={index} className="d-flex">
              <div className="col-4">{pair.label}</div>{" "}
              <div>
                :<span style={{ marginLeft: "4px",color:"#5B5555" }}>{pair.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-2">
          <button
            type="button"
            className="btn btn-outline-secondary OCR_button"
            onClick={handleClick}
          >
            {isVisible ? "" : ""}
            Get GPT Response <GoArrowRight />
          </button>
        </div>
        {isVisible && (
          <>
            <div style={{color:"#5b5555"}}>
              Lorem ipsum
            </div>
            <div>
              <button
                className="btn btn-primary save_business_btn my-3"
                type="button"
                onClick={handleShow}
              >
                Save this business
              </button>
            </div>
          </>
        )}
      </div>
           
//     </>
//   );
// } */}



// const ImageGallery = () => {
//   const [imageUrls, setImageUrls] = useState([]);
//   const apiResponse = [
//     [
//       [1, "https://example.com/image1.jpg, https://example.com/image2.jpg"],
//       [2, "https://example.com/image3.jpg"],
//     ],
   
//   ];

//   // Extract image URLs from index 1 of each nested array where item[0] === 1
//   const urls = apiResponse.flatMap((array) =>
//     array.map((item) => {
//       if (item.length > 1 && item[0] === 1) {
//         const [, ...imageUrls] = item[1].split(",").map((url) => url.trim());
//         return imageUrls;
//       }
//       return [];
//     })
//   );



//   return (
//    <>
//    </>

//   )}
// export default ImageGallery;
