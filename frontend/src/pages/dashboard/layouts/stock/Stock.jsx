import React from "react";
import styles from "./Stock.module.scss";
import { categories, products } from "../../../../data/data";
import { useQuery } from "@tanstack/react-query";
import { getProductImage } from "../../../../helpers/functions.helper";
import {
  getDeliveryNotes,
  getOrders,
} from "../../../../helpers/apis/apis.helpers";

export default function Stock() {
  const { data: deliveryNotes = [] } = useQuery({
    queryKey: ["deliveryNotes"],
    queryFn: getDeliveryNotes,
  });

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  const list = products.map((product, index) => {
    let result = {
      id: product.id,
      name: product.name,
      quantity: 0,
    };

    deliveryNotes.forEach((element) => {
      if (element.id === product.id) {
        result.quantity += element.quantity;
      }
    });

    orders?.forEach((order) => {
      order?.items?.forEach((element) => {
        if (Number(element.product) === product.id) {
          result.quantity -= element.quantity;
        }
      });
    });

    return result;
  });

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.products}>
          {list.map((product) => (
            <Product product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Product = ({ product }) => {
  const { id, name, quantity } = product;

  const productIndex = products.findIndex((product) => product.id === id);
  const { categoryId, fileName } = products?.[productIndex] || {};

  const { slug: categorySlug = "" } =
    categories.find((category) => category.id === categoryId) || {};

  const imageSrc = getProductImage(categorySlug, fileName);

  return (
    <div className={styles.product}>
      <div className={styles.productImage}>
        <img src={imageSrc} alt={name} />
      </div>
      <div className={styles.details}>
        <h3>{name}</h3>
        <p>{quantity}</p>
      </div>
    </div>
  );
};
