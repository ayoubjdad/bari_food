import React, { useState } from "react";
import styles from "./Home.module.scss";
import { Tabs, Tab, Box, Badge, Popover } from "@mui/material";
import Orders from "../../layouts/Orders/Orders";
import Online from "../../layouts/Online/Online";
import logo from "../../assets/logo/bari-logo-green.png";

function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && children}</div>;
}

export default function Home() {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* {anchorEl ? <UserBox anchorEl={anchorEl} onClose={handleClose} /> : null} */}

      <selction className={styles.main}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <img src={logo} alt="logo" className={styles.logo} />
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              classes={{ indicator: { display: "none" } }}
            >
              <Tab label="Sur place" />
              <Tab label="En ligne" />
              <Tab label="Stock" />
            </Tabs>

            <div className={styles.user}>
              <Badge badgeContent={1}>
                <Box component="i" className={`fi fi-rr-bell ${styles.icon}`} />
              </Badge>
              <div className={styles.userImage} onClick={handleClick}>
                <img
                  src="https://imgcdn.stablediffusionweb.com/2024/5/14/64c47081-446f-4ff7-b811-3bb55cabcb35.jpg"
                  alt="user"
                />
                <span>Bari Food</span>
                <Box component="i" className="fi fi-rr-angle-small-down" />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <TabPanel value={value} index={0}>
            <Orders />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Online />
          </TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </div>

        <div
          className={styles.headerContainer}
          style={value === 2 ? { position: "fixed", bottom: 0 } : {}}
        >
          <div className={styles.header}>
            <p>Tout droit réservé à Bari Food</p>
          </div>
        </div>
      </selction>
    </>
  );
}

const UserBox = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className={styles.userBox}>
        <div className={styles.user}>
          <p>Bari Food</p>
        </div>
      </div>
    </Popover>
  );
};
