import { describe, it, expect } from 'vitest'
import { calcLineTotal, calcSubtotal, calcTax, calcTotal } from './calculate'

describe('calcLineTotal', () => {
  it('adds labor and parts', () => {
    expect(calcLineTotal(20, 45)).toBe(65)
  })
  it('handles zero parts (labor only)', () => {
    expect(calcLineTotal(25, 0)).toBe(25)
  })
  it('handles zero labor (parts only)', () => {
    expect(calcLineTotal(0, 28)).toBe(28)
  })
})

describe('calcSubtotal', () => {
  it('sums line item totals', () => {
    const items = [
      { description: 'Oil Change', labor: 20, parts: 45, total: 65 },
      { description: 'Brake Inspection', labor: 25, parts: 0, total: 25 },
    ]
    expect(calcSubtotal(items)).toBe(90)
  })
  it('returns 0 for empty array', () => {
    expect(calcSubtotal([])).toBe(0)
  })
})

describe('calcTax', () => {
  it('calculates 6% tax correctly', () => {
    expect(calcTax(100, 0.06)).toBe(6)
  })
  it('rounds to 2 decimal places', () => {
    expect(calcTax(204, 0.06)).toBe(12.24)
  })
  it('returns 0 for 0% tax rate', () => {
    expect(calcTax(200, 0)).toBe(0)
  })
})

describe('calcTotal', () => {
  it('adds subtotal and tax', () => {
    expect(calcTotal(90, 5.4)).toBe(95.4)
  })
  it('rounds floating point correctly', () => {
    expect(calcTotal(90.1, 5.41)).toBe(95.51)
  })
})
