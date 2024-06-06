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
}
export interface PaginatedResponse {
  categories: Category[];
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}
