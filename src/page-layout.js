import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RestoreIcon from "@material-ui/icons/Restore";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
    },
    header: {
      flexShrink: 0,
    },
    content: {
      flexGrow: 1,
      overflow: "auto",
    },
    footer: {
      flexShrink: 0,
    },
    toolbar: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

export default function PageLayout(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <div className={classes.page}>
      <AppBar className={classes.header} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Flatbread</Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>{props.children}</div>

      <BottomNavigation
        className={classes.footer}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}
