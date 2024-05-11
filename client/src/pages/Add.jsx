import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//git test
//footer added
const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //console.log(book);
  const navigate = useNavigate();
  const handleClick = async e =>{
    e.preventDefault();
    try{
        await axios.post("http://localhost:8000/books",book);
        alert("Book Added Successfully...")
        navigate("/");
    }catch(err){
        console.log(err);
    }
  }

  return (
    <div className="form">
      <h1>Add New Books</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="description"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
