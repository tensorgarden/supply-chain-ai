export type ProductCategory =
  | "raw_materials"
  | "components"
  | "finished_goods"
  | "packaging"
  | "consumables";

export type SupplierStatus = "active" | "under_review" | "suspended";

export type QualityResult = "pass" | "fail" | "conditional_pass";

export type DemandTrend = "up" | "down" | "stable";

export type SupplierRiskType =
  | "tariff_exposure"
  | "subtier_visibility"
  | "concentration_risk"
  | "lead_time_volatility";

export type SupplierRiskSeverity = "low" | "medium" | "high" | "critical";

export type SupplierTier = "tier_1" | "tier_2" | "tier_3";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  unitPrice: number;
  leadTimeDays: number;
  minStockLevel: number;
  supplierId: string;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  performanceScore: number;
  onTimeDeliveryRate: number;
  qualityRating: number;
  activeContracts: number;
  totalOrders: number;
  leadTimeAvg: number;
  status: SupplierStatus;
}

export interface InventoryItem {
  id: string;
  productId: string;
  warehouseLocation: string;
  quantityOnHand: number;
  quantityReserved: number;
  reorderPoint: number;
  reorderQuantity: number;
  lastRestocked: string;
  daysUntilStockout: number | null;
}

export interface QualityCheck {
  id: string;
  productId: string;
  supplierId: string;
  batchNumber: string;
  inspectionDate: string;
  result: QualityResult;
  defectRate: number;
  inspectorName: string;
  notes: string;
}

export interface DemandForecast {
  id: string;
  productId: string;
  month: string;
  forecastedDemand: number;
  actualDemand: number | null;
  confidenceLower: number;
  confidenceUpper: number;
  trend: DemandTrend;
}

export interface SupplierRiskExposure {
  id: string;
  supplierId: string;
  productId: string;
  riskType: SupplierRiskType;
  severity: SupplierRiskSeverity;
  region: string;
  tier: SupplierTier;
  probability: number;
  responseWindowDays: number;
  regionalFallback: string;
  decisionOwner: string;
  impact: string;
  mitigation: string;
  lastReviewed: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_transit"
  | "received"
  | "delayed";

export type OrderDelayRisk = "none" | "watch" | "at_risk" | "delayed";

export type OrderMitigationAction =
  | "none"
  | "expedite_carrier"
  | "reroute_lane"
  | "split_shipment"
  | "supplier_recovery_call";

export interface PurchaseOrder {
  id: string;
  productId: string;
  supplierId: string;
  quantity: number;
  unitPrice: number;
  status: OrderStatus;
  orderDate: string;
  expectedDeliveryDate: string;
  actualDeliveryDate: string | null;
  delayRisk: OrderDelayRisk;
  mitigationAction: OrderMitigationAction;
  lastCarrierUpdate: string | null;
  estimatedDelayDays: number;
}

export interface SupplyChainMetrics {
  totalProducts: number;
  activeSuppliers: number;
  totalInventoryValue: number;
  forecastAccuracy: number;
  lowStockItems: number;
  qualityPassRate: number;
  onTimeDeliveryAvg: number;
  pendingOrders: number;
}
