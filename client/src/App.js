import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://localhost:5000/api/items');
    const data = await response.json();
    setItems(data);
  };

  const addItem = async () => {
    const newItem = { name: itemName, quantity: itemQuantity };
    const response = await fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    if (response.ok) {
      fetchItems();
    }
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>
      <div>
        <input 
          type="text" 
          placeholder="Item Name" 
          value={itemName} 
          onChange={(e) => setItemName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={itemQuantity} 
          onChange={(e) => setItemQuantity(e.target.value)} 
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <div>
        <h2>Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
