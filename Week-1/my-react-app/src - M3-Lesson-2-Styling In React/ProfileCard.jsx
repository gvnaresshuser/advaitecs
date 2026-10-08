import React from "react";
import "./ProfileCard.css";
import styles from "./ProfileCard.module.css";
import styled from "styled-components";

// Styled-components
const FollowButton = styled.button`
  background-color: ${(props) => (props.$primary ? "blue" : "gray")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => (props.$primary ? "darkblue" : "darkgray")};
  }
`;

const ProfileCard = () => {
    const nameStyle = {
        color: "blue",
        fontSize: "22px",
        fontWeight: "bold",
    };

    return (
        <div className="profile-container">
            {/* Inline Styling */}
            <h2 style={nameStyle}>John Doe</h2>

            {/* CSS Class */}
            <p className="emailCls">john@example.com</p>

            {/* CSS Module */}
            <p className={styles.role}>Admin</p>&nbsp;

            {/* Styled Component */}
            <FollowButton $primary>Follow</FollowButton>&nbsp;
            <FollowButton>Unfollow</FollowButton>
        </div>
    );
};

export default ProfileCard;
