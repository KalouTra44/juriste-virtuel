import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import {Text, ListItem, Divider, Button, Icon} from 'react-native-elements';
import {useTheme} from 'react-native-elements';

const SettingsScreen = () => {
  const {theme} = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const handlePrivacyPolicy = () => {
    // In a real app, this would open the privacy policy
    Alert.alert('Politique de confidentialité', 'Politique de confidentialité de Juriste Virtuel');
  };

  const handleTermsOfService = () => {
    // In a real app, this would open the terms of service
    Alert.alert('Conditions d\'utilisation', 'Conditions d\'utilisation de Juriste Virtuel');
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Email: support@juristevirtuel.com\nTéléphone: +33 1 23 45 67 89',
      [
        {text: 'Annuler', style: 'cancel'},
        {text: 'Envoyer un email', onPress: () => Linking.openURL('mailto:support@juristevirtuel.com')},
      ],
    );
  };

  const handleRateApp = () => {
    // In a real app, this would open the app store rating page
    Alert.alert('Évaluer l\'app', 'Merci de votre intérêt ! Cette fonctionnalité sera disponible après la publication sur les stores.');
  };

  const handleShareApp = () => {
    // In a real app, this would share the app link
    Alert.alert('Partager l\'app', 'Partagez Juriste Virtuel avec vos amis !');
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.colors.primary}]}>
          Préférences
        </Text>
        
        <ListItem containerStyle={styles.listItem}>
          <Icon name="notifications" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Notifications</ListItem.Title>
            <ListItem.Subtitle>Recevoir des notifications push</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: '#767577', true: theme.colors.primary}}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="dark-mode" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Mode sombre</ListItem.Title>
            <ListItem.Subtitle>Activer le thème sombre</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{false: '#767577', true: theme.colors.primary}}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="save" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Sauvegarde automatique</ListItem.Title>
            <ListItem.Subtitle>Sauvegarder automatiquement les conversations</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            trackColor={{false: '#767577', true: theme.colors.primary}}
            thumbColor={autoSave ? '#fff' : '#f4f3f4'}
          />
        </ListItem>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.colors.primary}]}>
          Légal
        </Text>

        <ListItem containerStyle={styles.listItem} onPress={handlePrivacyPolicy}>
          <Icon name="privacy-tip" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Politique de confidentialité</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem containerStyle={styles.listItem} onPress={handleTermsOfService}>
          <Icon name="description" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Conditions d'utilisation</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.colors.primary}]}>
          Support
        </Text>

        <ListItem containerStyle={styles.listItem} onPress={handleContactSupport}>
          <Icon name="support-agent" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Contacter le support</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem containerStyle={styles.listItem} onPress={handleRateApp}>
          <Icon name="star" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Évaluer l'application</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <ListItem containerStyle={styles.listItem} onPress={handleShareApp}>
          <Icon name="share" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Partager l'application</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: theme.colors.primary}]}>
          À propos
        </Text>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="info" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Version</ListItem.Title>
            <ListItem.Subtitle>1.0.0</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>

        <ListItem containerStyle={styles.listItem}>
          <Icon name="code" type="material" color={theme.colors.primary} />
          <ListItem.Content>
            <ListItem.Title>Développé par</ListItem.Title>
            <ListItem.Subtitle>Juriste Virtuel Team</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>

      <View style={styles.disclaimerContainer}>
        <Text style={[styles.disclaimerText, {color: theme.colors.textSecondary}]}>
          ⚖️ Avertissement : Cette application fournit des informations juridiques générales à titre informatif uniquement. Elle ne constitue pas un avis juridique professionnel. Pour des conseils juridiques spécifiques, consultez un avocat qualifié.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 8,
    elevation: 1,
  },
  divider: {
    marginVertical: 10,
  },
  disclaimerContainer: {
    padding: 20,
    marginTop: 20,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default SettingsScreen;