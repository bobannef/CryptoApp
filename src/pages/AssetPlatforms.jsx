import React, { useEffect, useState } from "react";
import { fetchAssetPlatforms } from "../api/cryptoAPI";

export const AssetPlatforms = () => {
  const [totalPlatforms, setTotalPlatforms] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [searchPlatform, setSearchPlatform] = useState("");

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
    setPage(1);

    if (searchTerm === "") {
      setPlatforms(totalPlatforms);
    } else {
      const filtered = totalPlatforms.filter((platform) =>
        platform.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPlatforms(filtered);
    }
  };

  const paginatedPlatforms = platforms.slice(0, pageSize * page);

  return (
    <div>
      <h1>Asset Platforms</h1>
      <input
        type="text"
        placeholder="Search Asset Platforms"
        value={searchPlatform}
        onChange={handleSearch}
      />
      <ul>
        {paginatedPlatforms.map((platform) => (
          <li key={platform.id}>{platform.name}</li>
        ))}
      </ul>
      {isLoading && <p>Loading more platforms...</p>}
      {!isLoading && paginatedPlatforms.length === platforms.length && (
        <p>No more platforms to load.</p>
      )}
      {!isLoading &&
        loadMore &&
        paginatedPlatforms.length !== platforms.length && (
          <button onClick={loadNext} disabled={isLoading}>
            Load more
          </button>
        )}
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Scroll to Top
      </button>
    </div>
  );
};
