import React from "react";
import styles from "../../../styles/BlogItem.module.css";
import Chip from "../../Chip/Chip";
import Link from "next/link";
import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa";
import { format, parseISO } from "date-fns";

const BlogItem = ({
  blog: {
    _id,
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    category,
    cover,
  },
}) => {
  return (
    <div className={styles.blogItem__wrap}>
      <Link
        href={`/blog/${_id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div>
          <Image sizes="fill" width={300} height={250} src={cover} alt="cover" className={styles.blogItem__cover} />
          <Chip label={category} />
          <h3 className={styles.blogItem__wrap_h3} style={{color:'#264653'}}>{title}</h3>
          <p className={styles.blogItem__desc}>{description}</p>
        </div>
      </Link>
      <footer className={styles.blogItem__wrap_footer}>
        <Link
          href={`/author/about`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles.blogItem__author}>
            <Image
              className={styles.blogItem__author_img}
              src={authorAvatar}
              alt="avatar"
              height={50}
              width={50}
            />
            <div>
              <h6 style={{fontSize:'0.9rem',color:'#2a9d8f'}}>{authorName}</h6>
              <p className={styles.blogItem__author_p}>
                {format(parseISO(createdAt), "dd MMM, yyyy")}
              </p>
            </div>
          </div>
        </Link>
        <Link className={styles.blogItem__link} href={`/blog/${_id}`}>
          <FaArrowRight color="#264653"/>
        </Link>
      </footer>
      {/* </Link> */}
    </div>
  );
};

export default BlogItem;
