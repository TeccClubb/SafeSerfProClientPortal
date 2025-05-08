"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<"dedicatedIp" | "ddos" | "multipleDevices" | null>("dedicatedIp");

  return (
    <div className="mt-6">
      <ProductCard
        title="Dedicated IP for Your VPN"
        description="Get all-in-one Windows protection with Antivirus and Security Updater."
        price="$6.24"
        selected={selectedProduct === "dedicatedIp"}
        onSelect={() => setSelectedProduct("dedicatedIp")}
      />
      <ProductCard
        title="DDoS protection"
        description="Dedicated Static IP Address + Port Forwarding"
        price="$2.49"
        selected={selectedProduct === "ddos"}
        onSelect={() => setSelectedProduct("ddos")}
      />
      <ProductCard
        title="Multiple devices"
        description="Additional 9 simultaneous connections"
        price="$1.20"
        selected={selectedProduct === "multipleDevices"}
        onSelect={() => setSelectedProduct("multipleDevices")}
      />
    </div>
  );
};

export default ProductList;
