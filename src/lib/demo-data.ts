import type {
  Product,
  Supplier,
  InventoryItem,
  QualityCheck,
  DemandForecast,
  SupplyChainMetrics,
} from "./types";

export const demoProducts: Product[] = [
  { id: "prd_001", name: "Aluminum Sheet 2mm", sku: "ALU-200-2MM", category: "raw_materials", unitPrice: 42.50, leadTimeDays: 14, minStockLevel: 500, supplierId: "sup_001" },
  { id: "prd_002", name: "Steel Coil HRC", sku: "STL-HRC-001", category: "raw_materials", unitPrice: 680.00, leadTimeDays: 21, minStockLevel: 100, supplierId: "sup_002" },
  { id: "prd_003", name: "Copper Wire 12AWG", sku: "COP-12AWG", category: "raw_materials", unitPrice: 18.75, leadTimeDays: 10, minStockLevel: 2000, supplierId: "sup_003" },
  { id: "prd_004", name: "Semiconductor Chip A7", sku: "SEM-A7-040", category: "components", unitPrice: 12.40, leadTimeDays: 45, minStockLevel: 5000, supplierId: "sup_004" },
  { id: "prd_005", name: "PCB Board FR4 4-Layer", sku: "PCB-FR4-4L", category: "components", unitPrice: 8.90, leadTimeDays: 28, minStockLevel: 3000, supplierId: "sup_005" },
  { id: "prd_006", name: "Capacitor 100uF SMD", sku: "CAP-100UF-SMD", category: "components", unitPrice: 0.32, leadTimeDays: 18, minStockLevel: 25000, supplierId: "sup_004" },
  { id: "prd_007", name: "Injection Molded Housing", sku: "HSG-IM-220", category: "components", unitPrice: 3.85, leadTimeDays: 15, minStockLevel: 8000, supplierId: "sup_006" },
  { id: "prd_008", name: "Electric Motor 24V DC", sku: "MTR-24VDC-50", category: "finished_goods", unitPrice: 87.00, leadTimeDays: 30, minStockLevel: 200, supplierId: "sup_001" },
  { id: "prd_009", name: "Control Panel Assembly", sku: "CTL-PNL-ASM", category: "finished_goods", unitPrice: 1240.00, leadTimeDays: 35, minStockLevel: 50, supplierId: "sup_002" },
  { id: "prd_010", name: "Hydraulic Pump Unit", sku: "HYD-PMP-100", category: "finished_goods", unitPrice: 2950.00, leadTimeDays: 42, minStockLevel: 30, supplierId: "sup_007" },
  { id: "prd_011", name: "Corrugated Box Large", sku: "BOX-CORR-LG", category: "packaging", unitPrice: 1.20, leadTimeDays: 7, minStockLevel: 15000, supplierId: "sup_008" },
  { id: "prd_012", name: "Anti-Static Foam Sheet", sku: "FOAM-AS-010", category: "packaging", unitPrice: 2.45, leadTimeDays: 5, minStockLevel: 5000, supplierId: "sup_008" },
  { id: "prd_013", name: "Solder Wire SnPb 0.5mm", sku: "SLD-SNPB-05", category: "consumables", unitPrice: 28.00, leadTimeDays: 12, minStockLevel: 200, supplierId: "sup_005" },
  { id: "prd_014", name: "Thermal Paste Syringe", sku: "TP-SYR-10G", category: "consumables", unitPrice: 6.50, leadTimeDays: 8, minStockLevel: 1200, supplierId: "sup_003" },
  { id: "prd_015", name: "Lubricant Oil Synthetic", sku: "LUB-SYN-5L", category: "consumables", unitPrice: 34.80, leadTimeDays: 9, minStockLevel: 300, supplierId: "sup_007" },
];

