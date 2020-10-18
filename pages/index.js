import { yupResolver } from "@hookform/resolvers";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
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
    alert: {
      margin: `0 0 ${theme.spacing(2)}px 0`,
    },
    results: {
      // margin: `0 0 ${theme.spacing(2)}px 0`,
    },
  };
});

export default function Home({ isConnected }) {
  const classes = useStyles();

  const [recipes, setRecipes] = useState(false);
  const [hideAlerts, setHideAlerts] = useState(false);

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
        setHideAlerts(false);
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

      {/* search alert feedback */}
      {!hideAlerts && recipes && recipes.length === 0 && (
        <Alert
          className={classes.alert}
          onClose={() => {
            setHideAlerts(true);
          }}
          severity="warning"
        >
          No recipes found
        </Alert>
      )}
      {!hideAlerts && recipes && recipes.length !== 0 && (
        <Alert
          className={classes.alert}
          onClose={() => {
            setHideAlerts(true);
          }}
          severity="success"
        >
          {recipes.length} recipe{recipes.length > 1 ? "s" : ""} found!
        </Alert>
      )}

      {/* search results */}
      {recipes && recipes.length !== 0 && (
        <div className={classes.results}>
          {recipes.map((recipe, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <div>
                  <Typography
                    className="text-transform-capitalize"
                    component="h2"
                    variant="h6"
                  >
                    {recipe.source.name}
                  </Typography>
                </div>

                <Typography
                  className="text-transform-capitalize"
                  component="h3"
                  variant="h5"
                >
                  {recipe.title}
                </Typography>

                <div>
                  <div>
                    <RestaurantMenuIcon titleAccess="Knife and spoon icon." />
                    <Typography>Prep</Typography>
                    <Typography>
                      {recipe.duration.prepTime} min
                      {recipe.duration.prepTime > 1 ? "s" : ""}
                    </Typography>
                  </div>
                  <div>
                    <AccessTimeIcon titleAccess="Clock icon." />
                    <Typography>Cook</Typography>
                    <Typography>
                      {recipe.duration.cookTime} min
                      {recipe.duration.cookTime > 1 ? "s" : ""}
                    </Typography>
                  </div>
                  <div>
                    <AccessTimeIcon titleAccess="Clock icon." />
                    <Typography>Yield</Typography>
                    <Typography>
                      {recipe.yield.amount} {recipe.yield.unit}
                    </Typography>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <Button color="primary" variant="contained">
                  View Recipe
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
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
