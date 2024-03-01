import React, { useEffect, useState } from "react";
import { fetchCryptos } from "../api/cryptoAPI";
import { Container, Table } from "react-bootstrap";

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
    <Container>
      <h1 className="text-center mb-5 text-dark">Top 10 cryptocurrencies</h1>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {topCryptos.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>{crypto.name}</td>
                <td>{crypto.current_price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};
