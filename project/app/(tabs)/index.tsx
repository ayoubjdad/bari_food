import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Filter, Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { foodItems, productsCategories } from '../../data/foodItems';
import { FoodItem } from '../../types';
import { Link } from 'expo-router';
import { productImages } from '@/helpers/images';

export default function MenuScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>(foodItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = productsCategories.map((category) => category.name);

  useEffect(() => {
    filterItems();
  }, [searchQuery, selectedCategory]);

  const filterItems = () => {
    let filtered = foodItems;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (item) => String(item.categoryId) === selectedCategory
      );
    }

    setFilteredItems(filtered);
  };

  const getImage = (category: number, slug: string): number | undefined => {
    return productImages['pain-sandwich-blanc'];
    // return productImages[slug];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour, Ayoub!</Text>
          <Text style={styles.subtitle}>
            Qu'est-ce que tu aimerais manger ?
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9E9E9E" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {['Tout', ...categories].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* <Text style={styles.sectionTitle}>Articles populaires</Text> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.foodGrid}>
          {filteredItems.map((item) => {
            const imageSource = getImage(item.categoryId, item.slug);

            return (
              <Link href={`/food/${item.id}`} key={item.id} asChild>
                <TouchableOpacity style={styles.foodCard}>
                  <Image source={imageSource} style={styles.foodImage} />
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <View style={styles.foodMeta}>
                      <View style={styles.ratingContainer}>
                        <Star size={14} color="#FFD700" fill="#FFD700" />
                        <Text style={styles.rating}>5</Text>
                      </View>
                      <Text style={styles.price}>
                        {item.price.toFixed(2)} DH
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#9E9E9E',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: '#2faa7a',
    borderRadius: 12,
    padding: 12,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    alignSelf: 'flex-start',
    paddingRight: 16,
  },
  categoryButton: {
    height: 38,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#2faa7a',
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#9E9E9E',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 16,
    color: '#333333',
  },
  foodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  foodCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 4,
    color: '#333333',
  },
  foodMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9E9E9E',
    marginLeft: 4,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#2faa7a',
  },
});
