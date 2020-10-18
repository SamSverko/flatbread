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
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      height: "100vh",
      width: "100%",
    },
    header: {
      flexShrink: 0,
    },
    toolbar: {
      display: "flex",
      justifyContent: "center",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      overflow: "auto",
      padding: theme.spacing(2),
    },
    footer: {
      flexShrink: 0,
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
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        value={value}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}
