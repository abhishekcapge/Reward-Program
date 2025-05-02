import "../global.css";
import avatarMale from "../assets/avatarMale.jpg";
import avatarFemale from "../assets/avatarFemale.jpg";
import { RewardPoint } from "../utils/RewardPointCalc";
import { formatMonth } from "../utils/DateFormatter";
import { useState } from "react";

function UserCard({ name, date, monthlySpending, gender }) {
  console.log("monthlySpending", monthlySpending)

  const [selectedMonth, setSelectedMonth] = useState("2025-05");

  const handleChange=(e)=>{
    setSelectedMonth(e.target.value);
  }

  const amount = monthlySpending[selectedMonth];

  return (
    <div data-testid="user-card" className="card">
      {gender === "male" ? (
        <img src={avatarMale} className="avatar" alt="avatar" />
      ) : (
        <img src={avatarFemale} className="avatar" alt="avatar" />
      )}

      <h2>{name}</h2>
      <label htmlFor="month">Select Month</label>
      <select id="month" name="month" value={selectedMonth} onChange={handleChange}>
        {Object.keys(monthlySpending).map((month)=>(<option value={month} key={month}>{formatMonth(month)}</option>))}
      </select>

      <h3>Total Spent in {formatMonth(selectedMonth)}: ${amount}</h3>
      <h3>Total Reward Point : {RewardPoint(amount)}</h3>
    </div>
  );
}

export default UserCard;
