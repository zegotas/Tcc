export interface ServicoProps {
  id: string;
  name: string;
  price: string;
  time: string;
  rating: number;
  image: string;
  restaurantId: string;
  description: string;
  prestador: string;
  location: string;
  type: string;
  estimado?: number;
  subtype?: string;
}
