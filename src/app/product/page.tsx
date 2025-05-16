"use client";
// app/page.tsx
import React from 'react';
import ProductList from '@/components/product/ProductList';
import Summary from '@/components/product/Summary';
import AddProductButton from '@/components/product/AddProductButton';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
export default function Page() {

    const [showSummary, setShowSummary] = useState(true);
    return (
        <div className=" w-full mx-auto px-4 py-10 lg:p-13">
            <h2 className="text-2xl text-slate-700  font-semibold mb-4">Products</h2>

            {/* Product List */}
            <ProductList />

            {/* Checkout Summary */}
            <div className="mt-6 border p-4 rounded-md bg-white shadow-sm">
                {/* <h3 className="text-2xl text-slate-700  font-semibold mb-4">Check out Summary</h3> */}
                <div className="mt-6 border p-4 rounded-md bg-white shadow-sm">
                    <div
                        className="flex items-center justify-between cursor-pointer mb-2"
                        onClick={() => setShowSummary((prev) => !prev)}
                    >
                        <h3 className="text-2xl text-slate-700 font-semibold">Checkout Summary</h3>
                        <ChevronDown
                            className={`transition-transform duration-300 ${showSummary ? 'rotate-180' : ''}`}
                        />
                    </div>

                    {showSummary && (
                        <>
                            <Summary />
                            <AddProductButton />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
