export const getProductImage = (category, fileName) => {
  try {
    return require(`../assets/images/products/${category}/${fileName}.png`);
  } catch (error) {
    console.warn(
      `Image non trouvée : ${fileName}, utilisation de l'image par défaut.`
    );
    return null; // require(`../assets/images/products/image44.png`);
  }
};
