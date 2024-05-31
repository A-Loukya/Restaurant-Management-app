import { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newBill, setNewBill] = useState({
    product_name: '',
    price: '',
    quantity: '',
    total_amount: ''
  });

  // Fetch billing data
  useEffect(() => {
    fetch("http://localhost:8001/billing")
      .then((res) => res.json())
      .then((data) => {
        console.log("Billing data fetched:", data);  // Added console log
        setBills(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // Fetch products data
  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Products data fetched:", data);  // Added console log
        setProducts(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleOpenModal = () => {
    setNewBill({ product_name: '', price: '', quantity: '', total_amount: '' });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setNewBill({ product_name: '', price: '', quantity: '', total_amount: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'product_name') {
      const product = products.find(p => p.product_name === value);
      if (product) {
        setNewBill({
          ...newBill,
          [name]: value,
          price: product.price,
          total_amount: product.price * newBill.quantity
        });
      } else {
        setNewBill({
          ...newBill,
          [name]: value,
          price: '',
          total_amount: ''
        });
      }
    } else if (name === 'quantity') {
      setNewBill({
        ...newBill,
        [name]: value,
        total_amount: newBill.price * value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBillWithId = {
      ...newBill,
      billing_id: bills.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    fetch("http://localhost:8001/billing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBillWithId)
    })
      .then((res) => res.json())
      .then((data) => {
        setBills([...bills, data]);
        handleCloseModal();
        alert("Product added successfully");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h2 className="font-inter font-bold text-primary text-3xl">Billing</h2>
      <button onClick={handleOpenModal} className="my-6 bg-primary text-white font-inter font-bold rounded-full w-36 h-9 text-center text-sm">Add Product</button>
      <table className="min-w-full">
        <thead>
          <tr className='text-left font-inter font-normal text-2xl text-primary pb-6'>
            <td className="py-2">Billing ID</td>
            <td className="py-2">Product Name</td>
            <td className="py-2">Price</td>
            {/* <td className="py-2">Quantity</td> */}
            <td className="py-2">Total Amount</td>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.billing_id} className="text-left font-inter text-[16px] text-[#3A3A3A]">
              <td className="py-2">{bill.Billing_ID}</td>
              <td className="py-2">{bill.product_name}</td>
              <td className="py-2">${bill.Total_Amount}</td>
              {/* <td className="py-2">{bill.quantity}</td> */}
              <td className="py-2">{bill.Total_Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Add Product"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }
        }}
      >
        <h2 className='font-inter font-bold text-primary text-center text-xl mt-7 mb-5'>Add New Bill</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A] '>Product Name:</label><br />
            <input
              type="text"
              name="product_name"
              value={newBill.product_name}
              onChange={handleChange}
              required
              list='product-names'
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
            <datalist id='product-names'>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A] '>Price:</label><br />
            <input
              type="number"
              step="0.01"
              name="price"
              value={newBill.price}
              readOnly
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A] '>Quantity:</label><br />
            <input
              type="number"
              name="quantity"
              value={newBill.quantity}
              onChange={handleChange}
              required
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A] '>Total Amount:</label><br />
            <input
              type="number"
              step="0.01"
              name="total_amount"
              value={newBill.total_amount}
              readOnly
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
          <button type="submit" className='bg-primary text-white font-inter font-bold rounded-lg w-32 h-9 text-center text-sm mt-6'>Add Product</button>
          <button type="button" className='ml-10 text-primary font-inter text-lg' onClick={handleCloseModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default Billing;
