import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "../../lib/socket";

import { PRODUCTS_QUERY_KEY } from "../products/useProducts";
import { toast } from "react-toastify";

export const useRealtimeSync = () => {
  const queryClient = useQueryClient();
 

  useEffect(() => {
    socket.connect();

    const onDashboardUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    };

    const onProductsChanged = () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] });
    };

    const onLowStockAlert = (payload: {
  name: string;
  stockQuantity: number;
}) => {
  toast.warning(
    `⚠️ ${payload.name} is low in stock (${payload.stockQuantity} left)`
  );
};

    socket.on("dashboard:update", onDashboardUpdate);
    socket.on("products:changed", onProductsChanged);
    socket.on("lowStock:alert", onLowStockAlert);

    return () => {
      socket.off("dashboard:update", onDashboardUpdate);
      socket.off("products:changed", onProductsChanged);
      socket.off("lowStock:alert", onLowStockAlert);
      socket.disconnect();
    };
  }, [queryClient]);
};