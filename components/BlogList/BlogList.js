import React from "react";
import Link from "next/link";
import BlogItem from "./BlogItem/BlogItem";
import styles from "../../styles/BlogList.module.css";

const BlogList = ({ blogs }) => {
  return (
    <div className={styles.blogList__wrap}>
      {blogs.map((blog) => (
          <BlogItem blog={blog} key={blog._id} />
      ))}
    </div>
  );
};

export default BlogList;