export const demoSuppliers: Supplier[] = [
  { id: "sup_001", name: "Apex Metals International", code: "AMI", performanceScore: 92, onTimeDeliveryRate: 94, qualityRating: 4.7, activeContracts: 4, totalOrders: 1240, leadTimeAvg: 16, status: "active" },
  { id: "sup_002", name: "SteelWorks Heavy Industries", code: "SWH", performanceScore: 78, onTimeDeliveryRate: 82, qualityRating: 4.1, activeContracts: 3, totalOrders: 890, leadTimeAvg: 24, status: "under_review" },
  { id: "sup_003", name: "CopperTech Wire & Cable", code: "CTW", performanceScore: 88, onTimeDeliveryRate: 91, qualityRating: 4.4, activeContracts: 2, totalOrders: 1560, leadTimeAvg: 10, status: "active" },
  { id: "sup_004", name: "Nova Semiconductor Co.", code: "NSC", performanceScore: 95, onTimeDeliveryRate: 97, qualityRating: 4.9, activeContracts: 5, totalOrders: 3200, leadTimeAvg: 40, status: "active" },
  { id: "sup_005", name: "CircuitPro Manufacturing", code: "CPM", performanceScore: 85, onTimeDeliveryRate: 87, qualityRating: 4.3, activeContracts: 3, totalOrders: 2100, leadTimeAvg: 22, status: "active" },
  { id: "sup_006", name: "PolyForm Plastics Ltd", code: "PFP", performanceScore: 70, onTimeDeliveryRate: 74, qualityRating: 3.6, activeContracts: 2, totalOrders: 670, leadTimeAvg: 19, status: "under_review" },
  { id: "sup_007", name: "HydroMax Industrial Systems", code: "HMI", performanceScore: 90, onTimeDeliveryRate: 93, qualityRating: 4.6, activeContracts: 3, totalOrders: 540, leadTimeAvg: 38, status: "active" },
  { id: "sup_008", name: "PackRight Distribution", code: "PRD", performanceScore: 82, onTimeDeliveryRate: 85, qualityRating: 4.0, activeContracts: 6, totalOrders: 4800, leadTimeAvg: 6, status: "active" },
];

export const demoInventory: InventoryItem[] = [
  { id: "inv_001", productId: "prd_001", warehouseLocation: "WH-A-12", quantityOnHand: 420, quantityReserved: 80, reorderPoint: 500, reorderQuantity: 300, lastRestocked: "2026-05-28", daysUntilStockout: 18 },
  { id: "inv_002", productId: "prd_002", warehouseLocation: "WH-B-03", quantityOnHand: 115, quantityReserved: 25, reorderPoint: 100, reorderQuantity: 50, lastRestocked: "2026-06-01", daysUntilStockout: 32 },
  { id: "inv_003", productId: "prd_003", warehouseLocation: "WH-A-07", quantityOnHand: 1850, quantityReserved: 400, reorderPoint: 2000, reorderQuantity: 1000, lastRestocked: "2026-05-20", daysUntilStockout: 14 },
  { id: "inv_004", productId: "prd_004", warehouseLocation: "WH-C-22", quantityOnHand: 4800, quantityReserved: 1200, reorderPoint: 5000, reorderQuantity: 3000, lastRestocked: "2026-04-15", daysUntilStockout: 38 },
  { id: "inv_005", productId: "prd_005", warehouseLocation: "WH-C-18", quantityOnHand: 3100, quantityReserved: 600, reorderPoint: 3000, reorderQuantity: 2000, lastRestocked: "2026-05-10", daysUntilStockout: 25 },
  { id: "inv_006", productId: "prd_006", warehouseLocation: "WH-C-25", quantityOnHand: 22000, quantityReserved: 5000, reorderPoint: 25000, reorderQuantity: 15000, lastRestocked: "2026-04-28", daysUntilStockout: 9 },
  { id: "inv_007", productId: "prd_007", warehouseLocation: "WH-B-11", quantityOnHand: 7500, quantityReserved: 2000, reorderPoint: 8000, reorderQuantity: 4000, lastRestocked: "2026-05-15", daysUntilStockout: 11 },
  { id: "inv_008", productId: "prd_008", warehouseLocation: "WH-A-04", quantityOnHand: 185, quantityReserved: 40, reorderPoint: 200, reorderQuantity: 100, lastRestocked: "2026-05-22", daysUntilStockout: 7 },
  { id: "inv_009", productId: "prd_009", warehouseLocation: "WH-B-09", quantityOnHand: 48, quantityReserved: 12, reorderPoint: 50, reorderQuantity: 25, lastRestocked: "2026-06-05", daysUntilStockout: 15 },
  { id: "inv_010", productId: "prd_010", warehouseLocation: "WH-B-01", quantityOnHand: 32, quantityReserved: 6, reorderPoint: 30, reorderQuantity: 15, lastRestocked: "2026-05-30", daysUntilStockout: 28 },
  { id: "inv_011", productId: "prd_011", warehouseLocation: "WH-D-30", quantityOnHand: 16000, quantityReserved: 3000, reorderPoint: 15000, reorderQuantity: 8000, lastRestocked: "2026-06-08", daysUntilStockout: 20 },
  { id: "inv_012", productId: "prd_012", warehouseLocation: "WH-D-28", quantityOnHand: 4800, quantityReserved: 800, reorderPoint: 5000, reorderQuantity: 3000, lastRestocked: "2026-06-02", daysUntilStockout: 6 },
  { id: "inv_013", productId: "prd_013", warehouseLocation: "WH-C-14", quantityOnHand: 175, quantityReserved: 30, reorderPoint: 200, reorderQuantity: 100, lastRestocked: "2026-05-18", daysUntilStockout: 5 },
  { id: "inv_014", productId: "prd_014", warehouseLocation: "WH-C-16", quantityOnHand: 1300, quantityReserved: 250, reorderPoint: 1200, reorderQuantity: 600, lastRestocked: "2026-06-07", daysUntilStockout: 22 },
  { id: "inv_015", productId: "prd_015", warehouseLocation: "WH-A-02", quantityOnHand: 310, quantityReserved: 60, reorderPoint: 300, reorderQuantity: 150, lastRestocked: "2026-06-03", daysUntilStockout: 19 },
];

