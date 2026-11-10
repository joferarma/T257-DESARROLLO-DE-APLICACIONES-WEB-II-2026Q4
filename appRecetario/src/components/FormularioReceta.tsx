
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { useRecetas } from "../context/RecetasContext";

export default function FormularioReceta() {
  const { agregarReceta, volverInicio } = useRecetas();

  const [nombre, setNombre] = useState("");
  const [ingrediente1, setIngrediente1] = useState("");
  const [ingrediente2, setIngrediente2] = useState("");
  const [ingrediente3, setIngrediente3] = useState("");
  const [ingrediente4, setIngrediente4] = useState("");
  const [ingrediente5, setIngrediente5] = useState("");

  function guardarReceta() {
    if (nombre.trim() === "") {
      Alert.alert("Error", "Porfavor ingresar el nombre de la receta.");
      return;
    }

    const ingredientes = [
      ingrediente1,
      ingrediente2,
      ingrediente3,
      ingrediente4,
      ingrediente5,
    ].filter((ingrediente) => ingrediente.trim() !== "");

    if (ingredientes.length === 0) {
      Alert.alert("Error", "Porfavor agregar al menos un ingrediente.");
      return;
    }

    agregarReceta(nombre, ingredientes);

    Alert.alert("Exito!", "La receta fue guardada correctamente.");

    setNombre("");
    setIngrediente1("");
    setIngrediente2("");
    setIngrediente3("");
    setIngrediente4("");
    setIngrediente5("");

    volverInicio();
  }

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Agregar receta</Text>

      <Text>Nombre de la receta:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre de la receta"
      />

      <Text>Ingrediente 1:</Text>
      <TextInput
        style={styles.input}
        value={ingrediente1}
        onChangeText={setIngrediente1}
        placeholder="Ingrediente"
      />

      <Text>Ingrediente 2:</Text>
      <TextInput
        style={styles.input}
        value={ingrediente2}
        onChangeText={setIngrediente2}
        placeholder="Ingrediente"
      />

      <Text>Ingrediente 3:</Text>
      <TextInput
        style={styles.input}
        value={ingrediente3}
        onChangeText={setIngrediente3}
        placeholder="Ingrediente"
      />

      <Text>Ingrediente 4:</Text>
      <TextInput
        style={styles.input}
        value={ingrediente4}
        onChangeText={setIngrediente4}
        placeholder="Ingrediente"
      />

      <Text>Ingrediente 5:</Text>
      <TextInput
        style={styles.input}
        value={ingrediente5}
        onChangeText={setIngrediente5}
        placeholder="Ingrediente"
      />

      <View style={styles.boton}>
        <Button title="Guardar receta" onPress={guardarReceta} />
      </View>

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
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  boton: {
    marginBottom: 15,
  },
});
