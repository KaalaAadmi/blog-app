import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import validator from "email-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const NewsLetter = () => {
  const [newsletter, setNewsletter] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.validate(newsletter)) {
      console.log(true);
      const res = await axios.post(
        "https://blog-newsletter-add.onrender.com/newsletter",
        {
          email: newsletter,
        }
      );

      if (res.status === 200) {
        toast.success("Subscribed Successfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else{
        toast.error("Error Occurred, Please try again later!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",})
      }
    } else {
      toast.error("Invalid Email", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#264653",
        marginTop: "-10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <label
        htmlFor="newsletter"
        style={{
          marginBottom: "0.8rem",
          fontSize: "14px",
          color: "#fb8500",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Subscribe to our News Letter:
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          name="newsletter"
          id="newsletter"
          style={{
            height: "fit-content",
            borderRadius: "10px 0 0 0px",
            border: "none",
            outline: "none",
            padding: "12.5px 10px 12.5px 10px",
          }}
          onChange={(e) => setNewsletter(e.target.value)}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#fff",
            border: "none",
            outline: "none",
            padding: "10px 10px 10px 10px",
            borderRadius: "0 10px 0px 0",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          <RiSendPlaneFill color="#264653" size={22} />
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;
