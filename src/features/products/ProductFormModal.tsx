import { useEffect, useState } from "react";
import { Modal } from "../../components/common/Modal";
import { Form, type FormField } from "../../components/common/Form";
import { useCreateProduct, useUpdateProduct } from "./useProducts";
import type { Product } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** Pass an existing product to edit, or omit/null to create a new one */
  product?: Product | null;
}

const fields: FormField[] = [
  { name: "name", label: "Product Name", type: "text", required: true },
  { name: "sku", label: "SKU", type: "text", required: true, placeholder: "e.g. WM-001" },
  { name: "category", label: "Category", type: "text", required: true },
  { name: "purchasePrice", label: "Purchase Price", type: "number", required: true, min: 0 },
  { name: "sellingPrice", label: "Selling Price", type: "number", required: true, min: 0 },
  { name: "stockQuantity", label: "Stock Quantity", type: "number", required: true, min: 0 },
  { name: "image", label: "Product Image", type: "file", accept: "image/*" },
];

/** Single reusable modal form for both Create and Edit product */
export default function ProductFormModal({ isOpen, onClose, product }: Props) {
  const isEditMode = Boolean(product);
  const [values, setValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Prefill form when opening in edit mode
  useEffect(() => {
    if (product) {
      setValues({
        name: product.name,
        sku: product.sku,
        category: product.category,
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        stockQuantity: product.stockQuantity,
      });
    } else {
      setValues({});
    }
    setError(null);
  }, [product, isOpen]);

  // Image is required only when creating a new product (business rule)
  const activeFields = fields.map((f) =>
    f.name === "image" ? { ...f, required: !isEditMode } : f
  );

  const handleSubmit = () => {
    setError(null);
    const formData = new FormData();
    formData.append("name", values.name ?? "");
    formData.append("sku", values.sku ?? "");
    formData.append("category", values.category ?? "");
    formData.append("purchasePrice", String(values.purchasePrice ?? ""));
    formData.append("sellingPrice", String(values.sellingPrice ?? ""));
    formData.append("stockQuantity", String(values.stockQuantity ?? ""));
    if (values.image) formData.append("image", values.image);

    const onSettled = {
      onSuccess: () => onClose(),
      onError: (err: any) => setError(err?.response?.data?.message || "Something went wrong"),
    };

    if (isEditMode && product) {
      updateMutation.mutate({ id: product._id, formData }, onSettled);
    } else {
      createMutation.mutate(formData, onSettled);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Product" : "Add Product"}>
      <Form
        fields={activeFields}
        values={values}
        onChange={(name, val) => setValues((v) => ({ ...v, [name]: val }))}
        onSubmit={handleSubmit}
        submitLabel={isEditMode ? "Save Changes" : "Create Product"}
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
}