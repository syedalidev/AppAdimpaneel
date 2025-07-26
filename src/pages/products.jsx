import React, { useState } from 'react';

import { collection,  addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../components/config/firebase';
import ProductList from './productlist';

const products = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'products'), {
        title,
        price,
        image,

      });
      alert('Product Added!');
      setTitle('');
      setPrice('');
      setImage('');
    } catch (err) {
      alert('Failed to add product');
      console.log(err);
    }
  };

  return (

    <>  
     
     <div className='usersname'>
        <h2>Products list</h2>
      </div>


<form className="product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <input
        className="product-input"
        placeholder="Product Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="product-input"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        className="product-input"
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <button className="product-button" type="submit">Add Product</button>
    </form>
    

    <ProductList/>
    </>
 
  );
};

export default products ;
