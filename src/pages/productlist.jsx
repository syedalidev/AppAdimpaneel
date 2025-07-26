import React, { useEffect, useState } from 'react';
import { collection,  addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../components/config/firebase';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(data);
  };


const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter((p) => p.id !== id));
      alert('Product deleted ');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product ');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='productlist'>
      <h2>Product List</h2>
      <div  style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              width: '200px',
              textAlign: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{product.title}</h3>
            <p>Rs {product.price}</p>

            <button className="delete-button" onClick={() => handleDelete(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
