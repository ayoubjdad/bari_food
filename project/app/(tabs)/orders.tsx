import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Clock,
  CircleCheck as CheckCircle,
  Circle as XCircle,
} from 'lucide-react-native';
import { orders } from '../../data/orders';

export default function OrdersScreen() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livrée':
        return '#4CAF50';
      case 'En attente':
        return '#FF9800';
      case 'Annulée':
        return '#FF3B30';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Livrée':
        return <CheckCircle size={16} color="#4CAF50" />;
      case 'En attente':
        return <Clock size={16} color="#FF9800" />;
      case 'Annulée':
        return <XCircle size={16} color="#FF3B30" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liste des Commandes</Text>
      </View>

      {/* <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>En attente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Livrée</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {orders.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderNumber}>
                  Order #{order.orderNumber}
                </Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: `${getStatusColor(order.status)}10` },
                ]}
              >
                {getStatusIcon(order.status)}
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(order.status) },
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.orderItems}>
              {order.items.map((item, index) => (
                <Text key={index} style={styles.orderItem}>
                  {item.quantity}x {item.name}
                </Text>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{order.total.toFixed(2)} DH</Text>
            </View>

            {/* <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Track Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
              >
                <Text style={styles.secondaryButtonText}>Reorder</Text>
              </TouchableOpacity>
            </View> */}
          </TouchableOpacity>
        ))}
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
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#9E9E9E',
  },
  activeTabText: {
    color: '#333333',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#333333',
  },
  orderDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  orderItems: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    paddingVertical: 12,
    marginBottom: 12,
  },
  orderItem: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#9E9E9E',
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#0a5440',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#0a5440',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#0a5440',
    marginRight: 0,
    marginLeft: 8,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0a5440',
  },
});
