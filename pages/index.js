import { yupResolver } from "@hookform/resolvers";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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
      margin: `0 auto ${theme.spacing(2)}px auto`,
      maxWidth: "400px",
      padding: theme.spacing(1),
      textAlign: "center",
      width: "100%",
    },
    cardContent: {
      paddingBottom: `${theme.spacing(1)}px !important`,
    },
    title: {
      margin: `0 0 ${theme.spacing(2)}px 0`,
    },
    searchBar: {
      margin: `0 0 ${theme.spacing(2)}px 0`,
    },
  };
});

export default function Home({ isConnected }) {
  const classes = useStyles();

  const [recipes, setRecipes] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().trim().lowercase().min(4).required(),
  });

  const { control, errors, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post(`/api/recipes?title=${data.title}`, data)
      .then(function (response) {
        console.log(response.data);
        setRecipes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      {!isConnected && (
        <Alert severity="error">
          Error connecting to the database, please try again later.
        </Alert>
      )}

      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} component="h1" variant="h5">
            Find a Recipe
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* title */}
            <TextField
              className={classes.searchBar}
              error={typeof errors.title !== "undefined"}
              fullWidth
              helperText={errors.title?.message}
              id="form-title"
              inputRef={register}
              label="Search by recipe title"
              name="title"
              size="small"
              variant="outlined"
            />
            {/* submit */}
            <div>
              {/* <input type="submit" /> */}
              <Button color="primary" type="submit" variant="contained">
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {recipes && recipes.length === 0 && (
        <Alert
          onClose={() => {
            setRecipes(false);
          }}
          severity="warning"
        >
          No recipes found
        </Alert>
      )}
      {recipes && recipes.length !== 0 && (
        <Alert
          onClose={() => {
            setRecipes(false);
          }}
          severity="success"
        >
          {recipes.length} recipe{recipes.length > 1 ? "s" : ""} found!
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
