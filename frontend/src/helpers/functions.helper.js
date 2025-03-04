export const getProductImage = (category, fileName) => {
  try {
    return require(`../assets/images/products/${category}/${fileName}.png`);
  } catch (error) {
    try {
      return require(`../assets/images/products/${category}/${fileName}.JPG`);
    } catch (error) {
      try {
        return require(`../assets/logo/bari-lion.png`);
      } catch (error) {
        console.error("❌ Image produit non trouvée:", error);
        return null;
      }
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
      console.error("❌ Image categorie non trouvée:", error);
      return null;
    }
  }
};
