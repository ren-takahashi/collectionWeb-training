"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ImageGallery.module.css";

type GalleryImage = {
  image_path: string;
  alt_text: string | null;
  display_order: number;
};

type Props = {
  images: GalleryImage[];
  releaseName: string;
};

export default function ImageGallery({ images, releaseName }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 画像が1枚もない場合は NO IMAGE を表示
  if (images.length === 0) {
    return (
      <div className={styles.noImage}>
        <span className={styles.noImageText}>NO IMAGE</span>
      </div>
    );
  }

  const selected = images[selectedIndex];
  const altText = selected.alt_text ?? releaseName;

  return (
    <div className={styles.gallery}>
      {/* メイン画像 */}
      <div className={styles.mainImageWrap}>
        <Image
          src={selected.image_path}
          alt={altText}
          width={400}
          height={300}
          className={styles.mainImage}
          priority={selectedIndex === 0}
        />
      </div>

      {/* サムネイル一覧（2枚以上のときのみ表示） */}
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, i) => (
            <button
              key={img.image_path}
              className={`${styles.thumbButton} ${i === selectedIndex ? styles.thumbActive : ""}`}
              onClick={() => setSelectedIndex(i)}
              aria-label={`画像 ${i + 1} を表示`}
              aria-current={i === selectedIndex ? "true" : undefined}
            >
              <Image
                src={img.image_path}
                alt={img.alt_text ?? `${releaseName} 画像${i + 1}`}
                width={80}
                height={60}
                className={styles.thumbImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
