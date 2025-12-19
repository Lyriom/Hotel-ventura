export interface PricingStrategy {
/**
* Recibe un payload con la información mínima para calcular precio
* (fechas, tipo de tarifa, noches/horas, tarifaBase, etc.)
*/
calculate(payload: any): number;
}