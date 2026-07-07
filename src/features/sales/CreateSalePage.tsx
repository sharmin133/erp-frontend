import { useState } from "react";
import {
  Trash2,
  Plus,
  ShoppingCart,
  AlertTriangle,
  Receipt,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAllProducts, useCreateSale } from "./useSales";
import { Button } from "../../components/common/Button";
import { CustomSelect } from "../../components/common/CustomSelect";





interface Line {
  product: string;
  quantity: number;
}

export default function CreateSalePage() {
  const { data: products } = useAllProducts();
  const [lines, setLines] = useState<Line[]>([{ product: "", quantity: 1 }]);

  const createSale = useCreateSale();

  const getProduct = (id: string) => products?.find((p) => p._id === id);

  const validLines = lines.filter((l) => l.product);
  const itemCount = validLines.reduce((sum, l) => sum + l.quantity, 0);

  const grandTotal = lines.reduce((sum, line) => {
    const product = getProduct(line.product);
    return sum + (product ? product.sellingPrice * line.quantity : 0);
  }, 0);

  const updateLine = (index: number, patch: Partial<Line>) => {
    setLines((prev) =>
      prev.map((l, i) => (i === index ? { ...l, ...patch } : l)),
    );
  };

  const removeLine = (index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    createSale.mutate(
      {
        items: lines.map((l) => ({ product: l.product, quantity: l.quantity })),
      },
      {
        onSuccess: () => {

          toast.success("Sale created successfully!");
          setLines([{ product: "", quantity: 1 }]);
        },
        onError: (err: any) => {
          const errorText =
            err?.response?.data?.message || "Failed to create sale";
          toast.error(errorText);
        },
      },
    );
  };

  const isValid =
    lines.length > 0 &&
    lines.every((l) => {
      const product = getProduct(l.product);
      return (
        l.product &&
        l.quantity > 0 &&
        product &&
        l.quantity <= product.stockQuantity
      );
    });

  const inputClasses =
    "rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700";
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-green-600 text-white shadow-md">
    <ShoppingCart size={22} />
  </div>

  <h1 className="text-2xl font-semibold text-gray-900">
    Create Sale
  </h1>
</div>

    

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        {/* Line items */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Items
            </h2>

            <span className="text-xs text-gray-500">
              {lines.length} line{lines.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="max-h-135 space-y-3 overflow-y-auto pr-2">
            {lines.map((line, idx) => {
              const product = getProduct(line.product);
              const overStock =
                !!product && line.quantity > product.stockQuantity;
              const subtotal = product
                ? product.sellingPrice * line.quantity
                : 0;

              const productOptions = (products ?? []).map((p) => ({
                label: `${p.name} (Stock: ${p.stockQuantity})`,
                value: p._id,
                disabled: p.stockQuantity <= 0,
              }));

              return (
                <div
                  key={idx}
                  className={`rounded-lg border p-3 transition-colors ${
                    overStock
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <CustomSelect
                      value={line.product}
                      onChange={(val) => updateLine(idx, { product: val })}
                      options={productOptions}
                      placeholder="Select product"
                      className="flex-1"
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) =>
                          updateLine(idx, { quantity: Number(e.target.value) })
                        }
                        className={`${inputClasses} w-20`}
                      />

                      <button
                        onClick={() => removeLine(idx)}
                        disabled={lines.length === 1}
                        aria-label="Remove line"
                        className="rounded-md border border-gray-300 p-2 text-gray-500 transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {product && (
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span
                        className={
                          overStock
                            ? "flex items-center gap-1 text-red-600"
                            : "text-gray-500"
                        }
                      >
                        {overStock && <AlertTriangle size={12} />}
                        {overStock
                          ? `Only ${product.stockQuantity} in stock`
                          : `৳${product.sellingPrice.toFixed(2)} each`}
                      </span>
                      <span className="font-medium text-gray-900">
                        ৳{subtotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() =>
                setLines((prev) => [...prev, { product: "", quantity: 1 }])
              }
              className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
            >
              <Plus size={14} />
              Add product line
            </button>
          </div>
        </div>

        {/* Summary — sticky on large screens */}
        <div className="lg:sticky lg:top-6">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-gray-200 pb-4">
              <Receipt size={16} className="text-emerald-700" />

              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
                Summary
              </h2>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span className="font-medium text-gray-900">
                  {validLines.length}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Total quantity</span>
                <span className="font-medium text-gray-900">{itemCount}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="font-medium text-gray-700">Grand Total</span>

              <span className="text-2xl font-bold text-emerald-700">
                ৳{grandTotal.toFixed(2)}
              </span>
            </div>

            <Button
              className="mt-5 w-full"
              disabled={createSale.isPending || !isValid}
              onClick={handleSubmit}
            >
              {createSale.isPending ? "Processing..." : "Complete Sale"}
            </Button>

            {!isValid && lines.some((l) => l.product) && (
              <p className="mt-2 text-center text-xs text-red-500">
                Check quantities against available stock
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}