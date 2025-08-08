import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, Card, Button, Icon} from 'react-native-elements';
import {useTheme} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  const {theme} = useTheme();

  const handleStartChat = () => {
    navigation.navigate('Chat');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleAbout = () => {
    navigation.navigate('About');
  };

  const showDisclaimer = () => {
    Alert.alert(
      'Avertissement Important',
      'Cette application fournit des informations juridiques générales à titre informatif uniquement. Elle ne constitue pas un avis juridique professionnel. Pour des conseils juridiques spécifiques, consultez un avocat qualifié.',
      [{text: 'Compris', style: 'default'}],
    );
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <Icon
          name="gavel"
          type="material"
          size={80}
          color={theme.colors.primary}
        />
        <Text h1 style={[styles.title, {color: theme.colors.primary}]}>
          Juriste Virtuel
        </Text>
        <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>
          Votre assistant juridique intelligent
        </Text>
      </View>

      <Card containerStyle={styles.card}>
        <Card.Title>Bienvenue</Card.Title>
        <Text style={styles.cardText}>
          Posez vos questions juridiques et obtenez des réponses instantanées grâce à notre assistant alimenté par l'intelligence artificielle.
        </Text>
        <Button
          title="Commencer une consultation"
          onPress={handleStartChat}
          buttonStyle={[styles.primaryButton, {backgroundColor: theme.colors.primary}]}
          containerStyle={styles.buttonContainer}
        />
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>Fonctionnalités</Card.Title>
        <View style={styles.featureItem}>
          <Icon name="chat" type="material" color={theme.colors.primary} />
          <Text style={styles.featureText}>Consultation en temps réel</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="security" type="material" color={theme.colors.primary} />
          <Text style={styles.featureText}>Confidentialité garantie</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="access-time" type="material" color={theme.colors.primary} />
          <Text style={styles.featureText}>Disponible 24h/24</Text>
        </View>
      </Card>

      <View style={styles.footer}>
        <TouchableOpacity onPress={showDisclaimer} style={styles.disclaimerButton}>
          <Text style={[styles.disclaimerText, {color: theme.colors.textSecondary}]}>
            Avertissement légal
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationButtons}>
        <Button
          title="Paramètres"
          onPress={handleSettings}
          type="outline"
          buttonStyle={styles.navButton}
          titleStyle={{color: theme.colors.primary}}
        />
        <Button
          title="À propos"
          onPress={handleAbout}
          type="outline"
          buttonStyle={styles.navButton}
          titleStyle={{color: theme.colors.primary}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  primaryButton: {
    borderRadius: 25,
    paddingVertical: 12,
  },
  buttonContainer: {
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  featureText: {
    marginLeft: 15,
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  disclaimerButton: {
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  navButton: {
    borderColor: '#2E7D32',
    borderRadius: 25,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;