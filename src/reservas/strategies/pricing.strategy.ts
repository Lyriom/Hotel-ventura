export interface PricingStrategy {
  calculate(data: {
    precio: number;
    cantidad: number;
  }): number;
}
