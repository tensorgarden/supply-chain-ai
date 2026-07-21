import {
  demoProducts,
  demoSuppliers,
  demoInventory,
  demoQualityChecks,
  demoDemandForecasts,
  demoSupplierRiskExposures,
  demoPurchaseOrders,
  demoSupplierCorrectiveActions,
  demoMetrics,
} from "@/lib/demo-data";
import type {
  Product,
  Supplier,
  InventoryItem,
  QualityCheck,
  DemandForecast,
  SupplierRiskExposure,
  PurchaseOrder,
  SupplierCorrectiveAction,
} from "@/lib/types";

// --- Reusable components ---

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "slate" | "green" | "red" | "amber" | "blue" | "purple";
}) {
  const tones: Record<string, string> = {
    slate: "border-slate-200 bg-white text-slate-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    red: "border-red-200 bg-red-50 text-red-700",
    amber: "border-amber-200 bg-amber-50 text-amber-800",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    purple: "border-indigo-200 bg-indigo-50 text-indigo-700",
  };
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone] || tones.slate}`}
    >
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-white/70 bg-white/85 p-6 shadow-sm backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}

function ProgressBar({
  value,
  color = "indigo",
}: {
  value: number;
  color?: string;
}) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-500",
    red: "bg-red-500",
    blue: "bg-blue-600",
  };
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
      <div
        className={`h-full rounded-full ${colors[color] || colors.indigo}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    pass: "bg-emerald-400",
    fail: "bg-red-400",
    conditional_pass: "bg-amber-400",
    active: "bg-emerald-400",
    under_review: "bg-amber-400",
    suspended: "bg-red-400",
    up: "bg-emerald-400",
    down: "bg-red-400",
    stable: "bg-blue-400",
    low: "bg-red-400",
    ok: "bg-emerald-400",
    critical: "bg-red-400",
    pending: "bg-slate-400",
    confirmed: "bg-blue-400",
    in_transit: "bg-amber-400",
    received: "bg-emerald-400",
    delayed: "bg-red-400",
  };
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${map[status] || "bg-slate-400"}`}
    />
  );
}

function StatCard({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  const borders: Record<string, string> = {
    slate: "border-l-slate-300",
    green: "border-l-emerald-300",
    amber: "border-l-amber-300",
    red: "border-l-red-300",
    blue: "border-l-blue-300",
    purple: "border-l-indigo-300",
  };
  return (
    <div
      className={`rounded-2xl bg-white/90 p-5 shadow-sm border-l-4 ${borders[tone] || borders.slate}`}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

// --- Helpers ---

function formatCurrency(n: number): string {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function findProduct(id: string): Product | undefined {
  return demoProducts.find((p) => p.id === id);
}

function findSupplier(id: string): Supplier | undefined {
  return demoSuppliers.find((s) => s.id === id);
}

function qualityResultLabel(r: string): string {
  const labels: Record<string, string> = {
    pass: "Pass",
    fail: "Fail",
    conditional_pass: "Conditional",
  };
  return labels[r] || r;
}

function qualityResultTone(
  r: string
): "green" | "red" | "amber" | "slate" {
  if (r === "pass") return "green";
  if (r === "fail") return "red";
  if (r === "conditional_pass") return "amber";
  return "slate";
}

function trendIcon(trend: string): string {
  if (trend === "up") return "\u2191";
  if (trend === "down") return "\u2193";
  return "\u2192";
}

function stockStatus(item: InventoryItem): "critical" | "low" | "ok" {
  if (item.quantityOnHand <= item.reorderPoint * 0.5) return "critical";
  if (item.quantityOnHand <= item.reorderPoint) return "low";
  return "ok";
}

// --- Hero stats ---

function HeroStats() {
  const m = demoMetrics;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Products Tracked"
        value={String(m.totalProducts)}
        tone="blue"
      />
      <StatCard
        label="Active Suppliers"
        value={String(m.activeSuppliers)}
        tone="purple"
      />
      <StatCard
        label="Inventory Value"
        value={formatCurrency(m.totalInventoryValue)}
        tone="green"
      />
      <StatCard
        label="Forecast Accuracy"
        value={`${m.forecastAccuracy}%`}
        tone="amber"
      />
    </div>
  );
}

// --- Inventory health grid ---

function InventoryRow({ item }: { item: InventoryItem }) {
  const product = findProduct(item.productId);
  const status = stockStatus(item);
  const statusLabel =
    status === "critical"
      ? "Critical"
      : status === "low"
        ? "Low Stock"
        : "In Stock";
  const statusTone = status === "critical" ? "red" : status === "low" ? "amber" : "green";
  const available = item.quantityOnHand - item.quantityReserved;
  const fillPct = Math.min(100, (available / item.reorderQuantity) * 100);
  const barColor =
    status === "critical" ? "red" : status === "low" ? "amber" : "emerald";

  return (
    <div className="flex items-center gap-4 border-b border-slate-100 py-3 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <StatusDot status={status} />
          <span className="font-semibold text-sm text-slate-900 truncate">
            {product?.name || item.productId}
          </span>
          <Badge tone={statusTone}>{statusLabel}</Badge>
        </div>
        <div className="text-xs text-slate-500 mt-0.5">
          {product?.sku || ""} · {item.warehouseLocation}
        </div>
      </div>
      <div className="w-32 shrink-0">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>
            {available} / {item.reorderQuantity}
          </span>
          <span>
            {item.daysUntilStockout !== null
              ? `${item.daysUntilStockout}d`
              : "--"}
          </span>
        </div>
        <ProgressBar value={fillPct} color={barColor} />
      </div>
    </div>
  );
}

function InventoryHealthGrid() {
  const sorted = [...demoInventory].sort(
    (a, b) => a.quantityOnHand / a.reorderPoint - b.quantityOnHand / b.reorderPoint
  );
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Inventory Health</h2>
        <Badge tone="amber">{demoMetrics.lowStockItems} reorder alerts</Badge>
      </div>
      <div>
        {sorted.map((item) => (
          <InventoryRow key={item.id} item={item} />
        ))}
      </div>
    </Card>
  );
}

// --- Supplier performance scorecards ---

function SupplierCard({ supplier }: { supplier: Supplier }) {
  const perfColor =
    supplier.performanceScore >= 90
      ? "text-emerald-600"
      : supplier.performanceScore >= 80
        ? "text-amber-600"
        : "text-red-600";
  const statusTone =
    supplier.status === "active"
      ? "green"
      : supplier.status === "under_review"
        ? "amber"
        : "red";
  const barColor =
    supplier.performanceScore >= 90
      ? "emerald"
      : supplier.performanceScore >= 80
        ? "amber"
        : "red";

  return (
    <div className="rounded-2xl bg-white/90 p-5 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold text-slate-900">{supplier.name}</span>
        <Badge tone={statusTone}>
          {supplier.status.replace("_", " ")}
        </Badge>
      </div>
      <div className="text-xs text-slate-500 mb-3">
        {supplier.code} · Rating {supplier.qualityRating}/5.0 · {supplier.totalOrders} orders
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className={`text-lg font-bold ${perfColor}`}>
            {supplier.performanceScore}
          </div>
          <div className="text-xs text-slate-400">score</div>
        </div>
        <div>
          <div className="text-lg font-bold text-slate-800">
            {supplier.onTimeDeliveryRate}%
          </div>
          <div className="text-xs text-slate-400">on-time</div>
        </div>
        <div>
          <div className="text-lg font-bold text-slate-800">
            {supplier.leadTimeAvg}d
          </div>
          <div className="text-xs text-slate-400">lead time</div>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar value={supplier.performanceScore} color={barColor} />
      </div>
    </div>
  );
}

function SupplierPerformance() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Supplier Performance
        </h2>
        <span className="text-xs text-slate-500">
          {demoSuppliers.length} suppliers
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...demoSuppliers]
          .sort((a, b) => b.performanceScore - a.performanceScore)
          .map((s) => (
            <SupplierCard key={s.id} supplier={s} />
          ))}
      </div>
    </Card>
  );
}

function riskTypeLabel(riskType: string): string {
  const labels: Record<string, string> = {
    tariff_exposure: "Tariff exposure",
    subtier_visibility: "Sub-tier visibility",
    concentration_risk: "Concentration risk",
    lead_time_volatility: "Lead-time volatility",
    capacity_bottleneck: "Capacity bottleneck",
    financial_distress: "Financial distress",
  };
  return labels[riskType] || riskType.replace("_", " ");
}

function riskSeverityTone(
  severity: string
): "green" | "red" | "amber" | "slate" {
  if (severity === "critical" || severity === "high") return "red";
  if (severity === "medium") return "amber";
  if (severity === "low") return "green";
  return "slate";
}

function riskSeverityDot(severity: string): string {
  const dots: Record<string, string> = {
    critical: "bg-red-500",
    high: "bg-red-400",
    medium: "bg-amber-400",
    low: "bg-emerald-400",
  };
  return dots[severity] || "bg-slate-400";
}

function SupplierRiskCard({ risk }: { risk: SupplierRiskExposure }) {
  const supplier = findSupplier(risk.supplierId);
  const product = findProduct(risk.productId);
  const reviewed = new Date(risk.lastReviewed).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-xl border border-slate-100 bg-white/90 p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-full ${riskSeverityDot(risk.severity)}`}
          />
          <span className="text-sm font-semibold text-slate-900">
            {riskTypeLabel(risk.riskType)}
          </span>
        </div>
        <Badge tone={riskSeverityTone(risk.severity)}>
          {risk.severity}
        </Badge>
      </div>
      <div className="text-xs text-slate-500">
        {supplier?.name || risk.supplierId} · {product?.sku || risk.productId}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <div>
          <div className="text-slate-400">Lane</div>
          <div className="font-semibold text-slate-700">{risk.region}</div>
        </div>
        <div>
          <div className="text-slate-400">Tier</div>
          <div className="font-semibold text-slate-700">
            {risk.tier.replace("_", " ").toUpperCase()}
          </div>
        </div>
        <div>
          <div className="text-slate-400">Risk</div>
          <div className="font-semibold text-slate-700">
            {risk.probability}%
          </div>
        </div>
        <div>
          <div className="text-slate-400">Response</div>
          <div className="font-semibold text-slate-700">
            {risk.responseWindowDays}d
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">
        {risk.impact}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        <span className="font-semibold text-slate-700">Mitigation:</span>{" "}
        {risk.mitigation}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        <span className="font-semibold text-slate-700">Regional fallback:</span>{" "}
        {risk.regionalFallback}
      </p>
      <div className="mt-2 text-[11px] uppercase tracking-wide text-slate-400">
        Reviewed {reviewed} · Owner {risk.decisionOwner}
      </div>
    </div>
  );
}

