import Link from "next/link";
import styles from "./ReleaseNavigation.module.css";

type ReleaseLink = {
  id: number;
  name: string;
};

type Props = {
  prevRelease: ReleaseLink | null;
  nextRelease: ReleaseLink | null;
};

export default function ReleaseNavigation({ prevRelease, nextRelease }: Props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.prev}>
        {prevRelease && (
          <Link href={`/releases/${prevRelease.id}`}>
            ← {prevRelease.name}
          </Link>
        )}
      </div>
      <div className={styles.next}>
        {nextRelease && (
          <Link href={`/releases/${nextRelease.id}`}>
            {nextRelease.name} →
          </Link>
        )}
      </div>
    </nav>
  );
}
