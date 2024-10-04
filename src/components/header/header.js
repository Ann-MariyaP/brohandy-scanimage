import React from "react";
import "./header.scss";
import { FiMenu } from "react-icons/fi";

export default function Header(){
 return (
   <>
     <div
       className="container-fluid main_header"

     >
       <div
         className="col"
         style={{
           height: "52px",
         }}
       >
         <FiMenu
           style={{ fontSize: "22px", marginTop: "10px", marginLeft: "14px" }}
         />
       </div>
     </div>
   </>
 );
}





