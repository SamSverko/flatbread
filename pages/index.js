import { Typography } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { connectToDatabase } from "../util/mongodb";

const useStyles = makeStyles((theme) => {
  return {
    toolbar: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

export default function Home({ isConnected }) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Flatbread</Typography>
        </Toolbar>
      </AppBar>
      {!isConnected && (
        <Alert severity="error">
          Error connecting to the database, please try again later.
        </Alert>
      )}
      <Typography component="h1" gutterBottom variant="h3">
        Welcome
      </Typography>
    </div>
  );
}

export async function getServerSideProps() {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
