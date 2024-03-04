import React, { useEffect, useState } from "react";
import { fetchAssetPlatforms } from "../api/cryptoAPI";
import styles from "../styles/assetPlatforms.module.css";
import { Container } from "react-bootstrap";

export const AssetPlatforms = () => {
  const [totalPlatforms, setTotalPlatforms] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [searchPlatform, setSearchPlatform] = useState("");
  const [isSearchValid, setIsSearchValid] = useState(true);

  const pageSize = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAssetPlatforms(page);
      if (data.length === 0 || data.length < pageSize) {
        setLoadMore(false);
      }

      setTotalPlatforms(data);
      setPlatforms(data);
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
    setSearchPlatform(searchTerm);

    if (searchTerm === "") {
      setPlatforms(totalPlatforms);
      setIsSearchValid(true);
    } else {
      const filtered = totalPlatforms.filter((platform) =>
        platform.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPlatforms(filtered);
      setIsSearchValid(filtered.length > 0);
    }
  };

  const paginatedPlatforms = platforms.slice(0, pageSize * page);

  return (
    <Container>
      <h1 className={styles.title}>Asset Platforms</h1>
      <div className={styles.searchWrapper}>
        <p className={styles.searchTitle}>Choose your platform:</p>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search Asset Platforms"
          value={searchPlatform}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.listWrapper}>
        <ul>
          {paginatedPlatforms.map((platform) => (
            <li key={platform.id}>{platform.name}</li>
          ))}
        </ul>
      </div>
      {isLoading && <p>Loading more platforms...</p>}
      {!isLoading &&
        searchPlatform === "" &&
        paginatedPlatforms.length === platforms.length && (
          <p className={styles.infoText}>No more platforms to load.</p>
        )}
      <div className={styles.btnWrapper}>
        {!isLoading &&
          loadMore &&
          paginatedPlatforms.length !== platforms.length && (
            <button
              className="btn btn-sm btn-success m-1"
              onClick={loadNext}
              disabled={isLoading}
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
      </div>
    </Container>
  );
};
