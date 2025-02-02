import React, { useState } from "react";
import styles from "./Products.module.scss";
import { TextField } from "@mui/material";
import { categories, products } from "../../data/data";
import Product from "../../components/product/Product";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // * Compute categories with product counts
  const displayedCategories = categories.map((category) => ({
    categoryId: category.id,
    name: category.name,
    productsQuantity: products.filter(
      (product) => product.categoryId === category.id
    ).length,
  }));

  // * Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.categoryId === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1>Products</h1>
        </div>

        <div className={styles.productsContainer}>
          <div className={styles.products}>
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>

          <div className={styles.filters}>
            <TextField
              placeholder="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className={styles.categories}>
              <h2>Categories</h2>
              <ul>
                <li
                  onClick={() => setSelectedCategory(null)}
                  className={!selectedCategory ? styles.active : ""}
                >
                  <div>
                    <i className="fi fi-rr-burger-alt" />
                    <p>All Categories</p>
                  </div>
                  <p>{`(${products?.length})`}</p>
                </li>
                {displayedCategories.map(
                  ({ categoryId, name, productsQuantity }) => (
                    <li
                      key={categoryId}
                      onClick={() => setSelectedCategory(categoryId)}
                      className={
                        selectedCategory === categoryId ? styles.active : ""
                      }
                    >
                      <div>
                        <i className="fi fi-rr-burger-alt" />
                        <p>{name}</p>
                      </div>
                      <p>({productsQuantity})</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
