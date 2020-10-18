import { yupResolver } from "@hookform/resolvers";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { connectToDatabase } from "../util/mongodb";

const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      margin: "0 auto",
      maxWidth: `${theme.breakpoints.values.sm}px`,
      width: "100%",
    },
  };
});

const StyledSearchCard = withStyles((theme) => {
  return {
    root: {
      margin: `0 auto ${theme.spacing(2)}px auto`,
      padding: theme.spacing(1),
      textAlign: "center",
      width: "100%",
      "& .MuiCardContent-root": {
        paddingBottom: `${theme.spacing(1)}px !important`,
      },
      "& .MuiTextField-root": {
        margin: `0 0 ${theme.spacing(2)}px 0`,
      },
    },
  };
})(Card);

const StyledAlert = withStyles((theme) => {
  return {
    root: {
      margin: `0 0 ${theme.spacing(2)}px 0`,
    },
  };
})(Alert);

const StyledRecipeCard = withStyles((theme) => {
  return {
    root: {
      margin: `0 auto ${theme.spacing(2)}px auto`,
      padding: `0 0 ${theme.spacing(1)}px 0`,
      textAlign: "center",
      width: "100%",
      "& .card-recipe-source": {
        backgroundColor: fade(theme.palette.primary.main, 0.1),
        padding: theme.spacing(2),
      },
      "& .card-recipe-duration-yield": {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-evenly",
      },
      "& .MuiCardActions-root": {
        display: "flex",
        justifyContent: "center",
      },
      "& .MuiLink-root": {
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
  };
})(Card);

export default function Home({ isConnected }) {
  const classes = useStyles();

  const [recipes, setRecipes] = useState(false);
  const [hideAlerts, setHideAlerts] = useState(false);

  const schema = yup.object().shape({
    title: yup.string().trim().lowercase().min(4).required(),
  });

  const { errors, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
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
    <div className={classes.pageContainer}>
      {!isConnected && (
        <Alert severity="error">
          Error connecting to the database, please try again later.
        </Alert>
      )}

      {/* search card */}
      <StyledSearchCard>
        <CardContent>
          <Typography component="h1" gutterBottom variant="h5">
            Find a Recipe
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* title */}
            <TextField
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
      </StyledSearchCard>

      {/* search alert feedback */}
      {!hideAlerts && recipes && recipes.length === 0 && (
        <Alert
          onClose={() => {
            setHideAlerts(true);
          }}
          severity="warning"
        >
          No recipes found
        </Alert>
      )}
      {!hideAlerts && recipes && recipes.length !== 0 && (
        <StyledAlert
          onClose={() => {
            setHideAlerts(true);
          }}
          severity="success"
        >
          {recipes.length} recipe{recipes.length > 1 ? "s" : ""} found!
        </StyledAlert>
      )}

      {/* search results */}
      {recipes && recipes.length !== 0 && (
        <div>
          {recipes.map((recipe, index) => (
            <StyledRecipeCard key={index}>
              <Box className="card-recipe-source" boxShadow={1}>
                <Typography
                  className="text-transform-capitalize"
                  component="h2"
                  variant="h6"
                >
                  {recipe.source.url && (
                    <Link
                      href={recipe.source.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {recipe.source.name}
                    </Link>
                  )}
                  {!recipe.source.url && recipe.source.name}
                </Typography>
              </Box>

              <CardContent>
                <Typography
                  className="text-transform-capitalize"
                  component="h3"
                  gutterBottom
                  variant="h5"
                >
                  {recipe.title}
                </Typography>
                <div className="card-recipe-duration-yield">
                  <div>
                    <RestaurantMenuIcon titleAccess="Knife and spoon icon." />
                    <Typography>
                      <span className="font-weight-bold">Prep</span>
                    </Typography>
                    <Typography>
                      {recipe.duration.prepTime} min
                      {recipe.duration.prepTime > 1 ? "s" : ""}
                    </Typography>
                  </div>
                  <div>
                    <AccessTimeIcon titleAccess="Clock icon." />
                    <Typography>
                      <span className="font-weight-bold">Cook</span>
                    </Typography>
                    <Typography>
                      {recipe.duration.cookTime} min
                      {recipe.duration.cookTime > 1 ? "s" : ""}
                    </Typography>
                  </div>
                  <div>
                    <GroupWorkIcon titleAccess="Circle with three dots in it." />
                    <Typography>
                      <span className="font-weight-bold">Yield</span>
                    </Typography>
                    <Typography>
                      {recipe.yield.amount} {recipe.yield.unit}
                    </Typography>
                  </div>
                </div>
              </CardContent>
              <CardActions>
                <Link href={`/recipe/${recipe._id}`}>
                  <Button color="primary" variant="contained">
                    View Recipe
                  </Button>
                </Link>
              </CardActions>
            </StyledRecipeCard>
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