export const demoQualityChecks: QualityCheck[] = [
  { id: "qc_001", productId: "prd_004", supplierId: "sup_004", batchNumber: "SEM-A7-B2405", inspectionDate: "2026-06-08", result: "pass", defectRate: 0.12, inspectorName: "Maria Chen", notes: "All 500 units within tolerance. Electrical tests nominal." },
  { id: "qc_002", productId: "prd_005", supplierId: "sup_005", batchNumber: "PCB-FR4-B1180", inspectionDate: "2026-06-07", result: "pass", defectRate: 0.08, inspectorName: "James Okonkwo", notes: "Layer alignment verified. No delamination observed." },
  { id: "qc_003", productId: "prd_007", supplierId: "sup_006", batchNumber: "HSG-IM-B672", inspectionDate: "2026-06-06", result: "conditional_pass", defectRate: 2.40, inspectorName: "Maria Chen", notes: "Flash marks on 12 of 500 units. Acceptable per AQL 2.5 but supplier notified." },
  { id: "qc_004", productId: "prd_001", supplierId: "sup_001", batchNumber: "ALU-200-B921", inspectionDate: "2026-06-05", result: "pass", defectRate: 0.05, inspectorName: "David Park", notes: "Thickness gauge readings consistent. Surface finish excellent." },
  { id: "qc_005", productId: "prd_002", supplierId: "sup_002", batchNumber: "STL-HRC-B310", inspectionDate: "2026-06-04", result: "fail", defectRate: 8.60, inspectorName: "David Park", notes: "Tensile strength below spec on 43 of 500 coils. Batch rejected. RMA issued." },
  { id: "qc_006", productId: "prd_008", supplierId: "sup_001", batchNumber: "MTR-24-B145", inspectionDate: "2026-06-03", result: "pass", defectRate: 0.00, inspectorName: "Elena Torres", notes: "All 200 motors passed endurance test. Torque curves within spec." },
  { id: "qc_007", productId: "prd_006", supplierId: "sup_004", batchNumber: "CAP-100-B3320", inspectionDate: "2026-06-02", result: "pass", defectRate: 0.04, inspectorName: "Elena Torres", notes: "Capacitance values all within +/-5%. ESR measurements nominal." },
  { id: "qc_008", productId: "prd_009", supplierId: "sup_002", batchNumber: "CTL-PNL-B088", inspectionDate: "2026-06-01", result: "conditional_pass", defectRate: 1.80, inspectorName: "Maria Chen", notes: "Cosmetic scratches on 2 panels. Functionally OK. Supplier to improve packaging." },
  { id: "qc_009", productId: "prd_010", supplierId: "sup_007", batchNumber: "HYD-PMP-B052", inspectionDate: "2026-05-30", result: "pass", defectRate: 0.25, inspectorName: "David Park", notes: "Pressure and flow rate testing passed. One minor seal weep corrected on-site." },
  { id: "qc_010", productId: "prd_003", supplierId: "sup_003", batchNumber: "COP-12-B2200", inspectionDate: "2026-05-28", result: "pass", defectRate: 0.02, inspectorName: "James Okonkwo", notes: "Conductivity and gauge verified. Spool winding consistent." },
  { id: "qc_011", productId: "prd_011", supplierId: "sup_008", batchNumber: "BOX-CORR-B980", inspectionDate: "2026-05-26", result: "pass", defectRate: 0.50, inspectorName: "Elena Torres", notes: "Burst strength testing passed. Print alignment acceptable." },
  { id: "qc_012", productId: "prd_014", supplierId: "sup_003", batchNumber: "TP-SYR-B445", inspectionDate: "2026-05-25", result: "pass", defectRate: 0.10, inspectorName: "Maria Chen", notes: "Thermal conductivity verified. No leakage in packaging." },
];

