export const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Size = (typeof SIZES)[number];

export const CUTS = ['Recto', 'Slim', 'Oxford', 'Skinny', 'Cargo', 'Jogger'] as const
export type Cut = (typeof CUTS)[number];


export interface PantalonModel {
  id: string;
  modelName: string;
  salePrice: number;
  isInStore: boolean;
  size: Size;
  cut: Cut;
  notes: string;
}

export type PantalonForm = Omit<PantalonModel, 'id' | 'size' | 'cut'> &{
  size: Size | '';
  cut: Cut | '';
};

