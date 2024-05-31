import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    price: '',
    stock_quantity: ''
  });

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err.message));
  }, []); 

  //   useEffect(() => {
//     // Fetch data from the JSON file
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('/products.json');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);
  const handleOpenModal = () => {
    setNewProduct({ product_name: '', price: '', stock_quantity: '' });
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setNewProduct({ product_name: '', price: '', stock_quantity: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProductWithId = {
      ...newProduct,
      product_id: products.length + 1
    };

    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductWithId)
    })
    .then((res) => res.json())
    .then((data) => {
      setProducts([...products, data]);
      handleCloseModal();
      alert("Product saved successfully");
    })
    .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <h2 className="font-inter font-bold text-primary text-3xl">Product Details</h2>
      <button onClick={handleOpenModal} className="my-6 bg-primary text-white font-inter font-bold rounded-full w-36 h-9 text-center text-sm">Add Product</button>
      <table className="min-w-full">
        <thead>
          <tr className='text-left font-inter font-normal text-2xl max-lg:text-xl text-primary pb-6'>
            <td className="py-2">Product ID</td>
            <td className="py-2">Product Name</td>
            <td className="py-2">Price</td>
            <td className="py-2">Stock Quantity</td>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id} className="text-left font-inter text-[16px] max-lg:text-sm text-[#3A3A3A]">
              <td className="py-2">{product.product_id}</td>
              <td className="py-2">{product.product_name}</td>
              <td className="py-2">${product.price}</td>
              <td className="py-2">{product.stock_quantity}</td>
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
        <h2 className='font-inter font-bold text-primary text-center text-xl mt-7 mb-5'>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A] '>Product Name:</label><br />
            <input
              type="text"
              name="product_name"
              value={newProduct.product_name}
              onChange={handleChange}
              required
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A] '>Price:</label><br />
            <input
              type="number"
              step="0.01"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
              className='font-inter text-[16px] text-[#3A3A3A] border-secondary border-2 rounded-md my-2 p-[2px]'
            />
          </div>
          <div>
            <label className='font-inter text-[16px] text-[#3A3A3A] '>Stock Quantity:</label><br />
            <input
              type="number"
              name="stock_quantity"
              value={newProduct.stock_quantity}
              onChange={handleChange}
              required
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

export default Products;
