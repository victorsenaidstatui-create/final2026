import { StyleSheet, Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const logoXml = `
<svg width="640" height="190" viewBox="0 0 640 190" xmlns="http://www.w3.org/2000/svg">
  <rect width="640" height="190" fill="#ed1c24"/>
  <g stroke="#fff" stroke-width="8">
    <path d="M0 42h70M0 95h70M0 148h70M570 42h70M570 95h70M570 148h70"/>
  </g>
  <text x="320" y="142" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="150" font-style="italic" font-weight="900">SESI</text>
</svg>`;

export default function AppLogo({ style }) {
    return (
    <View style={[styles.container, style]}>
      <SvgXml style={styles.image} xml={logoXml} />
      <Text style={styles.project}>Projeto: Automação da Cozinha da Escola</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    aspectRatio: 640 / 190,
    maxWidth: 420,
    width: '100%',
  },
  project: {
    color: '#ed1c24',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    marginTop: 9,
    textAlign: 'center',
  },
});

