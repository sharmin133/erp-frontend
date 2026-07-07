import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, type FormField } from "../../components/common/Form";
import { Modal } from "../../components/common/Modal";
import type { Product } from "../../types";
import {
  useCreateProduct,
  useUpdateProduct,
} from "./useProducts";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

const fields: FormField[] = [
  {
    name: "name",
    label: "Product Name",
    type: "text",
    required: true,
  },
  {
    name: "sku",
    label: "SKU",
    type: "text",
    required: true,
    placeholder: "e.g. WM-001",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    required: true,
  },
  {
    name: "purchasePrice",
    label: "Purchase Price",
    type: "number",
    required: true,
    min: 0,
  },
  {
    name: "sellingPrice",
    label: "Selling Price",
    type: "number",
    required: true,
    min: 0,
  },
  {
    name: "stockQuantity",
    label: "Stock Quantity",
    type: "number",
    required: true,
    min: 0,
  },
  {
    name: "image",
    label: "Product Image",
    type: "file",
    accept: "image/*",
  },
];

export default function ProductFormModal({
  isOpen,
  onClose,
  product,
}: Props) {
  const isEditMode = Boolean(product);

  const [values, setValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();

  const isLoading =
    createMutation.isPending || updateMutation.isPending;

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

  const activeFields = fields.map((field) =>
    field.name === "image"
      ? { ...field, required: !isEditMode }
      : field
  );

  const handleClose = () => {
    setValues({});
    setError(null);
    onClose();
  };

  const handleSubmit = () => {
    setError(null);

    const formData = new FormData();

    formData.append("name", values.name ?? "");
    formData.append("sku", values.sku ?? "");
    formData.append("category", values.category ?? "");
    formData.append(
      "purchasePrice",
      String(values.purchasePrice ?? "")
    );
    formData.append(
      "sellingPrice",
      String(values.sellingPrice ?? "")
    );
    formData.append(
      "stockQuantity",
      String(values.stockQuantity ?? "")
    );

    if (values.image) {
      formData.append("image", values.image);
    }

    const callbacks = {
      onSuccess: () => {
        toast.success(
          isEditMode
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        handleClose();
      },
      onError: (err: any) => {
        const errorText =
          err?.response?.data?.message ?? "Something went wrong";
        setError(errorText);
        toast.error(errorText);
      },
    };

    if (isEditMode && product) {
      updateMutation.mutate(
        {
          id: product._id,
          formData,
        },
        callbacks
      );
    } else {
      createMutation.mutate(formData, callbacks);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        isEditMode ? "Edit Product" : "Add Product"
      }
    >
      <Form
        fields={activeFields}
        values={values}
        onChange={(name, value) =>
          setValues((prev) => ({
            ...prev,
            [name]: value,
          }))
        }
        onSubmit={handleSubmit}
        submitLabel={
          isEditMode
            ? "Save Changes"
            : "Create Product"
        }
        isLoading={isLoading}
        error={error}
      />
    </Modal>
  );
}