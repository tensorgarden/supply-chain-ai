import { describe, it, expect } from "vitest";
import {
  demoProducts,
  demoSuppliers,
  demoInventory,
  demoQualityChecks,
  demoDemandForecasts,
  demoMetrics,
} from "@/lib/demo-data";

describe("Supply Chain AI -- demo data integrity", () => {
  it("has at least 15 products", () => {
    expect(demoProducts.length).toBeGreaterThanOrEqual(15);
  });

  it("every product references a valid supplier", () => {
    const supplierIds = new Set(demoSuppliers.map((s) => s.id));
    for (const p of demoProducts) {
      expect(
        supplierIds.has(p.supplierId),
        `Product ${p.id} has unknown supplier ${p.supplierId}`
      ).toBe(true);
    }
  });

  it("every inventory item references a valid product", () => {
    const productIds = new Set(demoProducts.map((p) => p.id));
    for (const item of demoInventory) {
      expect(
        productIds.has(item.productId),
        `Inventory ${item.id} has unknown product ${item.productId}`
      ).toBe(true);
    }
  });

  it("every quality check references valid product and supplier", () => {
    const productIds = new Set(demoProducts.map((p) => p.id));
    const supplierIds = new Set(demoSuppliers.map((s) => s.id));
    for (const qc of demoQualityChecks) {
      expect(
        productIds.has(qc.productId),
        `QC ${qc.id} has unknown product ${qc.productId}`
      ).toBe(true);
      expect(
        supplierIds.has(qc.supplierId),
        `QC ${qc.id} has unknown supplier ${qc.supplierId}`
      ).toBe(true);
    }
  });

  it("every demand forecast references a valid product", () => {
    const productIds = new Set(demoProducts.map((p) => p.id));
    for (const f of demoDemandForecasts) {
      expect(
        productIds.has(f.productId),
        `Forecast ${f.id} has unknown product ${f.productId}`
      ).toBe(true);
    }
  });

  it("supplier performance scores are in valid range", () => {
    for (const s of demoSuppliers) {
      expect(s.performanceScore).toBeGreaterThanOrEqual(0);
      expect(s.performanceScore).toBeLessThanOrEqual(100);
      expect(s.onTimeDeliveryRate).toBeGreaterThanOrEqual(0);
      expect(s.onTimeDeliveryRate).toBeLessThanOrEqual(100);
      expect(s.qualityRating).toBeGreaterThanOrEqual(1);
      expect(s.qualityRating).toBeLessThanOrEqual(5);
    }
  });

  it("quality check defect rates are in valid range", () => {
    for (const qc of demoQualityChecks) {
      expect(qc.defectRate).toBeGreaterThanOrEqual(0);
      expect(qc.defectRate).toBeLessThanOrEqual(100);
    }
  });

  it("forecast confidence ranges are sensible", () => {
    for (const f of demoDemandForecasts) {
      expect(f.confidenceLower).toBeLessThan(f.forecastedDemand);
      expect(f.forecastedDemand).toBeLessThan(f.confidenceUpper);
      expect(["up", "down", "stable"]).toContain(f.trend);
    }
  });

  it("metrics values are internally consistent", () => {
    expect(demoMetrics.totalProducts).toBe(demoProducts.length);
    expect(demoMetrics.activeSuppliers).toBe(demoSuppliers.length);
    const lowStockCount = demoInventory.filter(
      (item) => item.quantityOnHand <= item.reorderPoint
    ).length;
    expect(demoMetrics.lowStockItems).toBe(lowStockCount);
    expect(demoMetrics.forecastAccuracy).toBeGreaterThan(0);
    expect(demoMetrics.forecastAccuracy).toBeLessThanOrEqual(100);
    expect(demoMetrics.qualityPassRate).toBeGreaterThan(0);
    expect(demoMetrics.qualityPassRate).toBeLessThanOrEqual(100);
  });

  it("inventory values are positive and reorder points sensible", () => {
    for (const item of demoInventory) {
      expect(item.quantityOnHand).toBeGreaterThanOrEqual(0);
      expect(item.reorderPoint).toBeGreaterThan(0);
      expect(item.reorderQuantity).toBeGreaterThan(0);
      expect(item.quantityReserved).toBeLessThanOrEqual(item.quantityOnHand);
    }
  });
});
