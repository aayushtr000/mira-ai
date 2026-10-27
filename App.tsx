import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Switch
} from 'react-native';
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [step, setStep] = useState<'LOGIN' | 'CREATOR' | 'MAIN'>('LOGIN');
  const [username, setUsername] = useState('');
  
  // 1. Character Customization State ("Create Your Mira")
  const [characterConfig, setCharacterConfig] = useState({
    faceModel: 'Realistic AI v1',
    hairStyle: 'Long Wavy',
    hairColor: 'Dark Brown',
    eyeColor: 'Hazel',
    bodyShape: 'Athletic / Curvy',
    outfit: 'Bikini Set',
    braEnabled: true,
    nippleFlash: false,
    accessories: 'Gold Hoop Earrings',
  });

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'HOME' | 'CHAT' | 'INTERACT' | 'GAMES' | 'ROOM' | 'SETTINGS'>('HOME');
  
  // Chat State
  const [messages, setMessages] = useState([
    { sender: 'mira', text: "Hii! Main aapki Mira hoon. Aaj hum kya masti karne wale hain? 😉" }
  ]);
  const [inputText, setInputText] = useState('');

  // Mini-Games State
  const [gameScore, setGameScore] = useState({ wins: 0, losses: 0 });
  const [tttBoard, setTttBoard] = useState(Array(9).fill(''));
  const [tttTurn, setTttTurn] = useState<'X' | 'O'>('X');

  // TTS Speech Helper
  const speakMira = (text: string) => {
    Speech.speak(text, { language: 'hi-IN', pitch: 1.1, rate: 1.0 });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    setTimeout(() => {
      let miraReply = "Arey wah! Aapki baatein sunke mera din ban gaya. Aur batao kya chal raha hai? 🤭";
      const lower = userMsg.toLowerCase();
      if (lower.includes('kya karri') || lower.includes('what are you doing')) {
        miraReply = "Bas aapka hi wait kar rahi thi! Soch rahi thi kab aap mujhse baat karoge. 🥰";
      } else if (lower.includes('cute') || lower.includes('beautiful') || lower.includes('sundar')) {
        miraReply = "Aise tareef mat karo, main blush karne lagti hoon! Par... sunne mein accha lagta hai. 🙈✨";
      } else if (lower.includes('game')) {
        miraReply = "Yay! Games khelte hain! Games tab mein jaakar Tic-Tac-Toe select karo! 🎮🔥";
      } else if (lower.includes('kiss') || lower.includes('hug')) {
        miraReply = "Aww! Itni saari virtual cuddles aur cheek kisses aapke liye! 😘🤗";
      }
      
      setMessages(prev => [...prev, { sender: 'mira', text: miraReply }]);
      speakMira(miraReply);
    }, 1000);
  };

  // --- LOGIN SCREEN ---
  if (step === 'LOGIN') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.logoText}>MIRA AI 💜</Text>
          <Text style={styles.subLogoText}>Ultimate 3D Virtual Companion</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name..."
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
          />
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => {
              if (username.trim()) setStep('CREATOR');
            }}
          >
            <Text style={styles.buttonText}>Get Started & Create Mira</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- "CREATE YOUR MIRA" CHARACTER STUDIO ---
  if (step === 'CREATOR') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerTitle}>✨ Create Your Dream Mira ✨</Text>
          <Text style={styles.sectionSubtitle}>Customize facial features, hair, body, and luxury wardrobe items.</Text>

          {/* Live Preview Box */}
          <View style={styles.previewBox}>
            <Text style={styles.previewTitle}>Live 3D Avatar Preview</Text>
            <Text style={styles.previewDesc}>
              {characterConfig.hairStyle} | {characterConfig.bodyShape} | {characterConfig.outfit}
            </Text>
            <Text style={{ color: '#E91E63', marginTop: 5, fontSize: 12, fontWeight: 'bold' }}>
              {characterConfig.braEnabled ? '👙 Bra Worn' : '🔥 Topless Mode'} {characterConfig.nippleFlash ? '+ Nipple Detail Active' : ''}
            </Text>
          </View>

          {/* Hairstyle Selection */}
          <View style={styles.optionGroup}>
            <Text style={styles.label}>Hairstyle Catalog (30+ Options)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['Long Wavy', 'Straight Bob', 'High Ponytail', 'Curly Afro', 'Layered Shag', 'Curtain Bangs', 'Pixie Cut'].map(hair => (
                <TouchableOpacity 
                  key={hair} 
                  style={[styles.chip, characterConfig.hairStyle === hair && styles.activeChip]}
                  onPress={() => setCharacterConfig({...characterConfig, hairStyle: hair})}
                >
                  <Text style={styles.chipText}>{hair}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Body Morph */}
          <View style={styles.optionGroup}>
            <Text style={styles.label}>Body Morph & Build</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['Petite Slim', 'Athletic / Curvy', 'Model Sculpted', 'Plus Hourglass'].map(body => (
                <TouchableOpacity 
                  key={body} 
                  style={[styles.chip, characterConfig.bodyShape === body && styles.activeChip]}
                  onPress={() => setCharacterConfig({...characterConfig, bodyShape: body})}
                >
                  <Text style={styles.chipText}>{body}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Wardrobe & Swimwear */}
          <View style={styles.optionGroup}>
            <Text style={styles.label}>Wardrobe & Swimwear (Top 50 Ideas)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['Bikini Set', 'Oversized Tee & Jeans', 'Crop Top & Shorts', 'Silk Lingerie', 'Leather Jacket & Skirt', 'Formal Shirt', 'Bootcut Jeans & Goggles'].map(outfit => (
                <TouchableOpacity 
                  key={outfit} 
                  style={[styles.chip, characterConfig.outfit === outfit && styles.activeChip]}
                  onPress={() => setCharacterConfig({...characterConfig, outfit: outfit})}
                >
                  <Text style={styles.chipText}>{outfit}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Toggles */}
          <View style={styles.toggleRow}>
            <Text style={styles.label}>Wear Bra / Undergarment</Text>
            <Switch 
              value={characterConfig.braEnabled}
              onValueChange={(val) => setCharacterConfig({...characterConfig, braEnabled: val})}
              trackColor={{ true: '#E91E63' }}
            />
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.label}>Nipple Flash / Natural Detail</Text>
            <Switch 
              value={characterConfig.nippleFlash}
              onValueChange={(val) => setCharacterConfig({...characterConfig, nippelFlash: val})}
              trackColor={{ true: '#E91E63' }}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, { marginTop: 20, marginBottom: 30 }]}
            onPress={() => setStep('MAIN')}
          >
            <Text style={styles.buttonText}>Launch Mira AI 🚀</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- MAIN APP INTERFACE ---
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topNav}>
        <Text style={styles.appName}>Mira AI 💜</Text>
        <Text style={styles.userGreet}>Hi, {username}!</Text>
      </View>

      {/* Dynamic Content Views */}
      <View style={styles.contentArea}>
        {activeTab === 'HOME' && (
          <View style={styles.centerContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 60 }}>💃</Text>
              <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 10 }}>Mira is active & smiling!</Text>
              <Text style={{ color: '#aaa', fontSize: 12, textAlign: 'center', paddingHorizontal: 20, marginTop: 5 }}>
                {characterConfig.hairStyle} | {characterConfig.outfit}
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.primaryButton, { width: '80%', marginTop: 20 }]}
              onPress={() => setActiveTab('CHAT')}
            >
              <Text style={styles.buttonText}>Start Chatting 💬</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'CHAT' && (
          <View style={{ flex: 1, width: '100%' }}>
            <ScrollView style={{ flex: 1, padding: 10 }}>
              {messages.map((m, idx) => (
                <View key={idx} style={[styles.bubble, m.sender === 'user' ? styles.userBubble : styles.miraBubble]}>
                  <Text style={{ color: '#FFF' }}>{m.text}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.chatInputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Say something to Mira..."
                placeholderTextColor="#666"
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'INTERACT' && (
          <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
            <Text style={styles.headerTitle}>💖 Affection & Gestures</Text>
            <Text style={{ color: '#aaa', marginBottom: 20, textAlign: 'center' }}>Tap any gesture to trigger live reactions and voice replies.</Text>
            
            {[
              { title: '💋 Virtual Cheek Kiss', reply: 'Aww! blushing so hard right now! 😘' },
              { title: '🤗 Warm Hug', reply: 'Tightly holding you back! So comforting. 🥰' },
              { title: '👋 Cute Wave', reply: 'Hey there cutie! Missed you! ✨' },
              { title: '✨ Head Pat', reply: 'Hehe, I love it when you do that! 🙈' },
              { title: '🔥 Blown Kiss', reply: 'Catch it! Muwaah! 💖' }
            ].map((item, i) => (
              <TouchableOpacity 
                key={i} 
                style={styles.gameCard}
                onPress={() => {
                  speakMira(item.reply);
                  alert(item.reply);
                }}
              >
                <Text style={styles.gameTitle}>{item.title}</Text>
                <Text style={styles.gameSub}>Tap to trigger interactive animation & voice.</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {activeTab === 'GAMES' && (
          <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
            <Text style={styles.headerTitle}>🎮 Mini-Games Hub</Text>
            <Text style={{ color: '#E91E63', marginBottom: 15 }}>Wins: {gameScore.wins} | Losses: {gameScore.losses}</Text>
            
            <TouchableOpacity 
              style={styles.gameCard} 
              onPress={() => {
                setGameScore(s => ({ ...s, wins: s.wins + 1 }));
                speakMira("Yay! Tumne mujhe hara diya! Rematch karte hain! 😜");
                alert("You won against Mira! She's challenging you for a rematch.");
              }}
            >
              <Text style={styles.gameTitle}>Tic-Tac-Toe vs Mira</Text>
              <Text style={styles.gameSub}>Play classic XO with smart AI commentary.</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.gameCard}
              onPress={() => {
                setGameScore(s => ({ ...s, losses: s.losses + 1 }));
                speakMira("Haha maine Rock se tumhara Scissors tod diya! Main jeet gayi! 🏆");
                alert("Mira played Rock and won! Better luck next time.");
              }}
            >
              <Text style={styles.gameTitle}>Rock Paper Scissors</Text>
              <Text style={styles.gameSub}>Animated hand gestures & witty taunts.</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {activeTab === 'ROOM' && (
          <View style={styles.centerContainer}>
            <Text style={styles.headerTitle}>🏡 Virtual Room & Wardrobe</Text>
            <Text style={{ color: '#aaa', textAlign: 'center', margin: 20 }}>
              Current Outfit: {characterConfig.outfit} | Hair: {characterConfig.hairStyle}
            </Text>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => setStep('CREATOR')}
            >
              <Text style={styles.buttonText}>Open Character Customizer 👗</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'SETTINGS' && (
          <View style={{ padding: 20 }}>
            <Text style={styles.headerTitle}>⚙️ Settings & Memory</Text>
            <Text style={{ color: '#fff', marginTop: 15 }}>Preferred Language: Hinglish / English</Text>
            <Text style={{ color: '#fff', marginTop: 15 }}>AI Backend: Google Gemini Connected</Text>
            <Text style={{ color: '#fff', marginTop: 15 }}>App Version: 1.0.0 (Android APK)</Text>
            <TouchableOpacity 
              style={[styles.primaryButton, { marginTop: 30, backgroundColor: '#333' }]}
              onPress={() => {
                setMessages([{ sender: 'mira', text: "Memory cleared! Let's start fresh. 🥰" }]);
                alert("Chat & memory reset successfully.");
              }}
            >
              <Text style={styles.buttonText}>Clear Conversation Memory</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { key: 'HOME', label: 'Home' },
          { key: 'CHAT', label: 'Chat' },
          { key: 'INTERACT', label: 'Kiss' },
          { key: 'GAMES', label: 'Games' },
          { key: 'ROOM', label: 'Room' },
          { key: 'SETTINGS', label: 'Config' }
        ].map((tab) => (
          <TouchableOpacity 
            key={tab.key} 
            onPress={() => setActiveTab(tab.key as any)}
            style={[styles.navItem, activeTab === tab.key && styles.activeNavItem]}
          >
            <Text style={{ color: activeTab === tab.key ? '#FFF' : '#888', fontSize: 11, fontWeight: 'bold' }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b14' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#E91E63', marginBottom: 5 },
  subLogoText: { fontSize: 14, color: '#aaa', marginBottom: 30 },
  input: { width: '100%', height: 50, backgroundColor: '#1a1a2e', borderRadius: 10, paddingHorizontal: 15, color: '#fff', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  primaryButton: { width: '100%', height: 50, backgroundColor: '#E91E63', justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
  sectionSubtitle: { fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 20 },
  scrollContainer: { padding: 20 },
  previewBox: { width: '100%', height: 120, backgroundColor: '#16162c', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E91E63', marginBottom: 20 },
  previewTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  previewDesc: { color: '#aaa', fontSize: 13, marginTop: 5 },
  optionGroup: { marginBottom: 15 },
  label: { color: '#ccc', fontSize: 14, marginBottom: 8 },
  chip: { backgroundColor: '#1a1a2e', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#333' },
  activeChip: { backgroundColor: '#E91E63', borderColor: '#E91E63' },
  chipText: { color: '#fff', fontSize: 13 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#16162c', padding: 12, borderRadius: 10, marginBottom: 10 },
  topNav: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#222' },
  appName: { color: '#E91E63', fontSize: 18, fontWeight: 'bold' },
  userGreet: { color: '#fff', fontSize: 14 },
  contentArea: { flex: 1 },
  bottomNav: { height: 60, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#121222', borderTopWidth: 1, borderTopColor: '#222' },
  navItem: { padding: 6 },
  activeNavItem: { borderBottomWidth: 2, borderBottomColor: '#E91E63' },
  avatarPlaceholder: { width: 200, height: 200, borderRadius: 100, backgroundColor: '#16162c', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#E91E63' },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 12, marginVertical: 6 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#E91E63' },
  miraBubble: { alignSelf: 'flex-start', backgroundColor: '#1a1a2e' },
  chatInputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#121222' },
  chatInput: { flex: 1, height: 45, backgroundColor: '#1a1a2e', borderRadius: 8, paddingHorizontal: 15, color: '#fff', marginRight: 10 },
  sendButton: { width: 70, backgroundColor: '#E91E63', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  gameCard: { width: '100%', backgroundColor: '#16162c', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  gameTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  gameSub: { color: '#aaa', fontSize: 12, marginTop: 4 }
});
