"use client";
import { useState, useEffect, useContext } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./dropdown.css";
import { ResponseContext } from "@/app/login/ResponseContext";
import Slider from "@mui/material/Slider";
import { useSearchParams } from "next/navigation";

export default function Dropdown() {
  const { filters, setFilters } = useContext(ResponseContext);
  const [loading, setLoading] = useState();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  // console.log(category, "cateeeee..,..,")
  // console.log(filters, "filters pro..,,,,.,.,")

  const [showAllCategories, setShowAllCategories] = useState(false);

  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [filterByPrice, setFilterByPrice] = useState(true);
  const [filterByColor, setFilterByColor] = useState(true);
  const [filterBySize, setFilterBySize] = useState(true);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    category || "Electronic"
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("S");
  const [priceRange, setPriceRange] = useState([20, 10000]);

  const colors = [
    { name: "Red", code: "#f41c1c" },
    { name: "Blue", code: "#3c34d5" },
    { name: "Green", code: "#007137" },
    { name: "Black", code: "#000000" },
    { name: "Purple", code: "#c12ec8" },
  ];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}api/front/categories`);
        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Update filters and trigger API call when selected filters change
  const [hasInitializedFromUrl, setHasInitializedFromUrl] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const category_name =
      params.get("category_name") || category || "Electronic";
    const color = params.get("color") || "";
    const size = params.get("size") || "S";
    const min_price = parseInt(params.get("min_price") || 20);
    const max_price = parseInt(params.get("max_price") || 10000);

    setSelectedCategory(category_name);
    setSelectedColor(color);
    setSelectedSize(size);
    setPriceRange([min_price, max_price]);
    setHasInitializedFromUrl(true); // ✅ Set flag to true when done
  }, []);

  useEffect(() => {
    if (!hasInitializedFromUrl) return;

    const updatedFilters = {
      category_name: selectedCategory || category || "Electronic",
      color: selectedColor,
      size: selectedSize,
      min_price: priceRange[0],
      max_price: priceRange[1],
    };

    setFilters(updatedFilters);

    const queryParams = new URLSearchParams(updatedFilters).toString();
    window.history.pushState({}, "", `?${queryParams}`);
  }, [
    selectedCategory,
    selectedColor,
    selectedSize,
    priceRange,
    hasInitializedFromUrl,
  ]);

  return (
    <div className="Product_Categories">
      {/* Category Filter */}
      <div
        className="heading_icon"
        onClick={() => setCategoriesOpen(!categoriesOpen)}
      >
        <h3>Product Categories</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>

      {categoriesOpen && (
        <ul>
          {loading
            ? // Show 10 skeleton items while loading
              [...Array(10)].map((_, index) => (
                <li key={index}>
                  <div
                    className="skeleton-line"
                    style={{
                      height: "18px",
                      width: "80%",
                      borderRadius: "4px",
                      marginBottom: "8px",
                      background: "#e0e0e0",
                    }}
                  ></div>
                </li>
              ))
            : (showAllCategories ? categories : categories.slice(0, 10)).map(
                (category) => (
                  <li key={category.id}>
                    <input
                      type="radio"
                      id={category.name}
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => setSelectedCategory(category.name)}
                    />
                    <label htmlFor={category.name}>{category.name}</label>
                  </li>
                )
              )}

          {categories.length > 10 && (
            <button
              className=""
              style={{
                margin: "0px",
                border: "none",
                background: "transparent",
                textDecoration: "underline",
              }}
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? "See Less" : "See More"}
            </button>
          )}
        </ul>
      )}

      {/* Price Filter */}
      <div
        className="heading_icon"
        onClick={() => setFilterByPrice(!filterByPrice)}
      >
        <h3>Filter by Price</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>
      {/* {filterByPrice && (
        <div className="slider-container">
          <div className="slider-value">Price: ${priceRange[0]} - ${priceRange[1]}</div>
          <Slider
            className="custom-slider"
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </div>
      )} */}
      {filterByPrice && (
        <div className="slider-container">
          <div className="slider-value">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </div>
          <Slider
            className="custom-slider"
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)} // Just update local state
            onChangeCommitted={(_, newValue) => {
              setPriceRange(newValue);
              setFilters((prev) => ({
                ...prev,
                min_price: newValue[0],
                max_price: newValue[1],
              }));
            }}
            valueLabelDisplay="auto"
            min={20}
            max={10000}
          />
        </div>
      )}

      {/* Color Filter */}
      <div
        className="heading_icon"
        onClick={() => setFilterByColor(!filterByColor)}
      >
        <h3>Filter by Color</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>
      {filterByColor && (
        <ul>
          {colors.map((color) => (
            <li key={color.code}>
              <input
                type="radio"
                id={color.code}
                name="color"
                checked={selectedColor === color.code}
                onChange={() => setSelectedColor(color.code)} // set the color code in state
              />
              <label htmlFor={color.code}>{color.name}</label>{" "}
              {/* show readable name */}
            </li>
          ))}
        </ul>
      )}

      {/* Size Filter */}
      <div
        className="heading_icon"
        onClick={() => setFilterBySize(!filterBySize)}
      >
        <h3>Filter by Size</h3>
        <RiArrowDropDownLine className="drop_down_icon" />
      </div>
      {filterBySize && (
        <ul>
          {sizes.map((size) => (
            <li key={size}>
              <input
                type="radio"
                id={size}
                name="size"
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
              />
              <label htmlFor={size}>{size}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
