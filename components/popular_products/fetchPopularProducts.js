export const fetchPopularProducts = async () => {
    try {
      const response = await fetch("https://foundation.alphalive.pro/api/front/popular-products");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
      throw new Error(error.message);
    }
  };
  