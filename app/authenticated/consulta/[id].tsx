// app/authenticated/consulta/[id].tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  getConsultaById,
  applyToConsulta,
  checkApplicationStatus,
  deleteApplication,
} from "@/services/consultasService";
import { List } from "@/interfaces/consultas";
import Header from "@/app/layouts/header";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ConsultaDetailScreen: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const [consulta, setConsulta] = useState<List | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [candidatoId, setCandidatoId] = useState<number | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user?.role !== "doctor") {
      router.replace("/authenticated/home");
      return;
    }

    const fetchConsulta = async () => {
      try {
        const data = await getConsultaById(parseInt(id));
        setConsulta(data);
        if (user) {
          const { exists, candidatoId } = await checkApplicationStatus(
            parseInt(id),
            user.id
          );
          setHasApplied(exists);
          setCandidatoId(candidatoId ?? null);
        }
      } catch (error) {
        console.error("Error fetching consulta details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsulta();
  }, [id, user, router]);

  const handleApply = () => {
    setVisible(true);
  };

  const confirmApply = async () => {
    try {
      if (consulta && user) {
        await applyToConsulta(consulta.id, user.id);
        setVisible(false);
        setHasApplied(true);
        Alert.alert("Éxito", "Has aplicado a la consulta correctamente.");
      }
    } catch (error) {
      setVisible(false);
      Alert.alert("Error", "No se pudo aplicar a la consulta.");
    }
  };

  const confirmDelete = async () => {
    try {
      if (candidatoId !== null) {
        await deleteApplication(candidatoId);
        setDeleteVisible(false);
        setHasApplied(false);
        setCandidatoId(null);
        Alert.alert("Éxito", "La candidatura ha sido eliminada correctamente.");
      }
    } catch (error) {
      setDeleteVisible(false);
      Alert.alert("Error", "No se pudo eliminar la candidatura.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!consulta) {
    return <Text>No details found.</Text>;
  }

  return (
    <Provider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Header />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <View style={styles.content}>
            <Text style={styles.title}>Consulta Details</Text>
            <Text style={styles.label}>Motivo: {consulta.motivoConsulta}</Text>
            <Text style={styles.label}>
              Descripción: {consulta.descripcionConsulta}
            </Text>
            <Text style={styles.label}>
              Fecha: {new Date(consulta.fechaConsulta).toLocaleDateString()}
            </Text>
            {hasApplied ? (
              <Pressable
                style={styles.applyButton}
                onPress={() => setDeleteVisible(true)}
              >
                <Text style={styles.applyButtonText}>Eliminar Aplicación</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </Pressable>
            )}
          </View>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={() => setVisible(false)}
              contentContainerStyle={styles.modalContainer}
            >
              <Text style={styles.modalTitle}>Confirmación</Text>
              <Text style={styles.modalText}>
                ¿Estás seguro de que deseas aplicar a esta consulta?
              </Text>
              <View style={styles.modalButtons}>
                <Button mode="outlined" onPress={() => setVisible(false)}>
                  Cancelar
                </Button>
                <Button mode="contained" onPress={confirmApply}>
                  Confirmar
                </Button>
              </View>
            </Modal>
            <Modal
              visible={deleteVisible}
              onDismiss={() => setDeleteVisible(false)}
              contentContainerStyle={styles.modalContainer}
            >
              <Text style={styles.modalTitle}>Confirmación</Text>
              <Text style={styles.modalText}>
                ¿Estás seguro de que deseas eliminar esta candidatura?
              </Text>
              <View style={styles.modalButtons}>
                <Button mode="outlined" onPress={() => setDeleteVisible(false)}>
                  Cancelar
                </Button>
                <Button mode="contained" onPress={confirmDelete}>
                  Confirmar
                </Button>
              </View>
            </Modal>
          </Portal>
        </View>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7f9cc",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  applyButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ConsultaDetailScreen;
