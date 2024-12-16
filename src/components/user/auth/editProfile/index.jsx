import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DraftsIcon from "@mui/icons-material/Drafts";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import { Link, Outlet } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const dataSidebar = [
  {
    id: 1,
    name: "Thông tin cá nhân",
    icon: <AccountCircleIcon />,
    link: "/edit-profile",
  },
  {
    id: 2,
    name: "Lịch sử đặt vé",
    icon: <DraftsIcon />,
    link: "/booking-history",
  },
  {
    id: 2,
    name: "Tour yêu thích",
    icon: <Diversity1Icon />,
    link: "/Tour_Favourite",
  },
  {
    id: 3,
    name: "Cài đặt",
    icon: <SettingsIcon />,
    link: "/edit-profile/setting",
  },
  {
    id: 4,
    name: "Trợ giúp",
    icon: <HelpIcon />,
    link: "/help",
  },
];
function EditProfile() {
  return (
    <Box sx={{ flexGrow: 1, margin: "10px", padding: "0px 11px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}  // Adjusted for smaller screens
          sm={4}   // For medium screens, set width to 4 columns (33.3%)
          sx={{
            height: "100%",
          }}
        >
          <Item>
            <Box
              sx={{
                width: "100%",
                maxWidth: 380,
                bgcolor: "background.paper",
                boxShadow: "none",
              }}
            >
              {dataSidebar.map((item) => (
                <>
                  <nav key={item.id} aria-label="main mailbox folders">
                    <Link
                      to={item.link}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton
                            sx={{
                              display: "flex",
                              gap: "5px",
                            }}
                          >
                            {item.icon}
                            <ListItemText primary={item.name} />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Link>
                  </nav>
                  <Divider />
                </>
              ))}
            </Box>
          </Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
      </Grid>
    </Box>

  );
}

export default EditProfile;
