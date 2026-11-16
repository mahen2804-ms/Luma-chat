import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';

export function ChatHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.identity}>
        <View style={styles.avatarGlow}>
          <LinearGradient
            colors={['#A78BFA', '#7553ED', '#4E46B8']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.avatar}
          >
            <Sparkles color="#FFFFFF" size={19} strokeWidth={1.8} />
          </LinearGradient>
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.identityCopy}>
          <Text style={styles.name}>Luma</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.status}>Here with you</Text>
          </View>
        </View>
      </View>

      <View style={styles.modePill}>
        <View style={styles.modeSparkle}>
          <Sparkles color="#BBA8FF" size={13} strokeWidth={2} />
        </View>
        <Text style={styles.modeText}>AI COMPANION</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarGlow: {
    width: 42,
    height: 42,
    borderRadius: 15,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.58,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 1 },
    elevation: 8,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)',
  },
  onlineDot: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5EE0B0',
    borderWidth: 2,
    borderColor: '#10111B',
  },
  identityCopy: {
    gap: 4,
  },
  name: {
    color: '#F6F4FC',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.25,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#5EE0B0',
  },
  status: {
    color: '#9794A6',
    fontSize: 11,
    fontWeight: '500',
  },
  modePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.045)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.075)',
  },
  modeSparkle: {
    opacity: 0.92,
  },
  modeText: {
    color: '#C4BED7',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.05,
  },
});
