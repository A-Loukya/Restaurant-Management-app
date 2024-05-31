// Orders.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState({
    Customer_name: '',
    Phone_number: '',
  });
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    quantity: '',
    price: '',
    total_amount: '',
  });
  const [orderProducts, setOrderProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products data fetched:", data);
        setProducts(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    if (name === 'product_name') {
      const product = products.find(p => p.product_name === value);
      if (product) {
        setNewProduct({
          ...newProduct,
          [name]: value,
          price: product.price,
          total_amount: product.price * newProduct.quantity,
        });
      } else {
        setNewProduct({
          ...newProduct,
          [name]: value,
          price: '',
          total_amount: '',
        });
      }
    } else if (name === 'quantity') {
      setNewProduct({
        ...newProduct,
        [name]: value,
        total_amount: newProduct.price * value,
      });
    }
  };

  const addProductToOrder = (e) => {
    e.preventDefault();
    if (newProduct.product_name && newProduct.quantity) {
      setOrderProducts([...orderProducts, newProduct]);
      setNewProduct({
        product_name: '',
        quantity: '',
        price: '',
        total_amount: '',
      });
    }
  };

  const createInvoice = (e) => {
    e.preventDefault();
    if (orderProducts.length === 0) {
      alert("Please add at least one product to the order.");
      return;
    }

    const newOrder = {
      ...customer,
      products: orderProducts,
      total_amount: orderProducts.reduce((sum, product) => sum + product.total_amount, 0),
    };

    fetch("http://localhost:8001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders([...orders, data]);
        alert("Order saved successfully");
        setCustomer({
          Customer_name: '',
          Phone_number: '',
        });
        setOrderProducts([]);
        navigate('/orderDetails', { state: { order: newOrder } });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h2 className="font-inter font-bold text-primary text-3xl">Order Details</h2>
      <h2 className='font-inter font-regular text-primary text-2xl mt-7 mb-5'>Add New Invoice</h2>
      <form onSubmit={createInvoice}>
        <div className='flex '>
          <div className='mr-10'>
            <label className='font-inter text-[16px] text-[#3A3A3A] mr-7'>Customer Name:</label><br />
            <input
              type="text"
              name="Customer_name"
              value={customer.Customer_name}
              onChange={handleCustomerChange}
              required
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A]'>Phone Number:</label><br />
            <input
              type="text"
              name="Phone_number"
              value={customer.Phone_number}
              onChange={handleCustomerChange}
              required
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
        </div>
        <h2 className='font-inter font-regular text-primary text-2xl mt-7 mb-5'>Products</h2>
        <div className='flex'>
          <div className='mr-10'>
            <label className='font-inter text-[16px] text-[#3A3A3A]'>Product Name:</label><br />
            <select
              name="product_name"
              value={newProduct.product_name}
              onChange={handleProductChange}
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_name}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
          <div className='mr-10'>
            <label className='font-inter text-[16px] text-[#3A3A3A]'>Quantity:</label><br />
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleProductChange}
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
          <button onClick={addProductToOrder} className='bg-primary text-white font-inter font-bold rounded-lg w-32 h-9 text-center text-sm mt-6'>Add Product</button>
        </div>
        {orderProducts.length > 0 && (
          <>
            <h3 className='font-inter font-regular text-primary text-2xl mt-7 mb-5'>Added Products</h3>
            <table className='table-auto w-full'>
              <thead>
                <tr className='text-left font-inter font-normal text-xl text-primary pb-6'>
                  <td className="py-2">Product Name</td>
                  <td className="py-2">Quantity</td>
                  <td className="py-2">Total Amount</td>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map((product, index) => (
                  <tr key={index} className="text-left font-inter text-[16px] text-[#3A3A3A]">
                    <td className="py-2">{product.product_name}</td>
                    <td className="py-2">{product.quantity}</td>
                    <td className="py-2">${product.total_amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        <button type="submit" className='bg-primary text-white font-inter font-bold rounded-lg w-32 h-9 text-center text-sm mt-6'>Create Invoice</button>
      </form>
    </div>
  );
};

export default Orders;
