import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { ReactNode } from 'react';
import { ArrowUp, Mic } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type ChatComposerProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  onVoicePress: () => void;
  isThinking: boolean;
};

function AnimatedActionButton({
  children,
  onPress,
  accessibilityLabel,
  disabled = false,
  variant = 'secondary',
}: {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  variant?: 'secondary' | 'primary';
}) {
  const scale = useSharedValue(1);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(variant === 'primary' ? 1 : 0, { duration: 220 });
    return () => cancelAnimation(progress);
  }, [progress, variant]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 0.72 + progress.value * 0.28,
  }));

  return (
    <Animated.View style={[styles.actionButtonShell, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.9, { damping: 12, stiffness: 280 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 12, stiffness: 280 });
        }}
        style={({ pressed }) => [
          styles.actionButton,
          variant === 'primary' ? styles.sendButton : styles.micButton,
          pressed && variant === 'secondary' && styles.secondaryPressed,
          disabled && styles.disabledButton,
        ]}
      >
        {variant === 'primary' ? (
          <LinearGradient
            colors={['#A78BFA', '#8159EF', '#6846D7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sendGradient}
          >
            {children}
          </LinearGradient>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  );
}

export function ChatComposer({
  value,
  onChangeText,
  onSend,
  onVoicePress,
  isThinking,
}: ChatComposerProps) {
  const hasText = value.trim().length > 0;

  return (
    <View style={styles.outer}>
      <View style={styles.composer}>
        <TextInput
          accessibilityLabel="Message Luma"
          value={value}
          onChangeText={onChangeText}
          placeholder="Write what’s on your mind..."
          placeholderTextColor="#777487"
          selectionColor="#B9A5FF"
          style={styles.input}
          multiline
          maxLength={1000}
          returnKeyType="send"
          blurOnSubmit
          onSubmitEditing={onSend}
        />

        {hasText ? (
          <AnimatedActionButton
            accessibilityLabel="Send message"
            onPress={onSend}
            disabled={isThinking}
            variant="primary"
          >
            <ArrowUp color="#FFFFFF" size={20} strokeWidth={2.2} />
          </AnimatedActionButton>
        ) : (
          <AnimatedActionButton
            accessibilityLabel="Voice input demo"
            onPress={onVoicePress}
          >
            <Mic color="#C4B6F4" size={18} strokeWidth={1.9} />
          </AnimatedActionButton>
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.lockIcon} />
        <Text style={styles.footerText}>A private space, just for you</Text>
        <View style={styles.footerSparkle}>
          <View style={styles.footerSparkleDot} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 18,
    paddingTop: 11,
    paddingBottom: 7,
    backgroundColor: 'rgba(16,17,27,0.96)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.075)',
  },
  composer: {
    minHeight: 58,
    maxHeight: 118,
    paddingLeft: 15,
    paddingRight: 9,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.105)',
  },
  actionButtonShell: {
    width: 38,
    height: 38,
    borderRadius: 14,
  },
  actionButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  micButton: {
    backgroundColor: 'rgba(139,92,246,0.13)',
    borderWidth: 1,
    borderColor: 'rgba(169,143,255,0.15)',
  },
  secondaryPressed: {
    backgroundColor: 'rgba(139,92,246,0.23)',
  },
  sendButton: {
    borderWidth: 1,
    borderColor: 'rgba(224,211,255,0.24)',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.32,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  sendGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.55,
  },
  input: {
    flex: 1,
    minHeight: 38,
    maxHeight: 98,
    paddingTop: 9,
    paddingBottom: 8,
    paddingHorizontal: 2,
    color: '#F2F0F8',
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 0.02,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 10,
  },
  lockIcon: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7C7890',
  },
  footerText: {
    color: '#777487',
    fontSize: 10,
    letterSpacing: 0.15,
  },
  footerSparkle: {
    width: 9,
    height: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
  },
  footerSparkleDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9A82E8',
  },
});
