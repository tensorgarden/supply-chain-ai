export type ProductCategory =
  | "raw_materials"
  | "components"
  | "finished_goods"
  | "packaging"
  | "consumables";

export type SupplierStatus = "active" | "under_review" | "suspended";

export type QualityResult = "pass" | "fail" | "conditional_pass";

export type DemandTrend = "up" | "down" | "stable";

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
