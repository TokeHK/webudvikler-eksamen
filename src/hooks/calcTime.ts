export default function calcTime(dato: string) {
  /* fra API = "date": "2025-10-15T23:51:00.000Z" */
  const now: Date = new Date();/* lav en ny "Date" når calcTime() kører */
  const past: Date = new Date(dato);
  const diffMs: number = now.getTime() - past.getTime();/* Date bliver ændret til milisekunder og beregner */

  const seconds: number = Math.floor(diffMs / 1000);/* regner milisekunder og op */
  const minutes: number = Math.floor(seconds / 60);
  const hours: number   = Math.floor(minutes / 60);
  const days: number    = Math.floor(hours / 24);
  const months: number  = Math.floor(days / 30);
  const years: number   = Math.floor(days / 365);
  /* math floor runder ned (så år/måneder er upræcise) */
  /* Kunne godt have en præcis dato på article undersider men det er ikke i designet */

  if (years > 0)   return `${years} År${years > 1} siden`;
  if (months > 0)  return `${months} Måned${months > 1 ? 'er' : ''} siden`;
  if (days > 0)    return `${days} Dag${days > 1 ? 'e' : ''} siden`;
  if (hours > 0)   return `${hours} Time${hours > 1 ? 'r' : ''} siden`;
  if (minutes > 0) return `${minutes} Minut${minutes > 1 ? 'ter' : ''} siden`;
  return `${seconds} Sekund${seconds !== 1 ? 'er' : ''} siden`;
}