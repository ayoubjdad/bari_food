export const getProductImage = (fileName) => {
  try {
    return require(`../assets/images/products/${fileName}.png`);
  } catch (error) {
    console.warn(
      `Image non trouvée : ${fileName}, utilisation de l'image par défaut.`
    );
    return require(`../assets/images/products/assylor-mini-pizza-feuilletee.png`);
  }
};
