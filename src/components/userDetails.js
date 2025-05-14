import { useState, useEffect } from "react";
import { fetchData } from "../services/userServices";
import { useParams } from "react-router-dom";
import { months } from "../constants/common";
import { years } from "../constants/common";
import { RewardPoint } from "../utils/RewardPointCalc";
import { formatMonth, formatYear } from "../utils/DateFormatter";

function UserDetails() {
  const { customerId } = useParams();

  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chooseMonth, setChooseMonth] = useState("00");
  const [choseYear, setChooseYear] = useState("");
  const [recentThreeMonths, setRecentThreeMonths] = useState(true);

  useEffect(() => {
    fetchData()
      .then((result) => {
        const filtered = result.filter(
          (user) => parseInt(user.customerId) === parseInt(customerId)
        );
        setUserDetails(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [customerId]);

  useEffect(() => {
    if (chooseMonth === "00") {
      setRecentThreeMonths(true);
    } else {
      setRecentThreeMonths(false);
    }
  }, [chooseMonth]);

  const customerMap = new Map();

  userDetails.forEach(
    ({ customerId, name, date, spent, gender, transactionId }) => {
      if (!customerMap.has(customerId)) {
        customerMap.set(customerId, {
          customerId,
          name,
          monthlySpends: { [date]: spent },
          totalSpend: spent,
          gender,
          transactionIdDetails: { [date]: transactionId },
        });
      } else {
        const existing = customerMap.get(customerId);
        existing.monthlySpends[date] = spent;
        existing.transactionIdDetails[date] = transactionId;
        existing.totalSpend += spent;
      }
    }
  );

  const uniqueCustomers = Array.from(customerMap.values());

  const handleMonth = (e) => {
    setChooseMonth(e.target.value);
  };

  const handleYear = (e) => {
    setChooseYear(e.target.value);
  };

  const allMonthlySpent = uniqueCustomers[0]?.monthlySpends || {};
  const allTransactionDetails = uniqueCustomers[0]?.transactionIdDetails || {};

  const allKeys = Array.from(
    new Set([
      ...Object.keys(allMonthlySpent),
      ...Object.keys(allTransactionDetails),
    ])
  );

  const filteredDetailByMonth = allKeys.filter((month) => {
    const resultMonth = formatMonth(month);
    return resultMonth === chooseMonth;
  });

  const filterByYear = allKeys.filter((year) => {
    const resultYear = formatYear(year);
    return resultYear === choseYear;
  });

  const filterByMonthAndYear = allKeys.filter((my) => {
    const result =
      my.split("-")[1] === chooseMonth && my.split("-")[0] === choseYear;
    return result;
  });

  const filterByMonthAndYearResult = Array.from([filterByMonthAndYear]);

  const getLastThreeMonths = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    return date;
  };

  const recentTransaction = allKeys.filter((txn) => {
    const txnDate = new Date(txn);
    return txnDate >= getLastThreeMonths();
  });

  const Latest = recentTransaction.filter((month) => {
    const resultMonth = formatMonth(month);
    return resultMonth === chooseMonth;
  });

  let totalRewardPoint = 0;

  if (recentThreeMonths) {
    recentTransaction.forEach((key) => {
      totalRewardPoint += RewardPoint(allMonthlySpent[key]);
    });
  } else if (filterByMonthAndYearResult.length > 0) {
    filterByMonthAndYearResult[0].forEach((k) => {
      totalRewardPoint += RewardPoint(allMonthlySpent[k]);
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-details">
      <h2>Username : {uniqueCustomers[0].name}</h2>
      <div>
        <label>Select Month:</label>
        <select value={chooseMonth} onChange={handleMonth}>
          <option>---Select---</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>{" "}
        <label>Select Year:</label>
        <select value={choseYear} onChange={handleYear}>
          <option>---Select---</option>
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>

      <table className="reward-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount Spent</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {recentThreeMonths ? (
            recentTransaction.map((key) => (
              <tr>
                <td>{allTransactionDetails[key]}</td>
                <td>{allMonthlySpent[key]}</td>
                <td>{RewardPoint(allMonthlySpent[key])}</td>
              </tr>
            ))
          ) : filterByMonthAndYear.length > 0 ? (
            filterByMonthAndYearResult[0].map((k) => (
              <tr>
                <td>{allTransactionDetails[k]}</td>
                <td>{allMonthlySpent[k]}</td>
                <td>{RewardPoint(allMonthlySpent[k])}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>
                <h3>
                  No Transactions Details are available for selected Month and
                  Year
                </h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Total Points : {totalRewardPoint}</h3>
    </div>
  );
}

export default UserDetails;
