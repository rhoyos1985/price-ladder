export interface PriceLevel {
  price: number;
  bidSize: number;
  askSize: number;
  volume: number;
}

export interface LadderState {
  levels: PriceLevel[];
}