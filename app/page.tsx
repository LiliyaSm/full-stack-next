import styles from "./page.module.css";
import { LoginButton, RegisterButton } from "@/components/buttons";

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginButton />
      <RegisterButton />
    </main>
  );
}