export const demoDemandForecasts: DemandForecast[] = [
  { id: "df_001", productId: "prd_008", month: "2026-07", forecastedDemand: 180, actualDemand: null, confidenceLower: 165, confidenceUpper: 198, trend: "up" },
  { id: "df_002", productId: "prd_008", month: "2026-08", forecastedDemand: 195, actualDemand: null, confidenceLower: 175, confidenceUpper: 215, trend: "up" },
  { id: "df_003", productId: "prd_008", month: "2026-09", forecastedDemand: 210, actualDemand: null, confidenceLower: 185, confidenceUpper: 235, trend: "up" },
  { id: "df_004", productId: "prd_009", month: "2026-07", forecastedDemand: 42, actualDemand: null, confidenceLower: 36, confidenceUpper: 48, trend: "stable" },
  { id: "df_005", productId: "prd_009", month: "2026-08", forecastedDemand: 45, actualDemand: null, confidenceLower: 38, confidenceUpper: 52, trend: "stable" },
  { id: "df_006", productId: "prd_009", month: "2026-09", forecastedDemand: 44, actualDemand: null, confidenceLower: 37, confidenceUpper: 51, trend: "stable" },
  { id: "df_007", productId: "prd_004", month: "2026-07", forecastedDemand: 6200, actualDemand: null, confidenceLower: 5800, confidenceUpper: 6600, trend: "up" },
  { id: "df_008", productId: "prd_004", month: "2026-08", forecastedDemand: 6800, actualDemand: null, confidenceLower: 6300, confidenceUpper: 7300, trend: "up" },
  { id: "df_009", productId: "prd_004", month: "2026-09", forecastedDemand: 7400, actualDemand: null, confidenceLower: 6900, confidenceUpper: 7900, trend: "up" },
  { id: "df_010", productId: "prd_010", month: "2026-07", forecastedDemand: 28, actualDemand: null, confidenceLower: 24, confidenceUpper: 32, trend: "down" },
  { id: "df_011", productId: "prd_010", month: "2026-08", forecastedDemand: 25, actualDemand: null, confidenceLower: 20, confidenceUpper: 30, trend: "down" },
  { id: "df_012", productId: "prd_010", month: "2026-09", forecastedDemand: 22, actualDemand: null, confidenceLower: 17, confidenceUpper: 27, trend: "down" },
  { id: "df_013", productId: "prd_001", month: "2026-07", forecastedDemand: 480, actualDemand: null, confidenceLower: 440, confidenceUpper: 520, trend: "stable" },
  { id: "df_014", productId: "prd_001", month: "2026-08", forecastedDemand: 490, actualDemand: null, confidenceLower: 450, confidenceUpper: 530, trend: "stable" },
  { id: "df_015", productId: "prd_001", month: "2026-09", forecastedDemand: 485, actualDemand: null, confidenceLower: 445, confidenceUpper: 525, trend: "stable" },
  { id: "df_016", productId: "prd_005", month: "2026-07", forecastedDemand: 3500, actualDemand: null, confidenceLower: 3200, confidenceUpper: 3800, trend: "up" },
  { id: "df_017", productId: "prd_005", month: "2026-08", forecastedDemand: 3800, actualDemand: null, confidenceLower: 3450, confidenceUpper: 4150, trend: "up" },
  { id: "df_018", productId: "prd_005", month: "2026-09", forecastedDemand: 4100, actualDemand: null, confidenceLower: 3700, confidenceUpper: 4500, trend: "up" },
];

export const demoMetrics: SupplyChainMetrics = {
  totalProducts: 15,
  activeSuppliers: 8,
  totalInventoryValue: 2873500,
  forecastAccuracy: 91.4,
  lowStockItems: 9,
  qualityPassRate: 83.3,
  onTimeDeliveryAvg: 87.9,
  pendingOrders: 12,
};
