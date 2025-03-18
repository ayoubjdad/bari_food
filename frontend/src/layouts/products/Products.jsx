import React from "react";
import styles from "./Products.module.scss";
import Product from "../../components/product/Product";
import Button from "@mui/material/Button";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../helpers/apis/apis.helpers";

export default function Products() {
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  const highlightedProducts = products.filter((product) =>
    [145, 146, 147, 148, 149, 150, 2, 8].includes(product.id)
  );

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.products}>
          {highlightedProducts.map((product) => (
            <Product product={product} />
          ))}
        </div>

        <Link to="/produits">
          <Button>Tout les produits</Button>
        </Link>
      </div>
    </section>
  );
}
