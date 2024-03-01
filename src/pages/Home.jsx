import React, { useEffect, useState } from "react";
import { fetchCryptos } from "../api/cryptoAPI";

export const Home = () => {
  const [topCryptos, setTopCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const data = await fetchCryptos();
        setTopCryptos(data);
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div>
      <ul>
        {topCryptos.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} - ${crypto.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};
