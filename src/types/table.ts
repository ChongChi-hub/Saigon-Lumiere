export type TableStatus = 'available' | 'reserved' | 'occupied';

export interface Table {
  id: string;
  name: string;
  capacity: number;
  status: TableStatus;
}
