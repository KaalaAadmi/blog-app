import React from "react";
import Link from "next/link";
import BlogItem from "./BlogItem/BlogItem";
import styles from "../../styles/BlogList.module.css";

const BlogList = ({ blogs }) => {
  return (
    <div className={styles.blogList__wrap}>
      {blogs.map((blog) => (
        // <Link
        //   // href="/blog/[id]"
        //   key={blog._id}
        //   href={`/blog/${blog._id}`}
        //   style={{ textDecoration: "none", color: "inherit" }}
        // >
          <BlogItem blog={blog} key={blog._id} />
        // </Link>
      ))}
    </div>
  );
};

export default BlogList;
