// interfaces/categories.ts
export interface MenuItem {
  _id: string;
  namePlato: string;
  stock: number;
  disponible: boolean;
  precioUnidad: number;
  ingredientes: string;
  aptoCeliacos: boolean;
}

export interface Category {
  _id: string;
  nameCategoria: string;
  activo: boolean;
  items: MenuItem[];
  imagen: string;
}
export interface PaginatedResponse {
  data: Category[];
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}
