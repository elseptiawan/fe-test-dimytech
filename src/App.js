import React, { useState } from 'react'
import './App.css';

function App() {
  const [rowInput, setRowInput] = useState([1]);
  const [form, setForm] = useState([{
    product_name: '',
    product_price: null,
    quantity: 1,
    total: null
  }]);
  const [grandTotal, setGrandTotal] = useState(0);

  const newButtonClickHandler = () => {
    setRowInput(rowInput => [...rowInput, (rowInput.length)+1]);
    setForm(form => [...form, {
      product_name: '',
      product_price: null,
      quantity: 1,
      total: null
    }]);
  }

  const deleteButtonClickHandler = () => {
    setRowInput(rowInput.slice(0, -1));
    setForm(form.slice(0, -1));
  }

  const onchangeHandler = (e, index) => {
    const { name, value } = e.target;
    const list = [...form];
    list[index][name] = value;
    list[index].total = list[index].product_price * list[index].quantity;
    setGrandTotal(0);
    form.forEach((item) => {
      setGrandTotal(grandTotal => grandTotal + item.total);
    });
    setForm(list);

    if (name === 'quantity') {
      if (value < 1) {
        document.getElementById(`qty-validator${index}`).style.display = 'block';
      } else {
        document.getElementById(`qty-validator${index}`).style.display = 'none';
      }
    }
  }

  return (
    <div className='App'>
      <button className='new-button' onClick={newButtonClickHandler}>New</button>
      {rowInput.map((row, index) => (
        <div className='row-input' key={row}>
          <div className='column-input'>
            <label for={`product_name`}>Product name</label>
            <input 
            type='text' 
            name={`product_name`} 
            value={form[index].product_name} 
            onChange={(e) => onchangeHandler(e, index)}
            />
          </div>
          <div className='column-input'>
            <label for={`product_price`}>Product price</label>
            <input 
            type='number' 
            name={`product_price`} 
            value={form[index].product_price} 
            onChange={(e) => onchangeHandler(e, index)}
            />
          </div>
          <div className='column-input'>
            <label for={`quantity`}>Qty</label>
            <input 
            type='number' 
            name={`quantity`} 
            value={form[index].quantity} 
            onChange={(e) => onchangeHandler(e, index)}
            />
            <div className='error' id={`qty-validator${index}`}>Qty must be greater than 0</div>
          </div>
          <div className='column-input'>
            <label for={`total`}>Total</label>
            <input 
            type='number' 
            name={`total`} 
            value={form[index].total} 
            onChange={(e) => onchangeHandler(e, index)}
            />
          </div>
          <div className={`delete-button ${row === rowInput.length && rowInput.length !== 1  ? "" : "hidden"}`}>
            <button onClick={deleteButtonClickHandler}>Delete</button>
          </div>
        </div>
      ))}
      <div className='row-input grand-total'>
          <div className='column-input'></div>
          <div className='column-input'></div>
          <div className='column-input'></div>
          <div className='column-input'>
            <label for={`total`}>Grand Total</label>
            <input type='number' value={grandTotal}/>
          </div>
          <div className='delete-button'></div>
        </div>
    </div>
  );
}

export default App;
