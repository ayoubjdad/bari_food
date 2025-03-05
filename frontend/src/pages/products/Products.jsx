import React, { useState, useEffect, useMemo } from "react";
import styles from "./Products.module.scss";
import { TextField } from "@mui/material";
import { categories, products } from "../../data/data";
import Product from "../../components/product/Product";
import PageHeader from "../../components/page-header/PageHeader";
import { useParams } from "react-router";

export default function Products() {
  const { slug } = useParams();
  const category = categories.find((category) => category.slug === slug); // Trouver la catégorie correspondante

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    category ? category.id : null
  );

  // * Mettre à jour la catégorie sélectionnée si le slug change
  useEffect(() => {
    setSelectedCategory(category ? category.id : null);
  }, [category]);

  // * Calculer les catégories avec le nombre de produits
  const displayedCategories = categories.map((category) => ({
    categoryId: category.id,
    name: category.name,
    productsQuantity: products.filter(
      (product) => product.categoryId === category.id
    ).length,
  }));

  // * Filtrer les produits basés sur la recherche et la catégorie sélectionnée
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.categoryId === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const cat = useMemo(
    () => categories.find((categ) => categ.id === selectedCategory),
    [selectedCategory]
  );

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader
          title={`Produits${selectedCategory ? " / " + cat.name : ""}`}
        />

        <div className={styles.productsContainer}>
          <div className={styles.products}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              <p>Aucun produit trouvé.</p>
            )}
          </div>

          <div className={styles.filters}>
            <TextField
              placeholder="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {slug ? null : (
              <div className={styles.categories}>
                <h2>Catégories</h2>
                <ul>
                  <li
                    onClick={() => setSelectedCategory(null)}
                    className={!selectedCategory ? styles.active : ""}
                  >
                    <div>
                      <i className="fi fi-rr-burger-alt" />
                      <p>Toutes les catégories</p>
                    </div>
                    <p>{`(${products.length})`}</p>
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
