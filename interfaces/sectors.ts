// interfaces/sectors.ts
export interface Table {
  _id: string;
  tablename: string;
}

export interface Sector {
  sectorname: string;
  sectortables: Table[];
}

export interface PaginatedResponse<T> {
  sectors: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}
