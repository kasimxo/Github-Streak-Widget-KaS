import { Image, 
  StyleSheet, 
  Platform,
  View,
Pressable,
Dimensions } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

var intervalo: any

const screen = Dimensions.get("window");


function formatNumber(num: number) {
return `0${num}`.slice(-2);
}


function getSeconds(input: number) {
  const minutes = Math.floor(input / 60);
  const seconds = input - minutes * 60;
  const minutos = formatNumber(minutes);
  const segundos = formatNumber(seconds);
  
  return `${minutos}:${segundos}` ;
}

var total = 0

export default function HomeScreen() {

  const [isRunning, setIsRunning] = useState(false)
  const [tiempo, setTiempo] = useState(getSeconds(total))
  //var { minutos, segundos } = getSeconds(total);

  function stop() {
    setIsRunning(false)
    clearInterval(intervalo)
  }

  function start(){
    setIsRunning(true)
    intervalo = setInterval(() => {
      total +=1 
      setTiempo(getSeconds(total))
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.timerText}>{tiempo}</ThemedText>
      {isRunning ? 
      <Pressable
            onPressIn={stop}
            style={[styles.button, styles.buttonStop]}
          >
        <ThemedText style={[styles.buttonText, styles.buttonTextStop]}>Stop</ThemedText>
      </Pressable>
      : 
      <Pressable
            onPressIn={start}
            style={[styles.button, styles.buttonStop]}
          >
        <ThemedText style={[styles.buttonText, styles.buttonText]}>Start</ThemedText>
      </Pressable>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07121B",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderWidth: 10,
    borderColor: "#89AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonStop: {
    borderColor: "#FF851B"
  },
  buttonText: {
    fontSize: 25,
    color: "#89AAFF"
  },
  buttonTextStop: {
    color: "#FF851B"
  },
  timerText: {
    width: "auto",
    height: "auto",
    color: "#fff",
    fontSize: 25
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: "#fff",
        backgroundColor: "#07121B",
        marginLeft: 10
      }
    })
  },
  pickerItem: {
    color: "#fff",
    fontSize: 20
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
