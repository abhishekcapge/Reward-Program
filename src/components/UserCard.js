import "../global.css";
import avatarMale from "../assets/avatarMale.jpg";
import avatarFemale from "../assets/avatarFemale.jpg";
import { PropTypes } from "prop-types";

function UserCard({ name, gender}) {

  return (
    <div data-testid="user-card" className="card">
      {gender === "male" ? (
        <img src={avatarMale} className="avatar" alt="avatar" />
      ) : (
        <img src={avatarFemale} className="avatar" alt="avatar" />
      )}

      <h2>{name}</h2>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string,
  gender: PropTypes.string
};

export default UserCard;
