import {
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

import { connectToDatabase } from "../util/mongodb";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
    },
    card: {
      margin: "0 auto",
      maxWidth: "400px",
      textAlign: "center",
      width: "100%",
    },
    title: {
      margin: `0 0 ${theme.spacing(2)}px 0`,
    },
    cardActions: {
      display: "flex",
      justifyContent: "center",
      padding: `0 0 ${theme.spacing(2)}px 0`,
    },
  };
});

export default function Home({ isConnected }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {!isConnected && (
        <Alert severity="error">
          Error connecting to the database, please try again later.
        </Alert>
      )}

      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.title} component="h1" variant="h5">
            Find a Recipe
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Search by recipe name"
            size="small"
            variant="outlined"
          />
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button color="primary" variant="contained">
            Search
          </Button>
        </CardActions>
      </Card>
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
