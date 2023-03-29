import React from "react";
import styles from "../../styles/EmptyList.module.css"
import Image  from 'next/image';

const EmptyList = () => {
  return (
    <div className={styles.emptyList__wrap}>
      <Image className={styles.emptyList__wrap_img} width={500} height={250} src="/empty.gif" alt="empty" />
    </div>
  );
};

export default EmptyList;
