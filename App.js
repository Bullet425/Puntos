import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Map, Modal, Panel, Input } from "./components";

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [puntoTemp, setPuntoTemp] = useState({});
  const [visibility, setVisibility] = useState(false);
  const handleLongPress = ({ nativeEvent }) => {
    //const newPuntos = [...puntos, { coordinate: nativeEvent.coordinate }]; // puntos.concat({ coordinate: nativeEvent.coordinate });
    setPuntoTemp(nativeEvent.coordinate);
    setVisibility(true);
  };

  const handleChangeText = (text) => {
    setNombre(text);
  };

  const handleSubmit = () => {
    const newPunto = {
      coordinate: puntoTemp,
      name: nombre,
    };
    setPuntos([...puntos, newPunto]);
    setVisibility(false);
    setNombre("");
  };

  return (
    <View style={styles.container}>
      <Map onLongPress={handleLongPress} />
      <Panel />
      <Modal visibility={visibility}>
        <Input
          title="Nombre"
          placeholder="Nombre del Punto"
          onChangeText={handleChangeText}
        />
        <Button title="Guardar" onPress={handleSubmit} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
