'use client'

import { DataTable } from "next-datatable";
import 'next-datatable/dist/index.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [dummyData, setDummyData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  // Fetching data from API
  const dummyDataHandler = async () => {

    const response = await fetch("https://dummyjson.com/products");
    const resData = await response.json();
    setDummyData(resData.products);
  }
  console.log(Object.values(dummyData));

  useEffect(() => {
    dummyDataHandler();
  }, [])

  // Dummy Data
  // const data = [
  //   { id: 1, name: 'Product 1', price: 10, category: 'Category 1' },
  //   { id: 2, name: 'Product 2', price: 20, category: 'Category 2' },
  //   { id: 3, name: 'Product 3', price: 30, category: 'Category 1' },
  // ];

  const headers = ['id', 'title', 'price', 'category'];

  const header = (
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
      <h2>Products</h2>
      <button className={`refresh-Btn ${isClicked ? 'clicked' : ''}`} onClick={handleClick}><FontAwesomeIcon icon={faRotate} />
      </button>
    </div>
  );

  const footer = `In total there are ${dummyData ? dummyData.length : 0} products.`;


  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>DataTable</h1>
      {dummyData.length > 0 && <DataTable
        data={dummyData}
        headers={headers}
        header={header}
        footer={footer}
      />}
    </div>
  )
}
