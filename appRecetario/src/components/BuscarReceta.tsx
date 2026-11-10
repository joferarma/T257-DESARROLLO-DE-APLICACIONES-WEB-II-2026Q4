
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useRecetas } from "../context/RecetasContext";

export default function BuscarReceta() {
  const { recetas, buscarReceta, volverInicio } = useRecetas();

  const [busqueda, setBusqueda] = useState("");

  const resultados = recetas.filter((receta) =>
    receta.nombre.toLowerCase().includes(busqueda.toLowerCase().trim())
  );

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Buscar receta</Text>

      <Text>Escriba el nombre de la receta:</Text>

      <TextInput
        style={styles.input}
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder="Ejemplo: pollo"
      />

      {busqueda.trim() !== "" && (
        <View>
          <Text style={styles.subtitulo}>
            Resultados de la busqueda: {resultados.length}
          </Text>

          {resultados.length === 0 ? (
            <Text>No se encontraron recetas.</Text>
          ) : (
            resultados.map((receta) => (
              <View key={receta.id} style={styles.receta}>
                <Text style={styles.nombre}>{receta.nombre}</Text>

                <Text>Numero: {receta.id}</Text>

                <Button
                  title="Ver detalles"
                  onPress={() => buscarReceta(receta.id)}
                />
              </View>
            ))
          )}
        </View>
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
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  receta: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  boton: {
    marginTop: 20,
    marginBottom: 25,
  },
});
