import React from "react";
import styles from "./Home.module.scss";
import { menu, popularDishes, products } from "../../data/data";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {menu.map(({ image, name }) => (
              <div className={styles.category}>
                {/* <img src={image} alt={name} /> */}
                <p>{name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div>
                <p>Any day offers</p>
                <p>new phenomenon burger taste</p>
                <p>$12.90</p>
              </div>
              <img
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner1-1.png"
                alt=""
              />
            </div>
            <div>
              <div>
                <p>Any day offers</p>
                <p>new phenomenon burger taste</p>
                <p>$12.90</p>
              </div>
              <img
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner1-1.png"
                alt=""
              />
            </div>
            <div>
              <div>
                <p>Any day offers</p>
                <p>new phenomenon burger taste</p>
                <p>$12.90</p>
              </div>
              <img
                src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner1-1.png"
                alt=""
              />
            </div>
          </div>
        </section>

        <section>
          <h1>Popular dishes</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {popularDishes.map((dish) => (
              <span>{dish}</span>
            ))}
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            {products
              .slice(0, 12)
              .map(
                ({
                  id,
                  name,
                  slug,
                  description,
                  price,
                  categoryId,
                  subcategoryId,
                  image,
                }) => (
                  <div>
                    <img
                      src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/09/h1_banner1-1.png"
                      alt=""
                    />
                    <div>
                      <p>{name}</p>
                      <p>{description}</p>
                      <p>{price} Dh</p>
                    </div>
                  </div>
                )
              )}
          </div>
        </section>
      </div>
    </div>
  );
}
