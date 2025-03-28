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

export const formatTime = (date) => {
  const dateObject = new Date(date);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${hours}h${minutes < 10 ? "0" + minutes : minutes}`;
};

export const formatDate = (date) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  return `${year}-${month}-${day}`;
};
