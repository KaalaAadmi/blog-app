import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../../styles/About.module.css";
import Footer from "./../../components/Footer/Footer";

const about = () => {
  return (
    <div>
      <div style={{ padding: "1rem 0", margin: "0 auto", width: "95%" }}>
        <Link href="/" as="/" className={styles.blog__goBack}>
          <span>
            <FaArrowLeft />
          </span>{" "}
          <div className={styles.header__goBack_words}> Home </div>
        </Link>
        <div className={styles.about}>
          <div className={styles.content}>
            <img className={styles.image} src="/logo.png" alt="logo" />
            <div className={styles.text}>
              <h1 className={styles.title}>About</h1>
              <h5 className={styles.highlight}>Anime & Manga Enthusiast</h5>
              <p className={styles.paragraph}>
                Welcome to "The Fellow Weeb," your ultimate source for anime and
                manga reviews, news, and analysis. We are a community of
                passionate anime fans who love to geek out on the latest anime
                trends, news, and culture.
              </p>

              <p className={styles.paragraph}>
                At "The Fellow Weeb," we are committed to providing our readers
                with the highest quality content on anime and manga. Our mission
                is to create a platform where fans can connect with each other,
                share their thoughts and opinions, and learn more about the
                fascinating world of anime.
              </p>

              <p className={styles.paragraph}>
                Our team of experienced writers and editors are dedicated to
                delivering in-depth analysis, reviews, and news on the latest
                anime releases, classic titles, and hidden gems. We also provide
                coverage on anime conventions, cosplay, fan art, and more.
              </p>

              <p className={styles.paragraph}>
                We believe that anime is more than just entertainment; it's a
                culture that celebrates creativity, diversity, and passion. Our
                goal is to create a welcoming and inclusive space where fans
                from all backgrounds can come together and celebrate their love
                for anime.
              </p>

              <p className={styles.paragraph}>
                If you're a fellow weeb who loves all things anime and manga,
                then "The Fellow Weeb" is the perfect blog for you. Join our
                community today and stay up-to-date on the latest anime news,
                reviews, and analysis. Don't forget to subscribe to our
                newsletter and follow us on social media to never miss an
                update.
              </p>

              <p className={styles.paragraph}>
                Thank you for visiting "The Fellow Weeb." We look forward to
                sharing our love for anime with you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
