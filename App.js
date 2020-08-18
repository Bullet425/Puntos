import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Map, Modal, Panel, Input, List } from "./components";

export default function App() {
  const [puntos, setPuntos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [puntoTemp, setPuntoTemp] = useState({});
  const [visibility, setVisibility] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState("new_punto");
  const [pointsFilter, setPointsFilter] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  const togglePointsFilter = () => {
    setPointsFilter(!pointsFilter);
  };

  const handleLongPress = ({ nativeEvent }) => {
    setVisibilityFilter("new_punto");
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

  const handleCancelar = () => {
    setVisibility(false);
    setNombre("");
  };

  const handleList = () => {
    setVisibilityFilter("all_puntos");
    setVisibility(true);
  };

  const eraseItem = (itemName) => {
    const newPuntos = puntos;
    const index = newPuntos.findIndex((x) => x.name === itemName);
    newPuntos.splice(index, 1);
    setPuntos(newPuntos);
    setLoading(true);
  };

  return (
    <View style={styles.container}>
      <Map
        onLongPress={handleLongPress}
        puntos={puntos}
        pointsFilter={pointsFilter}
      />
      <Panel
        onPressLeft={handleList}
        textLeft="Lista"
        togglePointsFilter={togglePointsFilter}
      />
      <Modal visibility={visibility}>
        {visibilityFilter === "new_punto" ? (
          <View style={styles.form}>
            <Input
              title="Nombre"
              placeholder="Nombre del Punto"
              onChangeText={handleChangeText}
            />
            <View style={styles.buttons}>
              <Button title="Guardar" onPress={handleSubmit} />
              <Button title="Cancelar" onPress={handleCancelar} />
            </View>
          </View>
        ) : (
          <>
            {loading ? (
              <View style={styles.loading}>
                <Text>Actualizando...</Text>
              </View>
            ) : null}
            <List
              data={puntos}
              eraseItem={eraseItem}
              closeModal={() => setVisibility(false)}
            />
          </>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  loading: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
