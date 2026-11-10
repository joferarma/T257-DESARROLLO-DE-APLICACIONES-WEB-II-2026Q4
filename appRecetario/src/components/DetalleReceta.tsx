
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

import { useRecetas } from "../context/RecetasContext";

export default function DetalleReceta() {
  const { recetaSeleccionada, volverInicio } = useRecetas();

  if (!recetaSeleccionada) {
    return (
      <View style={styles.contenedor}>
        <Text>Receta no encontrada</Text>
        <Button title="Volver al menu" onPress={volverInicio} />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>{recetaSeleccionada.nombre}</Text>

      <Text>Numero: {recetaSeleccionada.id}</Text>

      <Text>Fecha: {recetaSeleccionada.fecha}</Text>

      <Text style={styles.subtitulo}>Ingredientes:</Text>

      {recetaSeleccionada.ingredientes.map((ingrediente, index) => (
        <Text key={index} style={styles.ingrediente}>
          - {ingrediente}
        </Text>
      ))}

      <View style={styles.boton}>
        <Button title="Volver al menu" onPress={volverInicio} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  ingrediente: {
    fontSize: 16,
    marginBottom: 8,
  },
  boton: {
    marginTop: 30,
  },
});
