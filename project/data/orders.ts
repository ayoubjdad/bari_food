import { Order } from '../types';

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: '12345',
    date: 'June 15, 2025',
    status: 'Livrée',
    items: [
      { name: 'Classic Cheeseburger', quantity: 2 },
      { name: 'Strawberry Smoothie', quantity: 1 },
    ],
    total: 25.97,
  },
  {
    id: '2',
    orderNumber: '12346',
    date: 'June 18, 2025',
    status: 'En attente',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Chocolate Brownie Sundae', quantity: 1 },
    ],
    total: 20.98,
  },
  {
    id: '3',
    orderNumber: '12347',
    date: 'June 10, 2025',
    status: 'Livrée',
    items: [
      { name: 'Chicken Alfredo Pasta', quantity: 1 },
      { name: 'Veggie Wrap', quantity: 1 },
    ],
    total: 23.98,
  },
  {
    id: '4',
    orderNumber: '12348',
    date: 'June 5, 2025',
    status: 'Annulée',
    items: [{ name: 'Margherita Pizza', quantity: 2 }],
    total: 25.98,
  },
];
