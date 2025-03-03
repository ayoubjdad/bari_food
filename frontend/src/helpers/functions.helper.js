export const getProductImage = (category, fileName) => {
  try {
    return require(`../assets/images/products/${category}/${fileName}.png`);
  } catch (error) {
    try {
      return require(`../assets/images/products/${category}/${fileName}.JPG`);
    } catch (error) {
      console.warn(
        `Image non trouvée : ${fileName}, utilisation de l'image par défaut.`
      );
      return null; // require(`../assets/images/products/image44.png`);
    }
  }
};

export const getCategoryImage = (slug) => {
  try {
    return require(`../assets/images/categories/${slug}.png`);
  } catch (error) {
    try {
      return require(`../assets/images/categories/${slug}.JPG`);
    } catch (error) {
      console.warn(
        `Image non trouvée : ${slug}, utilisation de l'image par défaut.`
      );
      return null; // require(`../assets/images/products/image44.png`);
    }
  }
};
