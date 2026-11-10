
import { View, Text, Button, StyleSheet } from "react-native";
import { useRecetas } from "../context/RecetasContext";

export default function Inicio() {
  const { cambiarPantalla } = useRecetas();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Recetario App</Text>

      <Text style={styles.subtitulo}>
        Guarda las recetas de tus comidas favoritas.
        Selecciona una opcion del menu:
      </Text>

      <View style={styles.boton}>
        <Button
          title="Agregar receta"
          onPress={() => cambiarPantalla("agregar")}
        />
      </View>

      <View style={styles.boton}>
        <Button
          title="Ver recetas"
          onPress={() => cambiarPantalla("lista")}
        />
      </View>

      <View style={styles.boton}>
        <Button
          title="Buscar receta"
          onPress={() => cambiarPantalla("buscar")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#ffffff",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 35,
  },
  boton: {
    marginBottom: 15,
  },
});
