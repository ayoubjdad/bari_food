import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { cartItems } from '../../data/cartItems';
import { CartItem } from '../../types';
import { Link } from 'expo-router';
import { productImages } from '@/helpers/images';

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    calculateSubtotal();
  }, [items]);

  const calculateSubtotal = () => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const updateQuantity = (id: string, change: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getImage = (category: number, slug: string): number | undefined => {
    return productImages['pain-sandwich-blanc'];
    // return productImages[slug];
  };

  const total = subtotal;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panier</Text>
        {items.length > 0 && (
          <Text style={styles.itemCount}>
            {items.length} élément{items.length !== 1 ? 's' : ''}
          </Text>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyCart}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            }}
            style={styles.emptyCartImage}
          />
          <Text style={styles.emptyCartText}>Votre panier est vide</Text>
          <Text style={styles.emptyCartSubtext}>
            Ajoutez de la nourriture délicieuse à votre panier
          </Text>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Revenir au menu</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((item) => {
              const imageSource = getImage(item.quantity, item.image);

              return (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={imageSource} style={styles.itemImage} />

                  <View style={styles.itemDetails}>
                    <View>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>
                        {item.price.toFixed(2)} DH
                      </Text>
                    </View>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                      >
                        <Minus size={16} color="#2faa7a" />
                      </TouchableOpacity>
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                      >
                        <Plus size={16} color="#2faa7a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Trash2 size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{subtotal.toFixed(2)} DH</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Livraison</Text>
              <Text style={styles.summaryValue}>Gratuite</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{total.toFixed(2)} DH</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Passer la commande</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
  },
  itemCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#9E9E9E',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  emptyCartText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#333333',
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#2faa7a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333333',
  },
  itemPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#2faa7a',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 6,
  },
  quantity: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginHorizontal: 12,
  },
  removeButton: {
    justifyContent: 'center',
    padding: 8,
  },
  summaryContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  summaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#333333',
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#2faa7a',
  },
  checkoutButton: {
    backgroundColor: '#2faa7a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
