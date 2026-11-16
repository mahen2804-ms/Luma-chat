import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  insight?: {
    title: string;
    description: string;
  };
};

type ChatBubbleProps = {
  message: ChatMessage;
  index: number;
};

function AssistantAvatar() {
  return (
    <View style={styles.assistantAvatarGlow}>
      <LinearGradient
        colors={['#9775F7', '#5543BA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.assistantAvatar}
      >
        <Sparkles color="#FFFFFF" size={14} strokeWidth={1.8} />
      </LinearGradient>
    </View>
  );
}

export function ChatBubble({ message, index }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 70).duration(430).springify()}
        style={styles.userRow}
      >
        <LinearGradient
          colors={['#8058E9', '#6545CD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.userBubble}
        >
          <Text style={styles.userText}>{message.text}</Text>
        </LinearGradient>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).duration(480).springify()}
      style={styles.assistantRow}
    >
      <AssistantAvatar />
      <View style={styles.assistantBubble}>
        <Text style={styles.assistantText}>{message.text}</Text>
        {message.insight && (
          <View style={styles.insightCard}>
            <LinearGradient
              colors={['rgba(139,92,246,0.13)', 'rgba(56,189,248,0.045)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            <View style={styles.insightHeading}>
              <View style={styles.insightIcon}>
                <Sparkles color="#BBA7FF" size={13} strokeWidth={2} />
              </View>
              <Text style={styles.insightTitle}>{message.insight.title}</Text>
            </View>
            <Text style={styles.insightDescription}>{message.insight.description}</Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  userRow: {
    alignSelf: 'flex-end',
    maxWidth: '83%',
  },
  userBubble: {
    paddingHorizontal: 17,
    paddingVertical: 13,
    borderRadius: 20,
    borderBottomRightRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(210,194,255,0.22)',
    shadowColor: '#714FE2',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.05,
  },
  assistantRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    maxWidth: '96%',
  },
  assistantAvatarGlow: {
    marginTop: 3,
    width: 29,
    height: 29,
    borderRadius: 11,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.56,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
  },
  assistantAvatar: {
    width: 29,
    height: 29,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.19)',
  },
  assistantBubble: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 20,
    borderTopLeftRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.055)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.085)',
  },
  assistantText: {
    color: '#E8E6EF',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.04,
  },
  insightCard: {
    overflow: 'hidden',
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(139,92,246,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(173,146,255,0.15)',
  },
  insightHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 7,
  },
  insightIcon: {
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(139,92,246,0.15)',
  },
  insightTitle: {
    color: '#D5C9FF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  insightDescription: {
    color: '#B6B2C4',
    fontSize: 12,
    lineHeight: 18,
  },
});
