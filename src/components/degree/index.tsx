import styles from "./index.module.scss";

interface DegreeProps {
  degree: string;
  setDegree: (degree: string) => void;
}

export default function Degree({ degree, setDegree }: DegreeProps) {
  return (
    <div className={styles.Degree}>
      <input
        type="checkbox"
        checked={degree === "°F"}
        onChange={() => setDegree(degree === "°F" ? "°C" : "°F")}
      />
      <p>Включить °F ?</p>
    </div>
  );
}
