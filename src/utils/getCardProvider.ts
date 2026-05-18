import type { CardProvider } from '../types';

export function getCardProvider(cardNumber: string): CardProvider {
  const sanitized = cardNumber.replace(/\D/g, '');

  if (sanitized.length === 0) return 'Unknown';

  const firstDigit = sanitized[0];
  const firstTwo = parseInt(sanitized.slice(0, 2), 10);
  const firstFour = parseInt(sanitized.slice(0, 4), 10);

  if (firstDigit === '4') {
    return 'Visa';
  }

  if (
    (firstTwo >= 51 && firstTwo <= 55) ||
    (firstFour >= 2221 && firstFour <= 2720)
  ) {
    return 'Mastercard';
  }

  return 'Unknown';
}
