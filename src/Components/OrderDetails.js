// OrderDetails.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state;

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Customer Name: ${order.Customer_name}`, 10, 10);
    doc.text(`Phone Number: ${order.Phone_number}`, 10, 20);
    doc.text(`Total Amount: $${order.total_amount.toFixed(2)}`, 10, 30);
    order.products.forEach((product, index) => {
      doc.text(`${product.product_name} - Quantity: ${product.quantity} - Amount: $${product.total_amount.toFixed(2)}`, 10, 40 + index * 10);
    });
    doc.save('order_details.pdf');
  };

  return (
    <div>
      <h2 className="font-inter font-bold text-primary text-3xl">Order Details</h2>
    {/* <div className='bg-white w-96 p-8 m-auto'> */}
      <p className='font-inter font-regular text-[#3A3A3A] text-xl mt-7 mb-2'><span className='font-semibold text-xl text-primary'>Customer Name: </span>{order.Customer_name}</p>
      <p className='font-inter font-regular text-[#3A3A3A] text-xl mb-5'><span className='font-semibold text-xl text-primary'>Phone Number: </span> {order.Phone_number}</p>
      <h3 className="font-inter font-bold text-primary text-2xl underline underline-offset-2 mb-3">Products</h3>
      <table className='table-auto w-[40vw]'>
              <thead>
                <tr className='text-left font-inter font-normal text-xl text-primary pb-6'>
                  <td className="py-2">Product Name</td>
                  <td className="py-2">Quantity</td>
                  <td className="py-2">Total Amount</td>
                </tr>
              </thead>
              <tbody>
              {order.products.map((product, index) => (
                  <tr key={index} className="text-left font-inter text-[16px] text-[#3A3A3A]">
                    <td className="py-2">{product.product_name}</td>
                    <td className="py-2">{product.quantity}</td>
                    <td className="py-2">${product.total_amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
      
      <p className="text-left font-inter text-[16px] text-[#3A3A3A] my-3"><span className='text-left font-inter font-normal text-xl text-primary pb-6' >Total Amount:</span> ${order.total_amount.toFixed(2)}</p>
      <p className="text-left font-inter text-[16px] text-[#3A3A3A] my-3"><span className='text-left font-inter font-normal text-xl text-primary pb-6' >GST:</span> ${((order.total_amount * 0.18) / 2).toFixed(2)}</p>
      <p className="text-left font-inter text-[16px] text-[#3A3A3A] my-3"><span className='text-left font-inter font-normal text-xl text-primary pb-6' >CGST:</span> ${((order.total_amount * 0.18) / 2).toFixed(2)}</p>
      <p className="text-left font-inter text-[16px] text-[#3A3A3A] my-3"><span className='text-left font-inter font-normal text-xl text-primary pb-6' >SGST:</span> ${((order.total_amount * 0.18) / 2).toFixed(2)}</p>
      <p className="text-left font-inter text-lg font-bold text-[#3A3A3A] my-3"><span className='text-left font-inter font-normal text-2xl text-primary pb-6' >Total Amount Including Taxes:</span> ${(order.total_amount * 1.18).toFixed(2)}</p>
      <button onClick={downloadPDF} className='bg-white drop-shadow-xl text-black font-inter font-bold rounded-lg w-32 h-9 text-center text-sm mt-6 mr-5'>Download PDF</button>
      <button onClick={() => navigate('/orders')} className='bg-primary text-white font-inter font-bold rounded-lg w-40 h-9 text-center text-sm mt-6'>Create New Invoice</button>
    </div>
    // </div>
  );
};

export default OrderDetails;
