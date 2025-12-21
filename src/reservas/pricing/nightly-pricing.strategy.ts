import { Injectable } from '@nestjs/common';
import { PricingStrategy } from '../strategies/pricing.strategy';
@Injectable()
export class NightlyPricingStrategy implements PricingStrategy {
  calculate(data: { precio: number; cantidad: number }): number {
    return data.precio * data.cantidad;
  }
}
