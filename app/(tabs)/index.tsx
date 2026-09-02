import { useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Calculator() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function calculate(operation: string) {
    if (number1 === '' || number2 === '') {
      setResult('Please enter both numbers.');
      setModalVisible(true);
      return;
    }

    const firstNumber = Number(number1);
    const secondNumber = Number(number2);

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      setResult('Please enter valid numbers.');
      setModalVisible(true);
      return;
    }

    if (operation === 'divide' && secondNumber === 0) {
      setResult('Cannot divide by zero.');
      setModalVisible(true);
      return;
    }

    let answer = 0;

    if (operation === 'add') {
      answer = firstNumber + secondNumber;
    } else if (operation === 'subtract') {
      answer = firstNumber - secondNumber;
    } else if (operation === 'multiply') {
      answer = firstNumber * secondNumber;
    } else if (operation === 'divide') {
      answer = firstNumber / secondNumber;
    }

    setResult(String(answer));
    setModalVisible(true);
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.heading}>CALCULATOR</Text>
        <Text style={styles.title}>Simple Calculator</Text>
        <Text style={styles.subtitle}>Enter two values and select an operation.</Text>

        <Text style={styles.label}>FIRST VALUE</Text>
        <TextInput
          style={styles.input}
          placeholder="First number"
          keyboardType="numeric"
          value={number1}
          onChangeText={setNumber1}
        />

        <Text style={styles.label}>SECOND VALUE</Text>
        <TextInput
          style={styles.input}
          placeholder="Second number"
          keyboardType="numeric"
          value={number2}
          onChangeText={setNumber2}
        />

        <Text style={styles.operationHeading}>SELECT OPERATION</Text>
        <View style={styles.buttonGrid}>
          <View style={styles.button}>
            <Button title="Add  +" onPress={() => calculate('add')} color="black" />
          </View>
          <View style={styles.button}>
            <Button title="Subtract  −" onPress={() => calculate('subtract')} color="black" />
          </View>
          <View style={styles.button}>
            <Button title="Multiply  ×" onPress={() => calculate('multiply')} color="black" />
          </View>
          <View style={styles.button}>
            <Button title="Divide  ÷" onPress={() => calculate('divide')} color="black" />
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalLabel}>CALCULATION RESULT</Text>
            <Text style={styles.modalTitle}>Result</Text>
            <Text style={styles.modalResult}>{result}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} color="black" />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#111111',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 24,
    elevation: 6,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#555555',
    marginBottom: 28,
    marginTop: 8,
    textAlign: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 3,
    fontSize: 17,
    marginBottom: 18,
    padding: 13,
  },
  operationHeading: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 4,
    paddingTop: 20,
    marginBottom: 12,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 1,
    flexBasis: '47%',
    flexGrow: 1,
    overflow: 'hidden',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalBox: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#cccccc',
    borderWidth: 1,
    padding: 28,
  },
  modalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalResult: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});
