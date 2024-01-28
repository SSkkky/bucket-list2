// Write.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useStore, BucketList } from '../store';
import "../main.css";

const Write: React.FC = () => {
    const { bucketLists, setBucketLists } = useStore();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const formattedDate = `${year}년 ${month}월 ${date}일`;
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBucketList: BucketList = {
      id: new Date().getTime().toString(),
      state: false,
      title: title,
      description: description,
      date: formattedDate,
    };
    const response = await axios.post('http://localhost:3333/data', newBucketList);
    if (response.status === 200) {
      const newBucketLists = [response.data, ...bucketLists];
      setBucketLists(newBucketLists);
    }
  };  
      

  return (
    <div className="flex flex-col items-center bg-white py-10 my-0">
      <h1 className='font-bold text-2xl mb-2'>My Bucket List</h1>
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-2xl w-1/2">
        <div className="mb-4">
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <input
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;