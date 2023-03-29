import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import Header from "./../components/Header/Header";
import SearchBar from "./../components/SearchBar/SearchBar";
import BlogList from "./../components/BlogList/BlogList";
import EmptyList from "./../components/EmptyList/EmptyList";
import Footer from "./../components/Footer/Footer";
import dbConnect from "./../lib/dbConnect";
import Blog from "../models/Blog";
import styles from "../styles/Home.module.css";
import Script from "next/script";

export default function Home({ allBlogPosts }) {
  const [blogs, setBlogs] = useState(allBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  // Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearchResults();
  };
  // search for blogs by category
  const handleSearchResults = () => {
    const allBlogs = blogs;
    const filteredBlogs = allBlogs.filter((blogposts) =>
      blogposts.category.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  const handleClearSearch = () => {
    setBlogs(allBlogPosts);
    setSearchTerm("");
    // window.location.reload(true);
  };
  // console.log(blogs.length);
  return (
    <>
      <Head>
        <title>The Fellow Weeb</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="description"
          content="With my anime and manga blog, you'll never run out of things to watch, read, and learn about."
        />
        <meta
          name="description"
          content="Explore the world of anime and manga with our in-depth reviews, news, and analysis."
        />
        <meta
          name="description"
          content="Get your anime and manga fix with our comprehensive blog, featuring the latest news and trends."
        />
        <meta
          name="description"
          content="Join our community of fellow otaku and discover the best anime and manga content on the web."
        />
        <meta
          name="description"
          content="From classic series to the latest releases, our anime and manga blog has everything you need to stay up-to-date."
        />
        <meta
          name="description"
          content="Dive into the fascinating world of anime and manga with our engaging and informative blog posts."
        />
        <meta
          name="description"
          content="Discover new favorites and old classics alike on our anime and manga blog, written by passionate fans for passionate fans."
        />
        <meta
          name="description"
          content="Whether you're a die-hard fan or just starting out, our anime and manga blog has something for everyone."
        />
        <meta
          name="description"
          content="Join us on a journey through the vibrant and ever-evolving world of anime and manga, filled with surprises and delights."
        />
        <meta
          name="description"
          content="From insightful analysis to fun trivia, our anime and manga blog is your ultimate destination for all things otaku."
        />
        <meta
          name="description"
          content="Get your daily dose of anime and manga reviews, news, and analysis from our passionate team of otaku. Join us on a journey through the fascinating world of anime!"
        />
        <meta
          property="og:title"
          content="The Fellow Weeb - Your Ultimate Source for Anime and Manga Reviews"
        />
        <meta
          property="og:description"
          content="Get your daily dose of anime and manga reviews, news, and analysis from our passionate team of otaku. Join us on a journey through the fascinating world of anime!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      
              window.dataLayer = window.dataLayer || [];
              function gtag() {dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}',{
                page_path:window.location.pathname,
              });`,
        }}
      />
      <main className={styles.container}>
        {/* Page Header */}
        <Header />
        {/* Search Bar */}
        <SearchBar
          value={searchTerm}
          clearSearch={handleClearSearch}
          formSubmit={handleSearchSubmit}
          handleSearchKey={(e) => setSearchTerm(e.target.value)}
        />
        {/* Blog List and Empty List */}
        {blogs.length > 0 ? <BlogList blogs={blogs} /> : <EmptyList />}
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const blogs = await Blog.find({}).lean();
  const allBlogPosts = JSON.parse(JSON.stringify(blogs));
  return { props: { allBlogPosts } };
}
