import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {

    const [books,setBooks] = useState([]);

    useEffect(()=>{
        const fetchAllBooks = async () =>{
            try{
                const res = await axios.get("http://localhost:8000/books");
               // console.log(res);
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    });

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:8000/books/" + id);
            alert("Data deleted Successfullyyy....")
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    };



  return (
    <div>
      <h1>The Book Shop</h1>
      <div className="books">
        {
            books.map((book)=> (
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt=''/>}
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <span>{book.price}</span>
                    <button className='update'><Link to={`/update/${book.id}`} className='link' >Update</Link></button>
                    <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
            ))}
      </div>
      <button className='btnAdd'><Link to="/add" className='link' >Add New Books</Link></button>
    </div>
  )
}

export default Books
