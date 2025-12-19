import { Injectable } from '@nestjs/common';
import { PricingStrategy } from './pricing.strategy';

@Injectable()
export class HourlyPricingStrategy implements PricingStrategy {
  calculate(data: { precio: number; cantidad: number }): number {
    return data.precio * data.cantidad;
  }
}
