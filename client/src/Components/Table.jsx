import React, { useEffect, useState } from 'react'
import Axiosinstance from '../Config/Axiosinstance';

function Table() {
    const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data,setData]=useState([])
  let [isRender,setIsRender]=useState(true)

  useEffect(()=>{
    async function invoke(){
        Axiosinstance.get('/userDetails').then((response)=>{
            const data=response.data
            setData(data.users)
        })
    } 
    invoke()
  },[isRender])
  
  useEffect(() => {
    // Filter the data based on the search term
    const filtered = data.filter((item) =>
      item?.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [data, searchTerm]);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the current page's items
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Generate pagination links
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginationLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`mx-1 px-3 py-1 rounded-lg ${
          currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300'
        }`}
      >
        {i}
      </button>
    );
  }

  const userDelete=(userId)=>{
    Axiosinstance.get(`/userDelete/${userId}`).then((response)=>{
        const data=response.data
        if (data.status==="success") {
            setIsRender(!isRender)
        } else {
            console.log("error");
        };
    })
  }


  return (
    <div>
        <div className="">
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-2 py-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full table-auto border-black border-2">
        <thead>
          <tr>
            <th className="px-4 py-2 border-black border-2">Name</th>
            <th className="px-4 py-2 border-black border-2">Mobile</th>
            <th className="px-4 py-2 border-black border-2">email</th>
            <th className="px-4 py-2 border-black border-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-black border-2">{item?.username}</td>
              <td className="px-4 py-2 border-black border-2">{item?.phone}</td>
              <td className="px-4 py-2 border-black border-2">{item?.email}</td>
              <td className="px-4 py-2 border-black border-2"><button type="button" onClick={()=>{userDelete(item._id)}} className=" focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 justify-center content-center text-center">
        {paginationLinks.map((link) => link)}
      </div>
    </div>

    </div>
  )
}

export default Table