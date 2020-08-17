import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

export default ({ onLongPress, puntos, pointsFilter }) => {
  return (
    <MapView style={styles.map} onLongPress={onLongPress}>
      {pointsFilter === true
        ? puntos.map((x) => (
            <Marker key={x.name} title={x.name} coordinate={x.coordinate} />
          ))
        : null}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 150,
  },
});
