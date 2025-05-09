interface ProductCardProps {
    title: string;
    description: string;
    price: string;
    selected: boolean;
    onSelect: () => void;
}

const ProductCard = ({ title, description, price, selected, onSelect }: ProductCardProps) => {
    return (
        <div className={`border p-4 rounded-md ${selected ? "border-blue-500 bg-blue-50" : "border-gray-300"} mb-2`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <input type="checkbox" className="mr-2" checked={selected} onChange={onSelect} />
                    <div>
                        <h4 className={`leading-tight text-base font-bold ${selected ? "text-slate-900" : "text-slate-500"}`}>
                            {title}
                        </h4>

                        <p className="text-sm text-gray-600">{description}</p>
                    </div>
                </div>
                <span className={`font-bold ${selected ? "text-slate-900" : "text-slate-500"}`}>
                   Price <br></br><span className={`${selected ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>{price}
                    </span> <span className="text-sm font-normal">/month</span>
                </span>

            </div>
        </div>
    );
};

export default ProductCard;
