import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {Text, Card, Button, Icon, Avatar} from 'react-native-elements';
import {useTheme} from 'react-native-elements';

const AboutScreen = () => {
  const {theme} = useTheme();

  const handleWebsite = () => {
    Linking.openURL('https://juristevirtuel.com');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:contact@juristevirtuel.com');
  };

  const handleLinkedIn = () => {
    Alert.alert('LinkedIn', 'Profil LinkedIn de l\'équipe Juriste Virtuel');
  };

  const handleTwitter = () => {
    Alert.alert('Twitter', 'Compte Twitter de Juriste Virtuel');
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.header}>
        <Avatar
          size="xlarge"
          rounded
          icon={{name: 'gavel', type: 'material'}}
          containerStyle={[styles.avatar, {backgroundColor: theme.colors.primary}]}
        />
        <Text h2 style={[styles.appName, {color: theme.colors.primary}]}>
          Juriste Virtuel
        </Text>
        <Text style={[styles.version, {color: theme.colors.textSecondary}]}>
          Version 1.0.0
        </Text>
      </View>

      <Card containerStyle={styles.card}>
        <Card.Title>À propos de l'application</Card.Title>
        <Text style={styles.cardText}>
          Juriste Virtuel est une application mobile innovante qui utilise l'intelligence artificielle 
          pour fournir des informations juridiques générales. Notre mission est de rendre l'accès 
          aux informations juridiques plus accessible et compréhensible pour tous.
        </Text>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>Fonctionnalités principales</Card.Title>
        <View style={styles.featureItem}>
          <Icon name="chat" type="material" color={theme.colors.primary} />
          <Text style={styles.featureText}>Assistant juridique IA</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="security" type="material" color={theme.colors.primary} />
          <Text style={styles.featureText}>Confidentialité garantie</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="access-time" type="material" color={theme.colors.primary} />
          <Text style={styles.featureText}>Disponible 24h/24</Text>
        </View>
        <View style={styles.featureItem}>
          <Icon name="language" type="material" color={theme.colors.primary} />
          <Text style={styles.featureText}>Interface en français</Text>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>Notre équipe</Card.Title>
        <Text style={styles.cardText}>
          L'équipe Juriste Virtuel est composée de développeurs passionnés et d'experts en droit 
          qui travaillent ensemble pour créer des solutions innovantes dans le domaine juridique.
        </Text>
        
        <View style={styles.teamMember}>
          <Avatar
            size="medium"
            rounded
            title="JV"
            containerStyle={[styles.memberAvatar, {backgroundColor: theme.colors.secondary}]}
          />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>Équipe Juriste Virtuel</Text>
            <Text style={styles.memberRole}>Développement & IA</Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Card.Title>Technologies utilisées</Card.Title>
        <View style={styles.techItem}>
          <Icon name="code" type="material" color={theme.colors.primary} />
          <Text style={styles.techText}>React Native</Text>
        </View>
        <View style={styles.techItem}>
          <Icon name="psychology" type="material" color={theme.colors.primary} />
          <Text style={styles.techText}>OpenAI GPT</Text>
        </View>
        <View style={styles.techItem}>
          <Icon name="storage" type="material" color={theme.colors.primary} />
          <Text style={styles.techText}>Firebase</Text>
        </View>
        <View style={styles.techItem}>
          <Icon name="cloud" type="material" color={theme.colors.primary} />
          <Text style={styles.techText}>AWS/Google Cloud</Text>
        </View>
      </Card>

      <View style={styles.contactSection}>
        <Text style={[styles.contactTitle, {color: theme.colors.primary}]}>
          Nous contacter
        </Text>
        
        <View style={styles.contactButtons}>
          <Button
            title="Site web"
            icon={<Icon name="language" type="material" size={20} color="#fff" />}
            onPress={handleWebsite}
            buttonStyle={[styles.contactButton, {backgroundColor: theme.colors.primary}]}
            containerStyle={styles.buttonContainer}
          />
          
          <Button
            title="Email"
            icon={<Icon name="email" type="material" size={20} color="#fff" />}
            onPress={handleEmail}
            buttonStyle={[styles.contactButton, {backgroundColor: theme.colors.secondary}]}
            containerStyle={styles.buttonContainer}
          />
        </View>

        <View style={styles.socialButtons}>
          <Button
            icon={<Icon name="linkedin" type="material" size={24} color={theme.colors.primary} />}
            onPress={handleLinkedIn}
            type="clear"
            containerStyle={styles.socialButton}
          />
          
          <Button
            icon={<Icon name="twitter" type="material" size={24} color={theme.colors.primary} />}
            onPress={handleTwitter}
            type="clear"
            containerStyle={styles.socialButton}
          />
        </View>
      </View>

      <View style={styles.disclaimerContainer}>
        <Text style={[styles.disclaimerText, {color: theme.colors.textSecondary}]}>
          ⚖️ Avertissement légal : Cette application fournit des informations juridiques générales 
          à titre informatif uniquement. Elle ne constitue pas un avis juridique professionnel. 
          Pour des conseils juridiques spécifiques, consultez un avocat qualifié.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, {color: theme.colors.textSecondary}]}>
          © 2024 Juriste Virtuel. Tous droits réservés.
        </Text>
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
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatar: {
    marginBottom: 20,
  },
  appName: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  version: {
    marginTop: 5,
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
    marginBottom: 15,
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
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  memberAvatar: {
    marginRight: 15,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  techText: {
    marginLeft: 15,
    fontSize: 16,
  },
  contactSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  contactButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButton: {
    marginHorizontal: 10,
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
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
});

export default AboutScreen;