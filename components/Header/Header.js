import React from "react";
import styles from "../../styles/Header.module.css";

const Header = () => (
  <header className={styles.home__header}>
    <h2>The Best Place to Geek Out on Anime:</h2>
    <h1>
      <span>“</span> The Fellow Weeb <span>”</span>
    </h1>
    <p>
    ~ Your Ultimate Otaku Hub
      {/* The Fellow Weeb is your ultimate source for anime <br/> and manga reviews, news,
      and analysis, <br />
      providing a fascinating journey through the captivating world of anime. */}
      {/* awesome place to make oneself <br /> productive and entertained through
      daily updates. */}
    </p>
  </header>
);

export default Header;