function SupplierRiskPanel() {
  const highRiskCount = demoSupplierRiskExposures.filter((risk) =>
    ["high", "critical"].includes(risk.severity)
  ).length;

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Supplier Risk Watch
        </h2>
        <Badge tone={highRiskCount > 0 ? "red" : "green"}>
          {highRiskCount} high
        </Badge>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-slate-500">
        Tracks tariff, concentration, sub-tier visibility, capacity bottlenecks,
        financial distress, and regional fallback playbooks before risks cascade
        into shortages or margin surprises.
      </p>
      <div className="space-y-3">
        {[...demoSupplierRiskExposures]
          .sort((a, b) => b.probability - a.probability)
          .map((risk) => (
            <SupplierRiskCard key={risk.id} risk={risk} />
          ))}
      </div>
    </Card>
  );
}

// --- Quality control panel ---

function QualityCheckRow({ check }: { check: QualityCheck }) {
  const product = findProduct(check.productId);
  const supplier = findSupplier(check.supplierId);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <StatusDot status={check.result} />
          <span className="font-semibold text-slate-900 text-sm">
            {check.batchNumber}
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge tone={qualityResultTone(check.result)}>
          {qualityResultLabel(check.result)}
        </Badge>
      </td>
      <td className="py-3 px-4 text-sm text-slate-700">
        {product?.name || check.productId}
      </td>
      <td className="py-3 px-4 text-sm text-slate-600">
        {supplier?.name || check.supplierId}
      </td>
      <td className="py-3 px-4 text-sm text-slate-600">
        {check.defectRate.toFixed(2)}%
      </td>
      <td className="py-3 px-4 text-sm text-slate-600">
        {new Date(check.inspectionDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="py-3 px-4 text-sm text-slate-500 max-w-[200px] truncate">
        {check.notes}
      </td>
    </tr>
  );
}

function correctiveActionTone(
  status: SupplierCorrectiveAction["status"]
): "green" | "amber" | "red" {
  if (status === "closed") return "green";
  if (status === "verification_pending") return "amber";
  return "red";
}

function CorrectiveActionQueue() {
  const unresolved = demoSupplierCorrectiveActions.filter(
    (action) => action.status !== "closed"
  );

  return (
    <div className="mt-5 border-t border-slate-100 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">
          Corrective Action Queue
        </h3>
        <Badge tone={unresolved.length > 0 ? "red" : "green"}>
          {unresolved.length} open
        </Badge>
      </div>
      <div className="space-y-2">
        {demoSupplierCorrectiveActions.map((action) => {
          const check = demoQualityChecks.find(
            (item) => item.id === action.qualityCheckId
          );
          const supplier = findSupplier(action.supplierId);

          return (
            <div
              key={action.id}
              className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">
                  {supplier?.name || action.supplierId}
                </span>
                <Badge tone={correctiveActionTone(action.status)}>
                  {action.status.replaceAll("_", " ")}
                </Badge>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">Containment:</span>{" "}
                {action.containmentAction}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                <span className="font-semibold text-slate-700">Effectiveness:</span>{" "}
                {action.effectivenessStatus} · Review{" "}
                <time dateTime={action.effectivenessReviewDate}>
                  {action.effectivenessReviewDate}
                </time>{" "}
                · {action.effectivenessCriteria}
                <span className="mt-1 block font-semibold text-slate-700">
                  Observations {action.effectivenessObservationsCompleted}/
                  {action.effectivenessObservationsRequired} · {action.repeatDefectsObserved} repeat defects
                </span>
              </p>
              <div className="mt-2 text-[11px] uppercase tracking-wide text-slate-400">
                {check?.batchNumber || action.qualityCheckId} · Due {action.dueDate} · {action.owner}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QualityControlPanel() {
  const passCount = demoQualityChecks.filter((q) => q.result === "pass").length;
  const failCount = demoQualityChecks.filter((q) => q.result === "fail").length;
  const condCount = demoQualityChecks.filter(
    (q) => q.result === "conditional_pass"
  ).length;
  const passRate = ((passCount / demoQualityChecks.length) * 100).toFixed(1);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Quality Control</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            <span className="font-semibold text-emerald-600">{passRate}%</span>{" "}
            pass rate
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center">
          <div className="text-2xl font-bold text-emerald-700">{passCount}</div>
          <div className="text-xs text-emerald-600 font-medium">Passed</div>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
          <div className="text-2xl font-bold text-amber-700">{condCount}</div>
          <div className="text-xs text-amber-600 font-medium">Conditional</div>
        </div>
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-center">
          <div className="text-2xl font-bold text-red-700">{failCount}</div>
          <div className="text-xs text-red-600 font-medium">Failed</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b-2 border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-2 px-4">Batch</th>
              <th className="py-2 px-4">Result</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Supplier</th>
              <th className="py-2 px-4">Defect %</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Notes</th>
            </tr>
          </thead>
          <tbody>
            {demoQualityChecks.map((qc) => (
              <QualityCheckRow key={qc.id} check={qc} />
            ))}
          </tbody>
        </table>
      </div>
      <CorrectiveActionQueue />
    </Card>
  );
}

// --- Demand forecast chart section ---

function ForecastCard({ forecast }: { forecast: DemandForecast }) {
  const product = findProduct(forecast.productId);
  const monthLabel = new Date(forecast.month + "-01").toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  return (
    <div className="rounded-xl bg-white/80 border border-slate-100 p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-semibold text-sm text-slate-900">
            {product?.name || forecast.productId}
          </span>
          <div className="text-xs text-slate-400">{monthLabel}</div>
        </div>
        <div className="flex items-center gap-1">
          <StatusDot status={forecast.trend} />
          <span className="text-xs font-medium text-slate-500">
            {trendIcon(forecast.trend)} {forecast.trend}
          </span>
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900">
        {forecast.forecastedDemand.toLocaleString()}
      </div>
      <div className="text-xs text-slate-400 mt-1">
        Range: {forecast.confidenceLower.toLocaleString()} --{" "}
        {forecast.confidenceUpper.toLocaleString()} units
      </div>
      <div className="mt-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{
              width: `${Math.min(100, (forecast.forecastedDemand / forecast.confidenceUpper) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function DemandForecastChart() {
  const productsWithForecasts = [
    ...new Set(demoDemandForecasts.map((f) => f.productId)),
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Demand Forecast
        </h2>
        <Badge tone="blue">Jul -- Sep 2026</Badge>
      </div>
      <div className="space-y-6">
        {productsWithForecasts.map((productId) => {
          const product = findProduct(productId);
          const forecasts = demoDemandForecasts
            .filter((f) => f.productId === productId)
            .sort((a, b) => a.month.localeCompare(b.month));
          return (
            <div key={productId}>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">
                {product?.name || productId}{" "}
                <span className="font-normal text-slate-400">
                  ({product?.sku || ""})
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {forecasts.map((f) => (
                  <ForecastCard key={f.id} forecast={f} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// --- Low-stock alert panel ---

function LowStockAlertPanel() {
  const lowStockItems = demoInventory.filter(
    (item) => stockStatus(item) === "critical" || stockStatus(item) === "low"
  );

  if (lowStockItems.length === 0) {
    return (
      <Card>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Low-Stock Alerts
        </h2>
        <p className="text-sm text-slate-500">
          All inventory levels are healthy. No alerts.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">
          Low-Stock Alerts
        </h2>
        <Badge tone="red">{lowStockItems.length} items</Badge>
      </div>
      <div className="space-y-3">
        {lowStockItems.map((item) => {
          const product = findProduct(item.productId);
          const supplier = product
            ? findSupplier(product.supplierId)
            : undefined;
          const status = stockStatus(item);
          const available = item.quantityOnHand - item.quantityReserved;
          return (
            <div
              key={item.id}
              className={`rounded-xl border p-4 ${
                status === "critical"
                  ? "border-red-100 bg-red-50/60"
                  : "border-amber-100 bg-amber-50/60"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <StatusDot status={status} />
                <span className="font-semibold text-sm text-slate-900">
                  {product?.name || item.productId}
                </span>
                <Badge tone={status === "critical" ? "red" : "amber"}>
                  {status === "critical" ? "Critical" : "Low"}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                <div>
                  <div className="text-xs text-slate-400">On Hand</div>
                  <div className="font-semibold text-slate-800">
                    {available} / {item.reorderQuantity}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Reorder At</div>
                  <div className="font-semibold text-slate-800">
                    {item.reorderPoint}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Stockout In</div>
                  <div className="font-semibold text-red-600">
                    {item.daysUntilStockout !== null
                      ? `${item.daysUntilStockout} days`
                      : "N/A"}
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Supplier: {supplier?.name || "Unknown"} ·{" "}
                {product?.leadTimeDays || "?"}d lead time · Last restocked:{" "}
                {item.lastRestocked}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// --- Recent purchase orders ---

function orderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    in_transit: "In transit",
    received: "Received",
    delayed: "Delayed",
  };
  return labels[status] || status;
}

function orderStatusTone(
  status: string
): "green" | "red" | "amber" | "blue" | "slate" {
  if (status === "received") return "green";
  if (status === "delayed") return "red";
  if (status === "in_transit") return "amber";
  if (status === "confirmed") return "blue";
  return "slate";
}

function customsStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    domestic: "Domestic",
    documents_ready: "Docs ready",
    broker_review: "Broker review",
    customs_hold: "Customs hold",
  };
  return labels[status] || status.replace("_", " ");
}

function customsStatusTone(
  status: string
): "green" | "red" | "amber" | "blue" | "slate" {
  if (status === "customs_hold") return "red";
  if (status === "broker_review") return "amber";
  if (status === "documents_ready") return "blue";
  if (status === "domestic") return "green";
  return "slate";
}

function customsClearanceNote(po: PurchaseOrder): string {
  if (po.customsDelayReason) return po.customsDelayReason;
  if (po.customsBrokerEta) {
    return `Broker ETA ${new Date(po.customsBrokerEta).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  }
  return po.customsClearanceStatus === "domestic"
    ? "No cross-border clearance required"
    : "Customs documentation packet is ready";
}

function tariffExposureLabel(po: PurchaseOrder): string {
  if (po.tariffRatePercent === 0) {
    return `${po.countryOfOrigin} · no tariff exposure`;
  }

  const exposure = po.estimatedTariffExposure.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return `${po.countryOfOrigin} · ${po.tariffRatePercent.toFixed(1)}% est. duty · ${exposure} exposure`;
}

function RecentOrdersPanel() {
  const sorted = [...demoPurchaseOrders].sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
        <Badge tone={demoPurchaseOrders.some((po) => po.status === "delayed") ? "red" : "blue"}>
          {demoMetrics.pendingOrders} open
        </Badge>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-slate-500">
        Purchase order lifecycle with customs, country-of-origin, and tariff
        exposure warnings before delays become stockout or margin events.
      </p>
      <div className="space-y-2">
        {sorted.map((po) => {
          const product = findProduct(po.productId);
          const supplier = findSupplier(po.supplierId);
          const total = (po.quantity * po.unitPrice).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
          const orderDate = new Date(po.orderDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

          return (
            <div
              key={po.id}
              className="rounded-lg border border-slate-100 bg-white/80 p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <StatusDot status={po.status} />
                <span className="text-sm font-semibold text-slate-900 truncate">
                  {product?.name || po.productId}
                </span>
                <Badge tone={orderStatusTone(po.status)}>
                  {orderStatusLabel(po.status)}
                </Badge>
                <Badge tone={customsStatusTone(po.customsClearanceStatus)}>
                  {customsStatusLabel(po.customsClearanceStatus)}
                </Badge>
              </div>
              <div className="text-xs text-slate-500 grid grid-cols-2 gap-x-4 gap-y-0.5">
                <span>
                  {supplier?.code || po.supplierId} · {po.quantity.toLocaleString()} units
                </span>
                <span>{total}</span>
                <span>Ordered {orderDate}</span>
                <span>{po.status === "delayed" ? "Overdue" : `Due ${new Date(po.expectedDeliveryDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}</span>
              </div>
              <div className="mt-2 text-xs leading-relaxed text-slate-500">
                <span className="font-semibold text-slate-700">Customs:</span>{" "}
                {customsClearanceNote(po)}
              </div>
              <div className="mt-1 text-xs leading-relaxed text-slate-500">
                <span className="font-semibold text-slate-700">
                  Tariff exposure:
                </span>{" "}
                {tariffExposureLabel(po)}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// --- Main page ---

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 px-6 py-8 font-sans text-slate-900 antialiased">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Supply Chain AI
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Demand forecasting · quality control · inventory optimization ·
          supplier performance
        </p>
      </header>

      {/* Hero stats */}
      <HeroStats />

      {/* Two-column layout */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <InventoryHealthGrid />
          <SupplierPerformance />
          <DemandForecastChart />
        </div>

        {/* Side column */}
        <div className="space-y-6">
          <LowStockAlertPanel />
          <RecentOrdersPanel />
          <SupplierRiskPanel />
          <QualityControlPanel />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-400">
        Supply Chain AI · Portfolio demonstration · All data is fictional · No
        production keys or network calls
      </footer>
    </div>
  );
}
