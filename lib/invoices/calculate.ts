import type { LineItem } from '@/lib/types/db'

export function calcLineTotal(labor: number, parts: number): number {
  return labor + parts
}

export function calcSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.total, 0)
}

export function calcTax(subtotal: number, taxRate: number): number {
  return Math.round(subtotal * taxRate * 100) / 100
}

export function calcTotal(subtotal: number, tax: number): number {
  return Math.round((subtotal + tax) * 100) / 100
}
