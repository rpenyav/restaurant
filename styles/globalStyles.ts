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
  breadcrumbs: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  breadcrumbButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  breadcrumbText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#007BFF",
  },

  categoryList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  categoryButtonText: {
    color: "#fff",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  itemButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  itemButtonText: {
    color: "#fff",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  counterText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  orderSummary: {
    marginTop: 20,
    alignItems: "center",
  },
  orderSummaryText: {
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedButton: {
    backgroundColor: "red",
  },
});

export default globalStyles;
