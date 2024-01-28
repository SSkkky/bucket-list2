// List.tsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useStore, BucketList } from '../store';
import "../main.css";

const List: React.FC = () => {
  const { bucketLists, setBucketLists } = useStore();

  useEffect(() => {
    const fetchBucketLists = async () => {
      const response = await axios.get('http://localhost:3333/data');
      if (Array.isArray(response.data)) {
        setBucketLists(response.data);
      } else {
        console.error('Server response is not an array:', response.data);
      }
    };
    fetchBucketLists();
  }, [setBucketLists]);
  
    
  const onDeleteHandler = async (item: BucketList) => {
    const response = await axios.delete(`http://localhost:3333/data/${item.id}`);
    if (response.status === 200) {
      const newBucketLists = bucketLists.filter((list:BucketList) => list.id !== item.id);
      setBucketLists(newBucketLists);
    }
  }    

  return (
    <div className="flex flex-wrap flex-col items-center justify-center bg-white py-2">
      {bucketLists.map((item) => (
        <div key={item.id} className="mb-4 p-4 bg-white shadow-md rounded-2xl w-1/2">
          <h2 className="font-bold text-2xl mb-2">{item.title}</h2>
          <p className="text-gray-700 mb-2">{item.description}</p>
          <p className="text-gray-500 mb-2">{item.date}</p>
          <button onClick={() => onDeleteHandler(item)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default List;
