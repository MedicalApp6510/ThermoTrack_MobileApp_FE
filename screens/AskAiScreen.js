import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import OpenAI from 'openai';
import { useTheme } from 'react-native-paper';
import {REACT_APP_OPENAI_SECRET_KEY} from "@env";

const AskAiScreen = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const { colors } = useTheme();

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
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: "AI" },
                { role: 'user', content: inputText.trim() }
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
        style={{ flex: 1, padding: 10 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Chat dialog */}
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {chatHistory.map((chat, index) => (
            <View key={index} style={chat.type === 'user' ? styles.userChatBubble : styles.aiChatBubble}>
              <Text>{chat.message}</Text>
            </View>
          ))}
        </ScrollView>
        {/* Input box and send button */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
          />
          <Button title="Send" onPress={handleSend} />
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
    backgroundColor: '#DCF8C6',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  aiChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default AskAiScreen;
