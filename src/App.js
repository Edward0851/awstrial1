import './App.css';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listProducts } from './graphql/queries';
import { createProducts , deleteProducts } from './graphql/mutations';
import React, { useEffect, useState } from "react";

import {Route, Switch } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import About from './About';


const initialFormState = { 
  name: '',
  description: '',
  category: '',
  price: 0.0,
  stock: 0,
  image: '',
}

function App(){
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchMYNotes();
  }, []);

  async function deleteMYNote({ id }) {
    const newNotesArray = products.filter(product => product.id !== id);
    setProducts(newNotesArray);
    console.log("deleted item is :" + products.filter(product => product.id === id));
    await API.graphql({ query: deleteProducts, variables: { input: { id }, _version: products._version }});
    console.log("hello"+id);
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchMYNotes();
  }

  async function fetchMYNotes() {
    console.log("BBBBBBBBBBBBBBBBBBBBBB");
    const apiData = await API.graphql({ query: listProducts });
    console.log("CCCCCCCCCCCCCCC" + apiData.data.listProducts.items);
    const notesFromAPI = apiData.data.listProducts.items;
    console.log("Current products：" +　notesFromAPI);
    await Promise.all(notesFromAPI.map(async product => {
      if (product.image) {
        const image = await Storage.get(product.image);
        product.image = image;
      }
      return product;
    }))
    setProducts(apiData.data.listProducts.items);
  }

  async function createMYNote() {
    if (!formData.name || !formData.description) return;
    console.info("Before creating products...")
    await API.graphql({ query: createProducts, variables: { input: formData } });
    console.info("After creating products...")
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setProducts([ ...products, formData ]);
    setFormData(initialFormState);
  }
  
  return (
    <div>
      <header>
      
      <h1>We now have Auth!</h1>
    </header>
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Note description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createMYNote}>Create Note</button>
      <div style={{marginBottom: 30}}>
        {
          products.map(product => (
            <div key={product.id || product.name}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button onClick={() => deleteMYNote(product)}>Delete product</button>
              {
                  product.image && <img src={product.image} style={{width: 400}} alt="Cannot display"/>
              }
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
    
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} />
        <Route path="/about" component={About} />
      </Switch>
      
    </div>
  );
  
}

export default withAuthenticator(App);
