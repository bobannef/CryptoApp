import React, { useState } from "react";
import { Card, Button, Accordion } from "react-bootstrap";

export const CryptocurrencyCard = ({ coin, handleSave }) => {
  return (
    <Card style={{ marginBottom: "2rem" }}>
      <Card.Img
        variant="top"
        src={coin.image}
        alt={coin.name}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Card.Body>
        <Card.Title>{coin.name}</Card.Title>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Coin Details</Accordion.Header>
            <Accordion.Body>
              <p>
                <strong>Current Price:</strong> {coin.current_price}
              </p>
              <p>
                <strong>Market Cap: </strong> {coin.market_cap}
              </p>
              <Button onClick={() => handleSave(coin.id)}>Save</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};
