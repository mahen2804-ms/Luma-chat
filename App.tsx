import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ComponentRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChatBubble, type ChatMessage } from './src/components/ChatBubble';
import { ChatComposer } from './src/components/ChatComposer';
import { ChatHeader } from './src/components/ChatHeader';
import { ThinkingIndicator } from './src/components/ThinkingIndicator';

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome-user',
    role: 'user',
    text: 'Help me build a calmer morning routine.',
  },
  {
    id: 'welcome-assistant',
    role: 'assistant',
    text: 'Absolutely. A calmer morning doesn’t need a complete reset — just a little more room to breathe.',
    insight: {
      title: 'Try this tomorrow',
      description: 'Leave 10 minutes unplanned. No scrolling, no rushing — just you and your coffee.',
    },
  },
];

function createReply(message: string) {
  if (/morning|routine|calm/i.test(message)) {
    return 'Start with one small thing that feels good, then let the rest of the morning follow. You don’t have to get it all right at once.';
  }

  return 'That’s a lovely place to start. Try breaking it into one small step you can do today — we can figure out the rest together.';
}

function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showVoiceHint, setShowVoiceHint] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollViewRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const shouldScrollRef = useRef(false);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const sendMessage = useCallback(() => {
    const text = draft.trim();
    if (!text || isThinking) {
      return;
    }

    Keyboard.dismiss();
    setDraft('');
    setShowVoiceHint(false);
    shouldScrollRef.current = true;
    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `user-${Date.now()}`, role: 'user', text },
    ]);
    setIsThinking(true);

    timeoutRef.current = setTimeout(() => {
      shouldScrollRef.current = true;
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: createReply(text),
        },
      ]);
      setIsThinking(false);
      timeoutRef.current = null;
    }, 1400);
  }, [draft, isThinking]);

  const handleVoicePress = useCallback(() => {
    Keyboard.dismiss();
    setShowVoiceHint((visible) => !visible);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#17152a', '#10111B', '#10111B']}
        locations={[0, 0.42, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.ambientGlow} pointerEvents="none" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ChatHeader />

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            if (shouldScrollRef.current) {
              scrollViewRef.current?.scrollToEnd({ animated: true });
              shouldScrollRef.current = false;
            }
          }}
        >
          <Animated.View entering={FadeInDown.duration(700).springify()} style={styles.welcome}>
            <View style={styles.eyebrow}>
              <View style={styles.eyebrowDot} />
              <Text style={styles.eyebrowText}>A LITTLE SPACE FOR YOU</Text>
            </View>
            <Text style={styles.welcomeTitle}>
              A space to think{'\n'}
              <Text style={styles.welcomeTitleAccent}>out loud.</Text>
            </Text>
            <Text style={styles.welcomeDescription}>
              Your thoughts, met with a little more clarity.
            </Text>
          </Animated.View>

          <View style={styles.conversation}>
            <View style={styles.dateDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dateText}>TODAY · 9:41 AM</Text>
              <View style={styles.dividerLine} />
            </View>
            {messages.map((message, index) => (
              <ChatBubble key={message.id} message={message} index={index} />
            ))}
            {isThinking && <ThinkingIndicator />}
          </View>
        </ScrollView>

        <ChatComposer
          value={draft}
          onChangeText={(text) => {
            setDraft(text);
            if (showVoiceHint) {
              setShowVoiceHint(false);
            }
          }}
          onSend={sendMessage}
          onVoicePress={handleVoicePress}
          isThinking={isThinking}
        />
        {showVoiceHint && (
          <Text style={styles.voiceHint}>
            Voice input is a visual demo. Speech recognition isn’t connected.
          </Text>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#10111B',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  ambientGlow: {
    position: 'absolute',
    top: -145,
    right: -100,
    width: 310,
    height: 310,
    borderRadius: 155,
    backgroundColor: 'rgba(125, 87, 255, 0.08)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 24,
  },
  welcome: {
    marginBottom: 34,
  },
  eyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#A78BFA',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  eyebrowText: {
    color: '#A9A5BB',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.65,
  },
  welcomeTitle: {
    color: '#F6F4FC',
    fontSize: 35,
    fontWeight: '700',
    letterSpacing: -1.15,
    lineHeight: 40,
  },
  welcomeTitleAccent: {
    color: '#B9A5FF',
  },
  welcomeDescription: {
    color: '#9693A6',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
    letterSpacing: 0.1,
  },
  conversation: {
    gap: 19,
  },
  dateDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 2,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.09)',
  },
  dateText: {
    color: '#737184',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.15,
  },
  voiceHint: {
    color: '#A9A5BB',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
});
