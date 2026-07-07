import { useState } from "react";
import { ImageOff, Package, Plus } from "lucide-react";
import { toast } from "react-toastify";

import { useAppSelector } from "../../app/hooks";
import { confirmDelete } from "../../components/common/confirmDelete";
import { Button } from "../../components/common/Button";
import {
  DataTable,
  RowActions,
  type Column,
} from "../../components/common/DataTable";
import { Pagination } from "../../components/common/Pagination";
import { SearchInput } from "../../components/common/SearchInput";
import type { Product } from "../../types";
import ProductFormModal from "./ProductFormModal";
import { useDeleteProduct, useProducts } from "./useProducts";

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:5000";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { user } = useAppSelector((state) => state.auth);

  const canManage = user?.role === "admin" || user?.role === "manager";

  const { data, isLoading } = useProducts({
    search,
    page,
    limit: 6,
  });

  const deleteMutation = useDeleteProduct();

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (product: Product) => {
    const confirmed = await confirmDelete(
      `Delete "${product.name}"? This can't be undone.`,
    );
    if (!confirmed) return;

    setDeletingId(product._id);

    deleteMutation.mutate(product._id, {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Failed to delete product",
        );
      },
      onSettled: () => setDeletingId(null),
    });
  };

  const columns: Column<Product>[] = [
    {
      header: "Image",
      render: (product) =>
        product.image ? (
          <img
            src={`${API_ORIGIN}${product.image}`}
            alt={product.name}
            className="h-10 w-10 rounded-md border border-gray-200 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-gray-100 text-gray-400">
            <ImageOff size={16} />
          </div>
        ),
    },
    {
      header: "Name",
      render: (product) => (
        <span className="font-medium text-gray-900">{product.name}</span>
      ),
    },
    {
      header: "SKU",
      render: (product) => (
        <span className="font-mono text-xs text-gray-500">{product.sku}</span>
      ),
    },
    {
      header: "Category",
      render: (product) => (
        <span className="text-gray-700">{product.category}</span>
      ),
    },
    {
      header: "Selling Price",
      render: (product) => (
        <span className="font-medium text-gray-900">
          ৳{product.sellingPrice.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Stock",
      render: (product) => (
        <span
          className={
            product.stockQuantity < 5
              ? "rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600"
              : "text-gray-700"
          }
        >
          {product.stockQuantity}
          {product.stockQuantity < 5 && " · Low"}
        </span>
      ),
    },
    ...(canManage
      ? [
          {
            header: "Actions",
            render: (product: Product) => (
              <RowActions
                onEdit={() => openEditModal(product)}
                onDelete={() => handleDelete(product)}
                isDeleting={deletingId === product._id}
              />
            ),
          } as Column<Product>,
        ]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md">
    <Package size={22} />
  </div>

  <h1 className="text-2xl font-semibold text-gray-900">
    Products
  </h1>
</div>

          {data?.meta?.total !== undefined && (
            <p className="mt-1 text-sm text-gray-500">
              {data.meta.total} total products
            </p>
          )}
        </div>

        {canManage && (
          <Button
            onClick={openCreateModal}
            className="inline-flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </Button>
        )}
      </div>

      {/* Search */}
      <SearchInput
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        placeholder="Search by name, SKU or category..."
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        emptyMessage={
          search
            ? `No products found for "${search}"`
            : "No products available."
        }
        rowKey={(product) => product._id}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={data?.meta?.totalPages ?? 1}
        onPageChange={setPage}
      />

      {/* Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct}
      />
    </div>
  );
}