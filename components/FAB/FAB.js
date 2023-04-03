import React, { useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import { BiShareAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const FAB = () => {
  const [open, setOpen] = useState(false);
  const url =
    typeof window !== "undefined" && window.location.href
      ? window.location.href
      : "";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        bottom: "25px",
        right: "25px",
        position: "fixed",
        width: "fit-content",
        alignItems: "flex-end",
        zIndex: 100000000,
      }}
    >
      {open ? (
        <div
          style={{
            // transition: "all 0.5s ease-in-out",
            display: "flex",
            flexDirection: "column",
            
          }}
        >
          <FacebookShareButton
            url={url}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <PinterestShareButton url={url}>
            <PinterestIcon size={40} round />
          </PinterestShareButton>

          <RedditShareButton url={url}>
            <RedditIcon size={40} round />
          </RedditShareButton>

          <WhatsappShareButton url={url}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#fb8500",
            }}
          >
            <IoClose onClick={(e) => setOpen((prev) => !prev)} size={20} style={{color:'#f0f0f0'}}/>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#fb8500",
          }}
        >
          <BiShareAlt
            onClick={(e) => setOpen((prev) => !prev)}
            color="#f0f0f0"
          />
        </div>
      )}
    </div>
  );
};

export default FAB;
