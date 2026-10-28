export const CUTS = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Cut = (typeof CUTS)[number];

export const SIZES = ['Recto', 'Slim', 'Oxford', 'Skinny', 'Cargo', 'Jogger']
export type Size = (typeof SIZES)[number];


export interface PantalonModel {
  id: string;
  modelName: string;
  salePrice: number;
  isInStore: boolean;
  size: Size;
  cut: Cut;
  notes: string;
}

export type PantalonForm = Omit<PantalonModel, 'id'>;

