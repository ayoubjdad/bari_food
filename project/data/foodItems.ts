import { FoodItem } from '../types';

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheddar cheese, fresh lettuce, tomato, onion, and our special sauce on a toasted brioche bun.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Burgers',
    rating: 4.8,
    reviews: 124,
    ingredients: ['Beef Patty', 'Cheddar Cheese', 'Lettuce', 'Tomato', 'Onion', 'Special Sauce', 'Brioche Bun']
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Traditional Italian pizza with fresh mozzarella, tomatoes, basil leaves, and extra virgin olive oil on our homemade thin crust.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pizza',
    rating: 4.6,
    reviews: 98,
    ingredients: ['Homemade Dough', 'Fresh Mozzarella', 'Tomatoes', 'Basil', 'Olive Oil']
  },
  {
    id: '3',
    name: 'Chicken Alfredo Pasta',
    description: 'Creamy alfredo sauce with grilled chicken breast, served over fettuccine pasta and topped with parmesan cheese and parsley.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Pasta',
    rating: 4.7,
    reviews: 87,
    ingredients: ['Fettuccine Pasta', 'Grilled Chicken', 'Alfredo Sauce', 'Parmesan Cheese', 'Parsley']
  },
  {
    id: '4',
    name: 'Chocolate Brownie Sundae',
    description: 'Warm chocolate brownie topped with vanilla ice cream, hot fudge sauce, whipped cream, and a cherry on top.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Desserts',
    rating: 4.9,
    reviews: 156,
    ingredients: ['Chocolate Brownie', 'Vanilla Ice Cream', 'Hot Fudge', 'Whipped Cream', 'Cherry']
  },
  {
    id: '5',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables including lettuce, tomato, cucumber, bell peppers, and avocado with hummus in a spinach wrap.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Burgers',
    rating: 4.5,
    reviews: 62,
    ingredients: ['Spinach Wrap', 'Lettuce', 'Tomato', 'Cucumber', 'Bell Peppers', 'Avocado', 'Hummus']
  },
  {
    id: '6',
    name: 'Strawberry Smoothie',
    description: 'Refreshing blend of fresh strawberries, banana, yogurt, and honey. A perfect healthy treat!',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Drinks',
    rating: 4.7,
    reviews: 43,
    ingredients: ['Strawberries', 'Banana', 'Yogurt', 'Honey', 'Ice']
  }
];