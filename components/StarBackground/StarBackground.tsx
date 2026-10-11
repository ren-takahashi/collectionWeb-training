"use client";

import { useEffect, useRef } from "react";
import styles from "./StarBackground.module.css";

/**
 * 星空背景コンポーネント
 * - 静的なドット（白い四角い点）を150個配置
 * - そのうち約10%をグリント星（十字形）として配置し、ループアニメーションで点滅させる
 * - 各グリント星はランダムなduration/delayでバラバラに点滅する
 */
export default function StarBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const starCount = 150;
    // グリント星同士の最小距離（% 単位）。この値を大きくするほど間隔が広くなる
    const MIN_GLINT_DISTANCE = 13;
    const glintPositions: { left: number; top: number }[] = [];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;

      // まず確率でグリント候補にする
      let isGlint = Math.random() < 0.1;

      // グリント候補のとき、既存グリント星と近すぎる場合は通常の星に格下げする
      if (isGlint) {
        const tooClose = glintPositions.some(
          (pos) =>
            Math.sqrt((pos.left - left) ** 2 + (pos.top - top) ** 2) <
            MIN_GLINT_DISTANCE
        );
        if (tooClose) isGlint = false;
      }

      const star = document.createElement("span");
      star.className = isGlint ? styles.starGlint : styles.star;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;

      if (isGlint) {
        // 確定したグリント星の座標を記録（次の星の距離チェックに使う）
        glintPositions.push({ left, top });
        // 各グリント星のタイミングをバラバラにして「一斉点滅」を防ぐ
        // 0.1秒スタートにするとチカチカ。数値を上げていくとゆっくりな点滅になる。
        // 乗算部分を大きくすると点滅の周期が長くなり、ランダムなずれも大きくなる
        const duration = (0.9 + Math.random() * 1.3).toFixed(1);

        // durationだけランダムにしても、全ての星が同時に点滅してしまうため、
        // delayを定義して各星の点滅開始タイミングをずらす
        const delay = (Math.random() * 5).toFixed(1); // 0〜5秒のずれ
        star.style.animationDuration = `${duration}s`;  
        star.style.animationDelay = `-${delay}s`; // マイナスにしておくことで最初から途中の状態から始まる
      } else {
        // 通常の星は明るさをランダムにして奥行きを出す
        star.style.opacity = `${(0.3 + Math.random() * 0.7).toFixed(2)}`;
        const size = Math.random() < 0.7 ? "1px" : "2px";
        star.style.width = size;
        star.style.height = size;
      }

      fragment.appendChild(star);
    }

    container.appendChild(fragment);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container} aria-hidden="true" />
  );
}
