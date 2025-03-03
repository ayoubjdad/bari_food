import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Star, Minus, Plus, Heart } from 'lucide-react-native';
import { foodItems } from '../../data/foodItems';

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);

  const foodItem = foodItems.find((item) => item.id === id);

  if (!foodItem) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Food item not found</Text>
      </SafeAreaView>
    );
  }

  const updateQuantity = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const totalPrice = foodItem.price * quantity;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.favoriteButton, favorite && styles.favoriteActive]}
          onPress={() => setFavorite(!favorite)}
        >
          <Heart
            size={20}
            color={favorite ? '#FFFFFF' : '#0a5440'}
            fill={favorite ? '#0a5440' : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Image source={{ uri: foodItem.image }} style={styles.foodImage} /> */}

        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.foodName}>{foodItem.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{foodItem.price.toFixed(2)} DH</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{foodItem.description}</Text>

          <Text style={styles.sectionTitle}>Quantité</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(-1)}
            >
              <Minus size={20} color="#0a5440" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(1)}
            >
              <Plus size={20} color="#0a5440" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Prix Total</Text>
          <Text style={styles.totalPrice}>{totalPrice.toFixed(2)} DH</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Ajouter à la carte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteActive: {
    backgroundColor: '#0a5440',
  },
  foodImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  foodName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333333',
    marginLeft: 4,
  },
  reviews: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    marginLeft: 4,
  },
  priceContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#0a5440',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#333333',
    marginTop: 16,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  ingredientText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#333333',
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  totalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  totalLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  totalPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#333333',
  },
  addToCartButton: {
    backgroundColor: '#0a5440',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
