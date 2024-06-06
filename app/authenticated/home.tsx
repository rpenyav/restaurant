import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useUser } from "@/context/UserContext";
import globalStyles from "@/styles/globalStyles";
import { UserRole } from "@/interfaces/user";
import useCheckToken from "@/hooks/useCheckToken";
import { RootStackParamList } from "@/interfaces/types";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "../layouts/header";
import { getSectors } from "@/services/sectorService";
import { Sector, PaginatedResponse } from "@/interfaces/sectors";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen: React.FC = () => {
  useCheckToken();
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response: PaginatedResponse = await getSectors(1, 10);
        setSectors(response.sectors);
      } catch (error) {
        console.error("Failed to fetch sectors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  const handleSectorSelect = (sector: Sector) => {
    setSelectedSector(sector);
  };

  const handleTableSelect = (table: string) => {
    if (selectedSector) {
      navigation.navigate("OrderDetails", {
        sector: selectedSector.sectorname,
        table,
      });
    }
  };

  const { user } = useUser();
  const allowedRoles = [
    UserRole.Guest,
    UserRole.Bartender,
    UserRole.Cheff,
    UserRole.Admin,
  ];

  if (!user) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!allowedRoles.includes(user.role as UserRole)) {
    return (
      <View style={globalStyles.container}>
        <Text>You do not have permission to view this content.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Header />
      <Text style={globalStyles.title}>Select a Sector</Text>
      <View style={styles.sectorList}>
        {sectors.map((sector) => (
          <TouchableOpacity
            key={sector.sectorname}
            style={[
              styles.sectorButton,
              selectedSector?.sectorname === sector.sectorname &&
                styles.selectedSectorButton,
            ]}
            onPress={() => handleSectorSelect(sector)}
          >
            <Text style={globalStyles.buttonText}>{sector.sectorname}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedSector && (
        <>
          <Text style={globalStyles.title}>
            Tables in {selectedSector.sectorname}
          </Text>
          <FlatList
            data={selectedSector.sectortables}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.tableButton}
                onPress={() => handleTableSelect(item.tablename)}
              >
                <Text style={globalStyles.buttonText}>{item.tablename}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectorButton: {
    ...globalStyles.button,
    margin: 5,
  },
  selectedSectorButton: {
    backgroundColor: "red",
  },
  tableList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tableButton: {
    ...globalStyles.button,
    margin: 5,
  },
});

export default HomeScreen;
