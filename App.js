import { StatusBar } from 'expo-status-bar';
import { bancoExterno } from './firebaseConnection';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { useFonts } from 'expo-font';


export default function App() {
  const [nome, setNome] = useState('Aguardando...');
  const [tipo, setTipo] = useState('Aguardando...');
  const [input, setInput] = useState('');

  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    // Adicione aqui outras fontes, se necessário
  });



  useEffect(() => {
    if (input) {
      const docRef = doc(bancoExterno, "Alimentos", input);

      const unsubscribe = onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (data) {
          setNome(data.nome || 'Código não encontrado');
          setTipo(data.tipo || 'Código não encontrado');
        } else {
          setNome('Código não encontrado');
          setTipo('Código não encontrado');
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [input]);



  return (
    <View style={styles.container}>
      <View style={styles.boxHeader}>
        <Image
          source={require('./assets/icone.png')}
          style={styles.logo}
        />

        <Text style={styles.tituloLogo}>
          Nutri
          <Text style={{ color: '#F9A700', fontFamily: 'Poppins-Black' }}>Food</Text>
        </Text>
      </View>

      <View style={styles.imagem}>
        <Image
          source={require('./assets/Chef.png')}
          style={styles.Image}
        />
      </View>
      <Text style={styles.Descricao}>
        Adicione o código do produto que deseja ver que foi adicionado no  outro aplicativo
      </Text>
      <View style={styles.containerInput}>
        <Image source={require('./assets/icone2.png')} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite o número do Código"
          value={input}
          onChangeText={setInput}
          keyboardType="numeric"
        />
      </View>
      <Text style={{ fontSize: 25 }}>Informações:</Text>
      <View style={styles.conteudoBaixo}>
        <Text style={styles.Nome}><Text style={styles.nome}>{nome}</Text></Text>
        <View style={styles.separa}></View>
        <Text style={styles.Nome}><Text style={styles.nome}>{tipo}</Text></Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 50
  },
  boxHeader: {
    alignItems: 'center',
  },
  Descricao: {
    textAlign: 'center',
    fontSize: 17,
    width: 340,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontFamily: 'Poppins'

  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  logo: {
    width: 35,
    height: 40,
    marginRight: 5,
  },
  tituloLogo: {
    fontFamily: 'Poppins',
    fontSize: 25,
  },
  separa: {
    width: 20
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    padding: 4,
    borderRadius: 10,
    marginBottom: 30,
  },
  icon: {
    width: 35,
    height: 35,
  },
  input: {
    height: 40,
    width: '80%',
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    alignItems: 'center',
    marginTop: 30
  },
  conteudoBaixo: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  Nome: {
    marginTop: 20,
    width: 170,
    height: 120,
    backgroundColor: '#F9A700',
    borderRadius: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'white',
    paddingTop: 10
  },
  Tipo: {
    width: 170,
    height: 120,
    backgroundColor: '#F9A700',
    borderRadius: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'white',
    paddingTop: 10
  },
  imagem: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image: {
    width: 300,
    height: 300,
  },
});
