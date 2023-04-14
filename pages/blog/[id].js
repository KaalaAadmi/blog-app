import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import dbConnect from "./../../lib/dbConnect";
import Blog from "../../models/Blog";
import Chip from "./../../components/Chip/Chip";
import styles from "../../styles/Blog.module.css";
import EmptyList from "./../../components/EmptyList/EmptyList";
import Footer from "./../../components/Footer/Footer";
import FAB from "./../../components/FAB/FAB";

const BlogPage = ({ blog }) => {
  return (
    <>
      <div style={{ padding: "1rem 0", margin: "0 auto", width: "95%" }}>
        <Link href="/" as="/" className={styles.blog__goBack}>
          <span>
            <FaArrowLeft />
          </span>{" "}
          <div className={styles.header__goBack_words}>Go Back</div>
        </Link>
        {blog ? (
          <div className={styles.blog__wrap}>
            <header className={styles.blog__header}>
              <p className={styles.blog__date}>
                Published {format(parseISO(blog.createdAt), "dd MMM, yyyy")}
              </p>
              <h1 style={{ color: "#264653" }}>{blog.title}</h1>
              <div className={styles.blog__subCategory}>
                {blog.subCategory.map((category, index) => (
                  <div className={styles.subcategory__inner}>
                    <Chip key={index} label={category} />
                  </div>
                ))}
              </div>
            </header>
            <Image
              sizes="fill"
              width={300}
              height={300}
              src={blog.cover}
              alt="cover"
              className={styles.cover}
            />
            <div className={styles.blog__description}>{blog.description}</div>
            {blog.sections.map((section, index) => {
              if (section.sectionType === "title") {
                return (
                  <h1 style={{ color: "#264653" }} key={section._id}>
                    {section.sectionText}
                  </h1>
                );
              } else if (section.sectionType === "image") {
                return (
                  <Image
                    sizes="fill"
                    height={300}
                    width={300}
                    className={styles.cover}
                    key={section._id}
                    src={section.sectionText}
                    alt={section.sectionCaption}
                  />
                );
              } else if (section.sectionType === "text") {
                return (
                  <p
                    className={styles.blog__description_text}
                    key={section._id}
                    style={{ color: "#264653" }}
                  >
                    {section.sectionText}
                  </p>
                );
              } else if (section.sectionType === "link") {
                return (
                  <h3>
                    <a
                      className={styles.blogSection__link}
                      target="_blank"
                      rel="noreferrer"
                      href={section.sectionLink}
                      style={{ color: "#fb8500" }}
                    >
                      <FaAngleRight />
                      <FaAngleRight />
                      {section.sectionText}
                      <FaAngleLeft />
                      <FaAngleLeft />
                    </a>
                  </h3>
                );
              }
            })}
          </div>
        ) : (
          <EmptyList />
        )}
        <FAB />
        {/* <Test/> */}
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;

export async function getServerSideProps({ params }) {
  await dbConnect();
  const count = await Blog.countDocuments({ _id: params.id });

  if (count > 0) {
    const blog = await Blog.findById(params.id).lean();
    const blogPost = JSON.parse(JSON.stringify(blog));
    return { props: { blog: blogPost } };
  } else {
    return { props: { blog: null } };
  }
}
