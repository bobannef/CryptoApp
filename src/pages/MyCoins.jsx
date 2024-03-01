import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

export const MyCoins = () => {
  const [savedCoins, setSavedCoins] = useState(() => {
    const savedData = localStorage.getItem("savedCoins");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    const savedData = localStorage.getItem("savedCoins");
    if (savedData) {
      setSavedCoins(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCoins", JSON.stringify(savedCoins));
  }, [savedCoins]);

  const handleDeleteCoin = (coinId) => {
    const filtered = savedCoins.filter((coin) => coin.id !== coinId);
    setSavedCoins(filtered);
  };

  const handleDeleteAll = () => {
    setSavedCoins([]);
  };

  return (
    <Container>
      <h1 className="text-dark mb-5 text-center">My Coins</h1>
      {savedCoins.length === 0 ? (
        <h4>No saved coins yet.</h4>
      ) : (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Current Price</th>
                <th>Market Cap</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {savedCoins.map((coin, index) => (
                <tr key={coin.id}>
                  <td>{index + 1}</td>
                  <td>{coin.name}</td>
                  <td>{coin.current_price}</td>
                  <td>{coin.market_cap}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCoin(coin.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="danger" onClick={handleDeleteAll}>
            Delete All
          </Button>
        </div>
      )}
    </Container>
  );
};
