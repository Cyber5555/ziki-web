import React from "react";
import styles from "./taskModal.module.css";
import Fancybox from "../Fancybox/Fancybox";

const Galleries = ({ galleries = [] }) => {
  return (
    <Fancybox>
      {galleries.map((gallery, index) => (
        <div key={index} className={styles.Galleries__items}>
          <img
            src={gallery.url}
            alt={gallery.url}
            className={styles.Galleries__image}
            data-fancybox="gallery"
          />
        </div>
      ))}
    </Fancybox>
  );
};

export default Galleries;
