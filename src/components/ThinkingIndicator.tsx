import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';

function ThinkingDot({ delay }: { delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 360 }),
          withTiming(0, { duration: 360 }),
        ),
        -1,
        false,
      ),
    );

    return () => cancelAnimation(progress);
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + progress.value * 0.65,
    transform: [{ translateY: -progress.value * 4 }, { scale: 0.85 + progress.value * 0.15 }],
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

export function ThinkingIndicator() {
  return (
    <Animated.View entering={FadeInDown.duration(350).springify()} style={styles.row}>
      <View style={styles.avatarGlow}>
        <LinearGradient
          colors={['#9775F7', '#5543BA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Sparkles color="#FFFFFF" size={13} strokeWidth={1.8} />
        </LinearGradient>
      </View>
      <View style={styles.bubble}>
        <View style={styles.dots}>
          <ThinkingDot delay={0} />
          <ThinkingDot delay={150} />
          <ThinkingDot delay={300} />
        </View>
        <Text style={styles.label}>Luma is thinking</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarGlow: {
    width: 29,
    height: 29,
    borderRadius: 11,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.56,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
  },
  avatar: {
    width: 29,
    height: 29,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.19)',
  },
  bubble: {
    minHeight: 42,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderRadius: 15,
    borderTopLeftRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.045)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#B89DFF',
  },
  label: {
    color: '#A9A5B8',
    fontSize: 11,
    fontWeight: '500',
  },
});
