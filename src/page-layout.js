import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RestoreIcon from "@material-ui/icons/Restore";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      width: "100%",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      overflow: "auto",
      padding: theme.spacing(2),
    },
  };
});

const StyledAppBar = withStyles((theme) => {
  return {
    root: {
      flexShrink: 0,
      "& .MuiTypography-root": {
        color: theme.palette.common.white,
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
  };
})(AppBar);

const StyledToolbar = withStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
    },
  };
})(Toolbar);

const StyledBottomNavigation = withStyles((theme) => {
  return {
    root: {
      flexShrink: 0,
    },
  };
})(BottomNavigation);

export default function PageLayout(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <div className={classes.pageContainer}>
      {/* header */}
      <StyledAppBar position="static">
        <Link href="/">
          <StyledToolbar>
            <Typography variant="h6">Flatbread</Typography>
          </StyledToolbar>
        </Link>
      </StyledAppBar>

      {/* content */}
      <div className={classes.content}>{props.children}</div>

      {/* footer */}
      {!props.noFooter && (
        <StyledBottomNavigation
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          value={value}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </StyledBottomNavigation>
      )}
    </div>
  );
}
