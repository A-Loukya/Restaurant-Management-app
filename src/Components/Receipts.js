import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

const Receipts = () => {
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8001/orders")
            .then((res) => res.json())
            .then((data) => setReceipts(data))
            .catch((err) => console.log(err.message));
    }, []);

    const downloadPDF = (receipt) => {
        const doc = new jsPDF();
        doc.text(`Customer Name: ${receipt.Customer_name}`, 10, 10);
        doc.text(`Phone Number: ${receipt.Phone_number}`, 10, 20);
        doc.text(`Total Amount: $${receipt.total_amount.toFixed(2)}`, 10, 30);
        receipt.products.forEach((product, index) => {
            doc.text(`${product.product_name} - Quantity: ${product.quantity} - Amount: $${product.total_amount.toFixed(2)}`, 10, 40 + index * 10);
        });
        doc.save(`${receipt.Customer_name}_order_details.pdf`);
    };

    return (
        <div>
            <h2 className="font-inter font-bold text-primary text-3xl mb-6">Receipts</h2>
            <table className="min-w-full">
                <thead>
                    <tr className="text-left font-inter font-normal text-2xl max-lg:text-xl text-primary pb-6">
                        <td className="py-2">Customer Name</td>
                        <td className="py-2">Phone Number</td>
                        <td className="py-2">Products</td>
                        <td className="py-2">Total Amount</td>
                        <td className="py-2">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map(receipt => (
                        <tr key={receipt.id} className="text-left font-inter text-[16px] text-[#3A3A3A]">
                            <td className="py-2">{receipt.Customer_name}</td>
                            <td className="py-2">{receipt.Phone_number}</td>
                            <td className="py-2">{receipt.products.length}</td>
                            <td className="py-2">${receipt.total_amount.toFixed(2)}</td>
                            <td className="py-2">
                                <button 
                                    onClick={() => downloadPDF(receipt)} 
                                    className='bg-primary text-white font-inter font-bold rounded-lg w-32 h-9 text-center text-sm'>
                                    Download PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Receipts;
