import { useState } from "react";
import { Trash2, Plus, ShoppingCart, AlertTriangle, Receipt } from "lucide-react";
import { useAllProducts, useCreateSale } from "./useSales";
import { Button } from "../../components/common/Button";

interface Line {
  product: string;
  quantity: number;
}

/**
 * Create Sale page.
 * - Multiple product line items with quantity
 * - Automatic grand total calculation (client-side preview;
 *   server recalculates authoritatively & enforces stock rules)
 */
export default function CreateSalePage() {
  const { data: products } = useAllProducts();
  const [lines, setLines] = useState<Line[]>([{ product: "", quantity: 1 }]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const createSale = useCreateSale();

  const getProduct = (id: string) => products?.find((p) => p._id === id);

  const validLines = lines.filter((l) => l.product);
  const itemCount = validLines.reduce((sum, l) => sum + l.quantity, 0);

  const grandTotal = lines.reduce((sum, line) => {
    const product = getProduct(line.product);
    return sum + (product ? product.sellingPrice * line.quantity : 0);
  }, 0);

  const updateLine = (index: number, patch: Partial<Line>) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setMessage(null);
    createSale.mutate(
      { items: lines.map((l) => ({ product: l.product, quantity: l.quantity })) },
      {
        onSuccess: () => {
          setMessage({ type: "success", text: "Sale created successfully!" });
          setLines([{ product: "", quantity: 1 }]);
        },
        onError: (err: any) => {
          setMessage({ type: "error", text: err?.response?.data?.message || "Failed to create sale" });
        },
      }
    );
  };

  const isValid =
    lines.length > 0 &&
    lines.every((l) => {
      const product = getProduct(l.product);
      return l.product && l.quantity > 0 && product && l.quantity <= product.stockQuantity;
    });

  const inputClasses =
    "rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center gap-2">
        <ShoppingCart className="text-sky-400" size={20} />
        <h1 className="text-xl font-semibold text-white">Create Sale</h1>
      </div>

      {message && (
        <p
          className={`rounded-md border p-3 text-sm ${
            message.type === "success"
              ? "border-emerald-800 bg-emerald-950 text-emerald-400"
              : "border-red-800 bg-red-950 text-red-400"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        {/* Line items */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              Items
            </h2>
            <span className="text-xs text-gray-500">
              {lines.length} line{lines.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3">
            {lines.map((line, idx) => {
              const product = getProduct(line.product);
              const overStock = !!product && line.quantity > product.stockQuantity;
              const subtotal = product ? product.sellingPrice * line.quantity : 0;

              return (
                <div
                  key={idx}
                  className={`rounded-lg border p-3 transition-colors ${
                    overStock ? "border-red-800/60 bg-red-950/20" : "border-gray-800 bg-gray-800/30"
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <select
                      value={line.product}
                      onChange={(e) => updateLine(idx, { product: e.target.value })}
                      className={`${inputClasses} flex-1`}
                    >
                      <option value="">Select product</option>
                      {products?.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} (Stock: {p.stockQuantity})
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) => updateLine(idx, { quantity: Number(e.target.value) })}
                        className={`${inputClasses} w-20`}
                      />

                      <button
                        onClick={() => removeLine(idx)}
                        disabled={lines.length === 1}
                        aria-label="Remove line"
                        className="rounded-md border border-gray-700 p-2 text-gray-500 transition-colors hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {product && (
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className={overStock ? "flex items-center gap-1 text-red-400" : "text-gray-500"}>
                        {overStock && <AlertTriangle size={12} />}
                        {overStock
                          ? `Only ${product.stockQuantity} in stock`
                          : `৳${product.sellingPrice.toFixed(2)} each`}
                      </span>
                      <span className="font-medium text-gray-300">৳{subtotal.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setLines((prev) => [...prev, { product: "", quantity: 1 }])}
              className="flex items-center gap-1.5 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
            >
              <Plus size={14} /> Add product line
            </button>
          </div>
        </div>

        {/* Summary — sticky on large screens */}
        <div className="lg:sticky lg:top-6">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-800 pb-4">
              <Receipt size={16} className="text-sky-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                Summary
              </h2>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Items</span>
                <span className="text-gray-300">{validLines.length}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total quantity</span>
                <span className="text-gray-300">{itemCount}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
              <span className="font-medium text-gray-300">Grand Total</span>
              <span className="text-xl font-semibold text-white">৳{grandTotal.toFixed(2)}</span>
            </div>

            <Button
              className="mt-5 w-full"
              disabled={createSale.isPending || !isValid}
              onClick={handleSubmit}
            >
              {createSale.isPending ? "Processing..." : "Complete Sale"}
            </Button>

            {!isValid && lines.some((l) => l.product) && (
              <p className="mt-2 text-center text-xs text-gray-500">
                Check quantities against available stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}