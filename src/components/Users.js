import React, { useState, useEffect } from "react";
import UserCard from "./userCard";
import "../global.css";
import Pagination from "./pagination";
import { fetchData } from "../services/userServices";
import { Link } from "react-router-dom";
import log from '../utils/logger';

log.info('This is an info message');
// log.error('This is an error message');


function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData().then((data) => setData(data));
    log.info('State updated:', data);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const customerMap = new Map();

  data.forEach(({ customerId, name, date, spent, gender }) => {
    if (!customerMap.has(customerId)) {
      customerMap.set(customerId, {
        customerId,
        name,
        monthlySpends: { [date]: spent },
        totalSpend: spent,
        gender,
      });
    } else {
      const existing = customerMap.get(customerId);
      existing.monthlySpends[date] = spent;
      existing.totalSpend += spent;
    }
  });

  const uniqueCustomers = Array.from(customerMap.values());

  const PAGE_SIZE = 5;
  const totalUser = uniqueCustomers.length;
  const noOfPage = Math.ceil(totalUser / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return (
    <>
      <div className="user-container">
        {uniqueCustomers.slice(start, end).map((u) => (
          <Link to={"/users/" + u.customerId} key={u.id}>
            <UserCard
              key={u.id}
              name={u.name}
              customerId={u.customerId}
              gender={u.gender}
              monthlySpends={u.monthlySpends}
            />
          </Link>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          key={noOfPage}
          noOfPage={noOfPage}
          pageSize={PAGE_SIZE}
          totalUser={totalUser}
          handleCurrentPage={handleCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default Users;
