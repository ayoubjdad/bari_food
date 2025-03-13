import { Circle, Star } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

interface LogoIconProps {
  size?: number;
  color?: string;
}

export function LogoIcon({ size = 64, color = '#000' }: LogoIconProps) {
  return (
    <View style={styles.container}>
      <Circle size={size} color={color} style={styles.circle} />
      <Star
        size={size * 0.6}
        color={color}
        style={[styles.star, { transform: [{ scale: 1.2 }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
  },
  star: {
    position: 'absolute',
  },
});