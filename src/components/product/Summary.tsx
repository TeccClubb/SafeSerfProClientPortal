// components/Summary.tsx

const Summary = () => {
    return (
        <div className="  pt-4 mt-4 text-sm text-gray-700 space-y-1">
            <div className="leading-relaxed">
                <p>Subtotal: <span className="float-right">€ 55.11</span></p>
                <p>Period: <span className="float-right">12 months</span></p>
                <p>Tax: <span className="float-right">€ 3.03</span></p>
                <p>Discount: <span className="float-right">€ 14.47</span></p>
            </div>
            {/* <hr /> */}
            <p className="font-bold text-base  border-t border-slate-400  py-5">
                Total: <span className="float-right text-lg">€ 79.00</span>
            </p>
            <p className="text-neutral-400 text-sm font-normal">
                For products we charge only once. The total price of the product is calculated for the period of subscription or minimal period the product can be used.
            </p>
        </div>

    );
};

export default Summary;
