export function generateCode(): string {
  const base = Math.random().toString(36).substring(2, 7);
  return base + base.length; // Plus-One Logic
}
