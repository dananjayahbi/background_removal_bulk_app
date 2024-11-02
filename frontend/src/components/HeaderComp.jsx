import React from "react";
import { GithubOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const HeaderComp = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <a href="/about" style={styles.navLink}>
        <QuestionCircleOutlined /> About
        </a>
        <a
          href="https://github.com/dananjayahbi"
          target="_blank"
          style={styles.navLink}
        >
          <GithubOutlined /> GitHub
        </a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    backgroundColor: "#f8f9fa", // Light background
    borderBottom: "2px solid #e0e0e0",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  // Mobile responsiveness
  "@media (maxWidth: 768px)": {
    header: {
      padding: "10px 15px",
    },
    nav: {
      gap: "15px",
    },
    navLink: {
      fontSize: "14px",
    },
  },
};

export default HeaderComp;
