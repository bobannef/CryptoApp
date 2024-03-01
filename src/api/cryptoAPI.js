import React from "react";

const BASE_URL = "https://api.coingecko.com/api/v3/";

export const fetchCryptos = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}coins/markets?vs_currency=usd&x_cg_demo_api_key=CG-Ltv92JAz3YQk5XkcY8ovxf6w&per_page=10&page=1&sparkline=false`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchAssetPlatforms = async (page) => {
  const pageSize = 10;
  try {
    const response = await fetch(
      `${BASE_URL}asset_platforms?vs_currency=usd&x_cg_demo_api_key=CG-Ltv92JAz3YQk5XkcY8ovxf6w&per_page=${pageSize}&page=${page}&sparkline=false`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchCoins = async () => {
  const pageSize = 10;
  try {
    const response = await fetch(
      `${BASE_URL}coins/markets?vs_currency=usd&x_cg_demo_api_key=CG-Ltv92JAz3YQk5XkcY8ovxf6w`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
