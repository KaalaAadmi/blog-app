import React, { useState } from "react";
import styles from "../../styles/Footer.module.css";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Wave from "react-wavify";
import axios from "axios";
import NewsLetter from './../NewsLetter/NewsLetter';

const Footer = () => {
  return (
    <>
      <Wave
        fill="#264653"
        paused={false}
        options={{
          height: 65,
          amplitude: 40,
          speed: 0.25,
          points: 4,
        }}
      />
      <NewsLetter/>
      <div className={styles.footer}>
        <ul className={styles.social_icons}>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/the.fellow.weeb/"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/channel/UCaMmn3f2iRxJZ-HZeiaaE-g/subscribe"
            >
              <FaYoutube />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/thefellowweeb/"
            >
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/The_FellowWeeb"
            >
              <FaTwitter />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Footer;
