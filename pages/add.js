import { yupResolver } from "@hookform/resolvers";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { useEffect, useRef } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";

import { connectToDatabase } from "../util/mongodb";

export default function Add({
  courseTypes,
  cuisines,
  dietaryRestrictions,
  dishTypes,
  ingredientUnits,
}) {
  const schema = yup.object().shape({
    title: yup.string().trim().lowercase().min(4).required(),
    courseTypes: yup.array().of(yup.string()).min(1),
    dishTypes: yup.array().of(yup.string()).min(1),
    cuisines: yup.array().of(yup.string()).min(1),
    dietaryRestrictions: yup.array().of(yup.string()),
    source: yup.object({
      name: yup.string().trim().lowercase().required(),
      url: yup.string().trim().url(),
    }),
    yield: yup.object({
      amount: yup.number().required(),
      unit: yup.string().trim().lowercase().required(),
    }),
    duration: yup.object({
      prepTime: yup.number().required(),
      cookTime: yup.number().required(),
    }),
    ingredients: yup
      .array()
      .of(
        yup.object({
          section: yup.string().trim().lowercase(),
          amount: yup.number().required(),
          unit: yup.string().trim().lowercase().required(),
          name: yup.string().trim().lowercase().required(),
          alteration: yup.string().trim().lowercase(),
          substitutions: yup
            .string()
            .trim()
            .lowercase()
            .matches(/^$|([a-zA-Z0-9]+,?\s*)+$/g)
            .nullable(),
        })
      )
      .min(1),
  });

  const { control, errors, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields: ingredients, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const addIngredientButton = useRef(0);

  useEffect(() => {
    addIngredientButton.current.click();
  }, [addIngredientButton]);

  const onSubmit = (data) => {
    let formErrors = false;
    if (
      !data.courseTypes.every((courseType) => courseTypes.includes(courseType))
    ) {
      formErrors = "Improper Course Type data value in form";
    } else if (
      !data.dishTypes.every((dishType) => dishTypes.includes(dishType))
    ) {
      formErrors = "Improper Dish Type data value in form";
    } else if (!data.cuisines.every((cuisine) => cuisines.includes(cuisine))) {
      formErrors = "Improper Cuisine data value in form";
    } else if (
      !data.dietaryRestrictions.every((dietaryRestriction) =>
        dietaryRestrictions.includes(dietaryRestriction)
      )
    ) {
      formErrors = "Improper Dietary Restriction data value in form";
    }

    if (!formErrors) {
      // TODO: SPLIT SUBSTITUTIONS INTO AN ARRAY
      // data.ingredients.forEach((ingredient) => {
      //   console.log(ingredient.substitutions.split(","));
      // });
      // console.log(data.ingredients);
      console.log(data);
      // axios
      //   .post('/api/addRecipe', data)
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } else {
      console.log(formErrors);
    }
  };

  return (
    <div>
      <Typography component="h1" gutterBottom variant="h3">
        Add new recipe
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <TextField
          error={typeof errors.title !== "undefined"}
          helperText={errors.title?.message}
          id="form-title"
          inputRef={register}
          label="Title"
          name="title"
          style={{ margin: "0 0 40px 0" }}
        />
        <br />
        {/* course types */}
        <FormControl component="fieldset" style={{ margin: "0 0 40px 0" }}>
          <FormLabel
            error={typeof errors.courseTypes !== "undefined"}
            component="legend"
          >
            Course Types
          </FormLabel>
          <FormHelperText className="Mui-error">
            {errors.courseTypes?.message}
          </FormHelperText>
          <FormGroup>
            {courseTypes.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    id={`form-courseTypes-${index}`}
                    inputRef={register}
                    name={`courseTypes`}
                    type="checkbox"
                    value={item}
                  />
                }
                key={index}
                label={item}
              />
            ))}
          </FormGroup>
        </FormControl>
        <br />
        {/* dish types */}
        <FormControl component="fieldset" style={{ margin: "0 0 40px 0" }}>
          <FormLabel
            error={typeof errors.dishTypes !== "undefined"}
            component="legend"
          >
            Dish Types
          </FormLabel>
          <FormHelperText className="Mui-error">
            {errors.dishTypes?.message}
          </FormHelperText>
          <FormGroup>
            {dishTypes.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    id={`form-dishTypes-${index}`}
                    inputRef={register}
                    name={`dishTypes`}
                    type="checkbox"
                    value={item}
                  />
                }
                key={index}
                label={item}
              />
            ))}
          </FormGroup>
        </FormControl>
        <br />
        {/* cuisines */}
        <FormControl component="fieldset" style={{ margin: "0 0 40px 0" }}>
          <FormLabel
            error={typeof errors.cuisines !== "undefined"}
            component="legend"
          >
            Cuisines
          </FormLabel>
          <FormHelperText className="Mui-error">
            {errors.cuisines?.message}
          </FormHelperText>
          <FormGroup>
            {cuisines.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    id={`form-cuisines-${index}`}
                    inputRef={register}
                    name={`cuisines`}
                    type="checkbox"
                    value={item}
                  />
                }
                key={index}
                label={item}
              />
            ))}
          </FormGroup>
        </FormControl>
        <br />
        {/* dietaryRestrictions */}
        <FormControl component="fieldset" style={{ margin: "0 0 40px 0" }}>
          <FormLabel
            error={typeof errors.dietaryRestrictions !== "undefined"}
            component="legend"
          >
            Dietary Restrictions
          </FormLabel>
          <FormHelperText className="Mui-error">
            {errors.dietaryRestrictions?.message}
          </FormHelperText>
          <FormGroup>
            {dietaryRestrictions.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    id={`form-dietaryRestrictions-${index}`}
                    inputRef={register}
                    name={`dietaryRestrictions`}
                    type="checkbox"
                    value={item}
                  />
                }
                key={index}
                label={item}
              />
            ))}
          </FormGroup>
        </FormControl>
        <br />
        {/* source */}
        <Typography component="h2" gutterBottom variant="h4">
          Source
        </Typography>
        <TextField
          error={typeof errors.source?.name !== "undefined"}
          helperText={errors.source?.name?.message}
          id="form-source-name"
          inputRef={register}
          label="Source Name"
          name="source.name"
          style={{ margin: "0 0 10px 0" }}
        />
        <br />
        <TextField
          error={typeof errors.source?.url !== "undefined"}
          helperText={errors.source?.url?.message}
          id="form-source-url"
          inputRef={register}
          label="Source URL"
          name="source.url"
          style={{ margin: "0 0 40px 0" }}
        />
        <br />
        {/* yield */}
        <Typography component="h2" gutterBottom variant="h4">
          Yield
        </Typography>
        <TextField
          error={typeof errors.yield?.amount !== "undefined"}
          helperText={errors.yield?.amount?.message}
          id="form-yield-amount"
          inputRef={register}
          label="Yield Amount"
          name="yield.amount"
          style={{ margin: "0 0 10px 0" }}
          type="number"
        />
        <br />
        <TextField
          error={typeof errors.yield?.unit !== "undefined"}
          helperText={
            errors.yield?.unit?.message
              ? errors.yield?.unit?.message
              : "Example: cookies, burgers, servings, etc."
          }
          id="form-yield-unit"
          inputRef={register}
          label="Yield Unit"
          name="yield.unit"
          style={{ margin: "0 0 10px 0", maxWidth: 167, width: "100%" }}
        />
        <br />
        {/* duration */}
        <Typography component="h2" gutterBottom variant="h4">
          Duration
        </Typography>
        <TextField
          error={typeof errors.duration?.prepTime !== "undefined"}
          helperText={
            errors.duration?.prepTime?.message
              ? errors.duration?.prepTime?.message
              : "In minutes."
          }
          id="form-duration-prepTime"
          inputRef={register}
          label="Prep Time"
          name="duration.prepTime"
          style={{ margin: "0 0 10px 0" }}
          type="number"
        />
        <br />
        <TextField
          error={typeof errors.duration?.cookTime !== "undefined"}
          helperText={
            errors.duration?.cookTime?.message
              ? errors.duration?.cookTime?.message
              : "In minutes."
          }
          id="form-duration-cookTime"
          inputRef={register}
          label="Cook Time"
          name="duration.cookTime"
          style={{ margin: "0 0 40px 0" }}
          type="number"
        />
        <br />
        {/* ingredients */}
        <div>
          <Typography component="h2" gutterBottom variant="h4">
            Ingredients
          </Typography>
          {errors.ingredients !== "undefined" &&
            errors.ingredients?.length > 0 && (
              <FormHelperText className="Mui-error">
                Please fill out at least one ingredient.
              </FormHelperText>
            )}
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id}>
              <Typography component="h3" gutterBottom variant="h5">
                Ingredient {index + 1}
              </Typography>
              <TextField
                id={`ingredients[${index}].section`}
                inputRef={register}
                label="Section"
                name={`ingredients[${index}].section`}
                style={{ margin: "0 0 10px 0" }}
              />
              <br />
              <TextField
                error={
                  typeof errors !== "undefined" &&
                  typeof errors.ingredients !== "undefined" &&
                  typeof errors.ingredients[index] !== "undefined" &&
                  typeof errors.ingredients[index].amount !== "undefined"
                }
                helperText={
                  typeof errors !== "undefined" &&
                  typeof errors.ingredients !== "undefined" &&
                  typeof errors.ingredients[index] !== "undefined" &&
                  typeof errors.ingredients[index].amount !== "undefined"
                    ? errors.ingredients[index].amount.message
                    : ""
                }
                id={`ingredients[${index}].amount`}
                inputRef={register}
                label="Amount"
                name={`ingredients[${index}].amount`}
                style={{ margin: "0 0 10px 0" }}
                type="number"
              />
              <br />
              <Controller
                render={({ onChange, ...props }) => (
                  <Autocomplete
                    options={ingredientUnits}
                    getOptionLabel={(option) => option}
                    renderOption={(option) => <span>{option}</span>}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Unit"
                        style={{
                          margin: "0 0 10px 0",
                          maxWidth: 167,
                          width: "100%",
                        }}
                      />
                    )}
                    onChange={(e, data) => onChange(data)}
                    {...props}
                  />
                )}
                onChange={([, data]) => data}
                defaultValue="gram"
                name={`ingredients[${index}].unit`}
                control={control}
              />
              <br />
              <TextField
                error={
                  typeof errors !== "undefined" &&
                  typeof errors.ingredients !== "undefined" &&
                  typeof errors.ingredients[index] !== "undefined" &&
                  typeof errors.ingredients[index].name !== "undefined"
                }
                helperText={
                  typeof errors !== "undefined" &&
                  typeof errors.ingredients !== "undefined" &&
                  typeof errors.ingredients[index] !== "undefined" &&
                  typeof errors.ingredients[index].name !== "undefined"
                    ? errors.ingredients[index].name.message
                    : ""
                }
                id={`ingredients[${index}].name`}
                inputRef={register}
                label="Name"
                name={`ingredients[${index}].name`}
                style={{ margin: "0 0 10px 0" }}
              />
              <br />
              <TextField
                id={`ingredients[${index}].alteration`}
                inputRef={register}
                label="Alteration"
                name={`ingredients[${index}].alteration`}
                style={{ margin: "0 0 10px 0" }}
              />
              <br />
              <TextField
                id={`ingredients[${index}].substitutions`}
                inputRef={register}
                label="Substitutions"
                name={`ingredients[${index}].substitutions`}
                style={{ margin: "0 0 10px 0" }}
              />
              <br />
              {ingredients.length > 1 && (
                <button
                  onClick={() => remove(index)}
                  style={{ margin: "0 0 10px 0" }}
                >
                  Remove Ingredient
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append()}
            ref={addIngredientButton}
          >
            Add Ingredient
          </button>
        </div>
        {/* submit */}
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const courseTypes = await db.collection("courseTypes").find({}).toArray();
  const dishTypes = await db.collection("dishTypes").find({}).toArray();
  const cuisines = await db.collection("cuisines").find({}).toArray();
  const dietaryRestrictions = await db
    .collection("dietaryRestrictions")
    .find({})
    .toArray();
  const ingredientUnits = await db
    .collection("ingredientUnits")
    .find({})
    .toArray();

  return {
    props: {
      courseTypes: JSON.parse(JSON.stringify(courseTypes))
        .map((courseType) => courseType.name)
        .sort((a, b) => a.localeCompare(b)),
      dishTypes: JSON.parse(JSON.stringify(dishTypes))
        .map((dishType) => dishType.name)
        .sort((a, b) => a.localeCompare(b)),
      cuisines: JSON.parse(JSON.stringify(cuisines))
        .map((cuisine) => cuisine.name)
        .sort((a, b) => a.localeCompare(b)),
      dietaryRestrictions: JSON.parse(JSON.stringify(dietaryRestrictions))
        .map((dietaryRestriction) => dietaryRestriction.name)
        .sort((a, b) => a.localeCompare(b)),
      ingredientUnits: JSON.parse(JSON.stringify(ingredientUnits))
        .map((ingredientUnit) => ingredientUnit.singular.name)
        .sort((a, b) => a.localeCompare(b)),
    },
  };
}
