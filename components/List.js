import React from "react";
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default ({ data, closeModal, eraseItem }) => {
  return (
    <>
      <View style={styles.lista}>
        <FlatList
          data={data.map((x) => x.name)}
          renderItem={({ item }) => (
            <View style={styles.conta}>
              <View style={styles.item}>
                <Text>{item}</Text>
              </View>
              <View style={styles.item2}>
                <TouchableOpacity
                  onPress={() => eraseItem(item)}
                  style={styles.buttonCerrar}
                >
                  <Text style={styles.text}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={closeModal} title="Cerrar" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 15,
  },
  buttonCerrar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E76868",
  },
  text: {
    color: "#fff",
  },
  conta: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    height: 40,
    padding: 4,
  },
  item: {
    backgroundColor: "#f4f4f4",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  item2: {
    backgroundColor: "#fff",
    flex: 1,
  },
  lista: {
    height: Dimensions.get("window").height - 250,
  },
});
