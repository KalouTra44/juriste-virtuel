import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Text, Input, Button, Icon} from 'react-native-elements';
import {useTheme} from 'react-native-elements';

const ChatScreen = () => {
  const {theme} = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        id: '1',
        text: 'Bonjour ! Je suis votre assistant juridique virtuel. Posez-moi vos questions juridiques et je ferai de mon mieux pour vous aider. N\'oubliez pas que mes réponses sont à titre informatif uniquement.',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // In a real app, you would call your backend API here
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: generateMockResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter l\'assistant. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockResponse = (question) => {
    const responses = [
      'Je comprends votre question. Voici une réponse générale basée sur les principes juridiques français...',
      'Cette situation relève du droit civil français. Voici les points importants à considérer...',
      'Pour ce type de question, il est important de consulter un avocat spécialisé. Voici quelques informations générales...',
      'Selon le Code civil français, voici les éléments à prendre en compte...',
      'Cette question nécessite une analyse approfondie. Je vous recommande de consulter un professionnel du droit.',
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const renderMessage = ({item}) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.aiMessage,
      {backgroundColor: item.isUser ? theme.colors.primary : theme.colors.surface}
    ]}>
      <Text style={[
        styles.messageText,
        {color: item.isUser ? '#fff' : theme.colors.text}
      ]}>
        {item.text}
      </Text>
      <Text style={[
        styles.timestamp,
        {color: item.isUser ? 'rgba(255,255,255,0.7)' : theme.colors.textSecondary}
      ]}>
        {item.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text style={[styles.loadingText, {color: theme.colors.textSecondary}]}>
            L'assistant réfléchit...
          </Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Input
          placeholder="Posez votre question juridique..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          containerStyle={styles.inputWrapper}
          inputStyle={styles.input}
          disabled={isLoading}
        />
        <Button
          icon={
            <Icon
              name="send"
              type="material"
              size={20}
              color="#fff"
            />
          }
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
          buttonStyle={[styles.sendButton, {backgroundColor: theme.colors.primary}]}
          containerStyle={styles.sendButtonContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  sendButtonContainer: {
    marginBottom: 5,
  },
});

export default ChatScreen;