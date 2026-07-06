import { useState } from "react";
import { Plus, ImageOff } from "lucide-react";
import { DataTable, RowActions, type Column } from "../../components/common/DataTable";
import { Button } from "../../components/common/Button";
import type { Product } from "../../types";
import { useAppSelector } from "../../app/hooks";
import { useDeleteProduct, useProducts } from "./useProducts";
import { SearchInput } from "../../components/common/SearchInput";
import { Pagination } from "../../components/common/Pagination";
import ProductFormModal from "./ProductFormModal";

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:5000";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { user } = useAppSelector((s) => s.auth);
  const canManage = user?.role === "admin" || user?.role === "manager";

  const { data, isLoading } = useProducts({ search, page, limit: 10 });
  const deleteMutation = useDeleteProduct();

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;
    setDeletingId(product._id);
    deleteMutation.mutate(product._id, {
      onSettled: () => setDeletingId(null),
    });
  };

  const columns: Column<Product>[] = [
    {
      header: "Image",
      render: (p) =>
        p.image ? (
          <img
            src={`${API_ORIGIN}${p.image}`}
            alt={p.name}
            className="h-10 w-10 rounded-md border border-gray-800 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-800 bg-gray-800/50 text-gray-600">
            <ImageOff size={16} />
          </div>
        ),
    },
    {
      header: "Name",
      render: (p) => <span className="font-medium text-white">{p.name}</span>,
    },
    {
      header: "SKU",
      render: (p) => <span className="font-mono text-xs text-gray-400">{p.sku}</span>,
    },
    { header: "Category", render: (p) => p.category },
    {
      header: "Selling Price",
      render: (p) => `৳${p.sellingPrice.toLocaleString()}`,
    },
    {
      header: "Stock",
      render: (p) => (
        <span
          className={
            p.stockQuantity < 5
              ? "rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-400"
              : "text-gray-300"
          }
        >
          {p.stockQuantity}
          {p.stockQuantity < 5 && " · low"}
        </span>
      ),
    },
    ...(canManage
      ? [
          {
            header: "Actions",
            render: (p: Product) => (
              <RowActions
                onEdit={() => openEditModal(p)}
                onDelete={() => handleDelete(p)}
                isDeleting={deletingId === p._id}
              />
            ),
          } as Column<Product>,
        ]
      : []),
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Products</h1>
          {data?.meta?.total !== undefined && (
            <p className="text-sm text-gray-500">{data.meta.total} total</p>
          )}
        </div>

        {canManage && (
          <Button onClick={openCreateModal} className="w-full sm:w-auto">
            <Plus size={16} className="mr-1 inline" /> Add Product
          </Button>
        )}
      </div>

      <SearchInput
        value={search}
        onChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        placeholder="Search by name, SKU, category..."
      />

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        emptyMessage={search ? `No products match "${search}"` : "No products yet"}
        rowKey={(p) => p._id}
      />

      <Pagination page={page} totalPages={data?.meta?.totalPages || 1} onPageChange={setPage} />

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct}
      />
    </div>
  );
}