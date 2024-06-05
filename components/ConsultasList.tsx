import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { getConsultas } from "@/services/consultasService";
import { List as ListType } from "@/interfaces/consultas";
import Header from "@/app/layouts/header";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/context/UserContext";
import { Modal, Portal, Button, Provider } from "react-native-paper";

interface List extends ListType {}

const ConsultasList: React.FC = () => {
  const [consultas, setConsultas] = useState<List[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = useUser();

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await getConsultas(page, 10);
      setConsultas((prevConsultas) => [...prevConsultas, ...data.list]);
      setPage(page + 1);
      if (data.isLast) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching consultas:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshConsultas = async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    try {
      const data = await getConsultas(1, 10);
      setConsultas(data.list);
      if (data.isLast) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error refreshing consultas:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const renderItem = ({ item }: { item: List }) => (
    <TouchableOpacity
      style={[styles.consulta, activeItem === item.id && styles.activeConsulta]}
      onPressIn={() => setActiveItem(item.id)}
      onPressOut={() => setActiveItem(null)}
      onPress={() => router.push(`/authenticated/consulta/${item.id}`)}
    >
      <Text style={styles.text}>{item.motivoConsulta}</Text>
      <Text style={styles.text}>{item.descripcionConsulta}</Text>
      <Text style={styles.text}>
        {new Date(item.fechaConsulta).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  const handleScrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 50) {
      if (!showScrollToTop) {
        setShowScrollToTop(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    } else {
      if (showScrollToTop) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setShowScrollToTop(false));
      }
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={consultas}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={fetchConsultas}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshConsultas}
              progressViewOffset={100}
              colors={["#0000ff"]}
              progressBackgroundColor="#fff"
            />
          }
          ListHeaderComponent={<Header />}
          contentContainerStyle={styles.listContainer}
          onScroll={handleScroll}
        />
        {showScrollToTop && (
          <Animated.View
            style={[styles.scrollToTopButton, { opacity: fadeAnim }]}
          >
            <TouchableOpacity onPress={handleScrollToTop}>
              <Ionicons name="arrow-up" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  consulta: {
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeConsulta: {
    backgroundColor: "pink",
    shadowOpacity: 0,
  },
  text: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  scrollToTopButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default ConsultasList;
