import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#c7f9cc",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});

export default globalStyles;
