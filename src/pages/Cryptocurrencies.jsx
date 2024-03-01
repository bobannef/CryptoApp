import React, { useEffect, useState } from "react";
import { fetchCoins } from "../api/cryptoAPI";
import { Row, Col, Container } from "react-bootstrap";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { CryptocurrencyCard } from "../components/CryptocurrencyCard";
import styles from "../styles/cryptos.module.css";

export const Cryptocurrencies = () => {
  const [totalCoins, setTotalCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [searchCoin, setSearchCoin] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [savedCoins, setSavedCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCoins();
      if (data.length === 0 || data.length < pageSize) {
        setLoadMore(false);
      }
      // console.log(data);
      setTotalCoins(data);
      setCoins(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNext = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchCoin(searchTerm);
    setPage(1);

    if (searchTerm === "") {
      setCoins(totalCoins);
    } else {
      const filtered = totalCoins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCoins(filtered);
      setSortingOrder();
    }
  };

  const handleSort = () => {
    const sortedCoins = [...coins].sort((a, b) => {
      if (sortingOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setCoins(sortedCoins);
    setSortingOrder(sortingOrder === "asc" ? "desc" : "asc");
  };

  const handleFilter = () => {
    const filtered = coins.filter((coin) => {
      return coin.current_price >= minPrice && coin.current_price <= maxPrice;
    });
    setCoins(filtered);
  };

  const handleSave = (coinId) => {
    const coinToSave = coins.find((coin) => coin.id === coinId);
    setSelectedCoin(coinToSave);
    setShowModal(true);
  };

  const handleConfirmSave = () => {
    if (selectedCoin) {
      if (savedCoins.find((savedCoin) => savedCoin.id === selectedCoin.id)) {
        alert("Coin already saved!");
      } else {
        const updatedCoins = [...savedCoins, selectedCoin];
        setSavedCoins(updatedCoins);
        localStorage.setItem("savedCoins", JSON.stringify(updatedCoins));
        alert("Coin saved successfully!");
      }
    }
    setShowModal(false);
  };

  const paginatedCoins = coins.slice(0, pageSize * page);

  return (
    <Container>
      <h1 className="text-dark mb-5 text-center">Cryptocurrencies</h1>
      <div className={styles.searchWrapper}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Cryptocurrencies"
          value={searchCoin}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.priceWrapper}>
        <input
          className={styles.priceInput}
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
        />
        <input
          className={styles.priceInput}
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
        />
        <button
          onClick={handleFilter}
          className="btn btn-secondary text-white font-weight-bold"
        >
          Price Filter
        </button>
        <button
          onClick={handleSort}
          className="btn btn-info text-white font-weight-bold"
        >
          Sort {sortingOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>

      <Row xs={1} md={2} lg={3} xl={4} className="g-3">
        {paginatedCoins.map((coin) => (
          <Col key={coin.id}>
            <CryptocurrencyCard
              coin={coin}
              handleSave={() => handleSave(coin.id)}
            />
          </Col>
        ))}
      </Row>

      {isLoading && <p>Loading more coins...</p>}
      {!isLoading && paginatedCoins.length === coins.length && (
        <p className={styles.infoText}>No more coins to load.</p>
      )}
      <div className={styles.btnWrapper}>
        {!isLoading && loadMore && paginatedCoins.length !== coins.length && (
          <button
            onClick={loadNext}
            disabled={isLoading}
            className="btn btn-sm btn-success m-1"
          >
            Load more
          </button>
        )}
        <button
          className="btn btn-sm btn-primary m-1"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Scroll to Top
        </button>
        <ConfirmationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmSave}
        />
      </div>
    </Container>
  );
};
