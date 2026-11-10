
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useRecetas } from "../context/RecetasContext";

export default function ListaRecetas() {
  const { recetas, eliminarReceta, volverInicio } = useRecetas();

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Lista de recetas</Text>

      {recetas.length === 0 ? (
        <Text>No hay recetas registradas</Text>
      ) : (
        recetas.map((receta) => (
          <View key={receta.id} style={styles.receta}>
            <Text style={styles.nombre}>{receta.nombre}</Text>

            <Text>Numero: {receta.id}</Text>
            <Text>Fecha: {receta.fecha}</Text>

            <Button
              title="Eliminar receta"
              onPress={() => eliminarReceta(receta.id)}
              color="red"
            />
          </View>
        ))
      )}

      <View style={styles.boton}>
        <Button title="Volver al menu" onPress={volverInicio} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  receta: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  nombre: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },
  boton: {
    marginTop: 10,
    marginBottom: 25,
  },
});
