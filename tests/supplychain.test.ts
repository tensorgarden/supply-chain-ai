import { describe, it, expect } from "vitest";
import {
  demoProducts,
  demoSuppliers,
  demoInventory,
  demoQualityChecks,
  demoDemandForecasts,
  demoSupplierRiskExposures,
  demoPurchaseOrders,
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

  it("supplier risk exposures reference known products and suppliers", () => {
    const productIds = new Set(demoProducts.map((p) => p.id));
    const supplierIds = new Set(demoSuppliers.map((s) => s.id));

    for (const risk of demoSupplierRiskExposures) {
      expect(
        supplierIds.has(risk.supplierId),
        `Risk ${risk.id} has unknown supplier ${risk.supplierId}`
      ).toBe(true);
      expect(
        productIds.has(risk.productId),
        `Risk ${risk.id} has unknown product ${risk.productId}`
      ).toBe(true);
    }
  });

  it("high supplier risks include concrete mitigation and review dates", () => {
    const highRisks = demoSupplierRiskExposures.filter((risk) =>
      ["high", "critical"].includes(risk.severity)
    );

    expect(highRisks.length).toBeGreaterThan(0);
    for (const risk of highRisks) {
      expect(risk.probability).toBeGreaterThanOrEqual(50);
      expect(risk.probability).toBeLessThanOrEqual(100);
      expect(risk.mitigation.length).toBeGreaterThan(40);
      expect(new Date(risk.lastReviewed).toString()).not.toBe("Invalid Date");
    }
  });

  it("maps tariff and concentration exposure beyond first-tier suppliers", () => {
    const upstreamRisks = demoSupplierRiskExposures.filter(
      (risk) => risk.tier !== "tier_1"
    );
    const riskTypes = new Set(upstreamRisks.map((risk) => risk.riskType));

    expect(upstreamRisks.length).toBeGreaterThanOrEqual(2);
    expect(riskTypes.has("tariff_exposure")).toBe(true);
    expect(riskTypes.has("concentration_risk")).toBe(true);
  });

  it("covers all four SupplierRiskType values with at least one demo risk record each", () => {
    const riskTypes = new Set(
      demoSupplierRiskExposures.map((risk) => risk.riskType)
    );
    expect(riskTypes.has("tariff_exposure")).toBe(true);
    expect(riskTypes.has("subtier_visibility")).toBe(true);
    expect(riskTypes.has("concentration_risk")).toBe(true);
    expect(riskTypes.has("lead_time_volatility")).toBe(true);
    expect(riskTypes.size).toBe(4);
  });

  it("lead time volatility exposure is mapped beyond first-tier suppliers", () => {
    const upstreamVolatility = demoSupplierRiskExposures.filter(
      (risk) =>
        risk.riskType === "lead_time_volatility" && risk.tier !== "tier_1"
    );

    expect(upstreamVolatility.length).toBeGreaterThanOrEqual(1);
    for (const risk of upstreamVolatility) {
      expect(risk.probability).toBeGreaterThanOrEqual(50);
      expect(risk.mitigation.length).toBeGreaterThan(40);
      expect(new Date(risk.lastReviewed).toString()).not.toBe("Invalid Date");
    }
  });

  describe("purchase orders -- execution tracking", () => {
    it("has at least 5 purchase orders", () => {
      expect(demoPurchaseOrders.length).toBeGreaterThanOrEqual(5);
    });

    it("every purchase order references a valid product and supplier", () => {
      const productIds = new Set(demoProducts.map((p) => p.id));
      const supplierIds = new Set(demoSuppliers.map((s) => s.id));

      for (const po of demoPurchaseOrders) {
        expect(
          productIds.has(po.productId),
          `PO ${po.id} has unknown product ${po.productId}`
        ).toBe(true);
        expect(
          supplierIds.has(po.supplierId),
          `PO ${po.id} has unknown supplier ${po.supplierId}`
        ).toBe(true);
      }
    });

    it("purchase order statuses are valid", () => {
      const validStatuses = [
        "pending",
        "confirmed",
        "in_transit",
        "received",
        "delayed",
      ];
      for (const po of demoPurchaseOrders) {
        expect(validStatuses).toContain(po.status);
      }
    });

    it("delay-risk fields use valid intervention labels", () => {
      const validDelayRisks = ["none", "watch", "at_risk", "delayed"];
      const validMitigationActions = [
        "none",
        "expedite_carrier",
        "reroute_lane",
        "split_shipment",
        "supplier_recovery_call",
      ];

      for (const po of demoPurchaseOrders) {
        expect(validDelayRisks).toContain(po.delayRisk);
        expect(validMitigationActions).toContain(po.mitigationAction);
        expect(po.estimatedDelayDays).toBeGreaterThanOrEqual(0);
      }
    });

    it("flags disrupted orders with carrier updates and mitigation actions", () => {
      const disruptedOrders = demoPurchaseOrders.filter((po) =>
        ["at_risk", "delayed"].includes(po.delayRisk)
      );

      expect(disruptedOrders.length).toBeGreaterThanOrEqual(2);
      expect(
        disruptedOrders.some((po) =>
          ["reroute_lane", "split_shipment", "expedite_carrier"].includes(
            po.mitigationAction
          )
        )
      ).toBe(true);

      for (const po of disruptedOrders) {
        expect(po.mitigationAction).not.toBe("none");
        expect(po.estimatedDelayDays).toBeGreaterThan(0);
        expect(po.lastCarrierUpdate).not.toBeNull();
        expect(new Date(po.lastCarrierUpdate!).toString()).not.toBe(
          "Invalid Date"
        );
      }
    });

    it("received orders have actualDeliveryDate set", () => {
      const received = demoPurchaseOrders.filter(
        (po) => po.status === "received"
      );
      expect(received.length).toBeGreaterThanOrEqual(1);
      for (const po of received) {
        expect(po.actualDeliveryDate).not.toBeNull();
        expect(new Date(po.actualDeliveryDate!).toString()).not.toBe(
          "Invalid Date"
        );
        expect(po.delayRisk).toBe("none");
        expect(po.mitigationAction).toBe("none");
        expect(po.estimatedDelayDays).toBe(0);
      }
    });

    it("non-received orders have null actualDeliveryDate", () => {
      const notReceived = demoPurchaseOrders.filter(
        (po) => po.status !== "received"
      );
      expect(notReceived.length).toBeGreaterThanOrEqual(1);
      for (const po of notReceived) {
        expect(po.actualDeliveryDate).toBeNull();
      }
    });

    it("pendingOrders metric matches non-received, non-cancelled count", () => {
      const pendingStatuses = new Set([
        "pending",
        "confirmed",
        "in_transit",
        "delayed",
      ]);
      const count = demoPurchaseOrders.filter((po) =>
        pendingStatuses.has(po.status)
      ).length;
      expect(demoMetrics.pendingOrders).toBe(count);
    });

    it("delayed orders have expectedDeliveryDate in the past", () => {
      const delayed = demoPurchaseOrders.filter(
        (po) => po.status === "delayed"
      );
      expect(delayed.length).toBeGreaterThanOrEqual(1);
      for (const po of delayed) {
        expect(new Date(po.expectedDeliveryDate).toString()).not.toBe(
          "Invalid Date"
        );
        expect(new Date(po.expectedDeliveryDate).getTime()).toBeLessThan(
          Date.now()
        );
      }
    });
  });
});
