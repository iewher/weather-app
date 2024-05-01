import { DataProps } from "@/app/page";
import json from "../../../data.json";
import styles from "./index.module.scss";

interface SearchProps {
  city: string;
  setCity: (city: string) => void;
  setData: (arg0: DataProps) => void;
}

export default function Search({ city, setCity, setData }: SearchProps) {
  const fetchData = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      fetch(
        json.API_URL +
          `?q=${city}` +
          `&appid=${json.API_KEY}` +
          `&units=metric` +
          `&lang=ru`,
      )
        .then((res) => res.json())
        .then((data) => setData(data));

      setCity("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className={styles.Search} onSubmit={fetchData}>
      <input
        placeholder="Поиск"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </form>
  );
}
