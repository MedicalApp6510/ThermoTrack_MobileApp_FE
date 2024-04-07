import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import OpenAI from 'openai';
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebaseUtils/firebaseSetup";
import { useTheme, TextInput, IconButton } from 'react-native-paper';
import { getCurrentUserEmail } from "../firebaseUtils/firestore";
import {REACT_APP_OPENAI_SECRET_KEY} from "@env";

const AskAiScreen = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    const docRef = doc(db, "users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setUser(snapshot.data());
    });

    return () => unSubscribe();
  }, []);

  // Initialize OpenAI API instance with your API key
  const openai = new OpenAI({
    apiKey: REACT_APP_OPENAI_SECRET_KEY, // This is the default and can be omitted
  });

  const handleSend = async () => {
    if (inputText.trim() !== '') {
      // Add user input to chat history
      setChatHistory(prev => [...prev, { type: 'user', message: inputText.trim() }]);
      // Clear input
      setInputText('');
      // Call OpenAI API to generate AI response
      try {
        const prompt = 
            `Assume you are a medical AI and try to answer the patient's problem. The patient's recent temperature and time, ${Object.keys(user).map((key) => (`time: ${user[key].timestamp}, temperature: ${parseFloat(user[key].temperature)}°C, `)).join(', ')}, here is my question: ${inputText.trim()}`;
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: "AI" },
                { role: 'user', content: prompt }
            ],
          });
        // Add AI response to chat history
        setChatHistory(prev => [...prev, { type: 'ai', message: response.choices[0]?.message?.content.trim() }]);
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Top: Text */}
      <View style={[styles.topContainer, {backgroundColor: colors.primary}]}>
        <Text style={styles.topTitle}>Ask AI</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, padding: 10, backgroundColor: colors.background }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Chat dialog */}
        <ScrollView contentContainerStyle={[styles.chatContainer, { backgroundColor: colors.background }]}>
          {chatHistory.map((chat, index) => (
            <View key={index} style={chat.type === 'user' ? styles.userChatBubble : styles.aiChatBubble}>
              <Text style={chat.type === 'user' ? styles.userChatText : styles.aiChatText}>{chat.message}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Input box and send button */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            outlineStyle={styles.inputOutLineStyle}
          />
          <IconButton 
            onPress={handleSend}
            icon="send"
            disabled={!user}
            iconColor={colors.primary}
            containerColor={colors.primaryContainer}/>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: '20%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  topTitle: {
    fontSize: 28,
    color: '#ffffff',
    textAlign: 'left',
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  userChatBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(120, 69, 172)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  aiChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(240, 219, 255)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userChatText: {
    color: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 48
  },
  inputOutLineStyle: {
    borderColor:'rgb(120, 69, 172)', 
    borderRadius: 12
  },
});

export default AskAiScreen;
