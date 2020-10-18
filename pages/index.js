import { Typography } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

import { connectToDatabase } from "../util/mongodb";

const useStyles = makeStyles((theme) => {
  return {};
});

export default function Home({ isConnected }) {
  const classes = useStyles();

  return (
    <div>
      {!isConnected && (
        <Alert severity="error">
          Error connecting to the database, please try again later.
        </Alert>
      )}
      <Typography component="h1" gutterBottom variant="h3">
        Flatbread
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
