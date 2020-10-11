import Alert from "@material-ui/lab/Alert";
import { fade, makeStyles } from "@material-ui/core/styles";

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
