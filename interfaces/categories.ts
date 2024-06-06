export type Category =
  | "Entrantes"
  | "Tapas"
  | "Pasta"
  | "Cocina Mediterránea"
  | "Carnes"
  | "Pescados"
  | "Postres"
  | "Bebidas"
  | "Extras";

export interface MenuItems {
  [key: string]: string[];
}
