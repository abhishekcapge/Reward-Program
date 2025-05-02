import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import "../global.css"
import Pagination from "./Pagination";
import { fetchData } from "../services/userServices";

function Users() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const PAGE_SIZE = 5;
  const totalUser = data.length;
  const noOfPage = Math.ceil(totalUser/PAGE_SIZE);
  const start = currentPage*PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handleCurrentPage=(page)=>{
        setCurrentPage(page);
  }

  useEffect(() => {
    fetchData().then(data => (setData(data)))
  }, []);

  return (
    <div>
      <div className="user-container">
        {data.slice(start,end).map((u) => (
          <UserCard key={u.id} name={u.name} date={u.date} monthlySpending={u.monthlySpending} gender={u.gender}/>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination noOfPage={noOfPage} pageSize={PAGE_SIZE} totalUser={totalUser} handleCurrentPage={handleCurrentPage} currentPage={currentPage}/>
      </div>
    </div>
  );
}

export default Users;
