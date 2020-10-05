import { yupResolver } from "@hookform/resolvers";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";

import { connectToDatabase } from "../util/mongodb";

export default function Add({
  courseTypes,
  cuisines,
  dietaryRestrictions,
  dishTypes,
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

  const { errors, handleSubmit, register, control } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    fields: ingredients,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
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
      !data.courseTypes.every((courseType) =>
        flattenDBArray(courseTypes).includes(courseType)
      )
    ) {
      formErrors = "Improper Course Type data value in form";
    } else if (
      !data.dishTypes.every((dishType) =>
        flattenDBArray(dishTypes).includes(dishType)
      )
    ) {
      formErrors = "Improper Dish Type data value in form";
    } else if (
      !data.cuisines.every((cuisine) =>
        flattenDBArray(cuisines).includes(cuisine)
      )
    ) {
      formErrors = "Improper Cuisine data value in form";
    } else if (
      !data.dietaryRestrictions.every((dietaryRestriction) =>
        flattenDBArray(dietaryRestrictions).includes(dietaryRestriction)
      )
    ) {
      formErrors = "Improper Dietary Restriction data value in form";
    }

    if (!formErrors) {
      axios
        .post("/api/addRecipe", data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log(formErrors);
    }
  };

  const flattenDBArray = (array) => {
    return array.reduce((r, obj) => r.concat(obj._id), []);
  };

  return (
    <div>
      <h1>Add new recipe</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* title */}
        <div>
          <h2>Title</h2>
          <label htmlFor="form-title">Title</label>
          <br />
          <input name="title" id="form-title" ref={register} />
          <br />
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        {/* course types */}
        <div>
          <h2>Course Types</h2>
          {courseTypes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, index) => (
              <li key={index}>
                <input
                  id={`form-courseTypes-${index}`}
                  name={`courseTypes`}
                  ref={register}
                  type="checkbox"
                  value={item._id}
                />
                <label htmlFor={`form-courseTypes-${index}`}>{item.name}</label>
              </li>
            ))}
          {errors.courseTypes && <span>{errors.courseTypes.message}</span>}
        </div>
        {/* dish types */}
        <div>
          <h2>Dish Types</h2>
          {dishTypes
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, index) => (
              <li key={index}>
                <input
                  id={`form-dishTypes-${index}`}
                  name={`dishTypes`}
                  ref={register}
                  type="checkbox"
                  value={item._id}
                />
                <label htmlFor={`form-dishTypes-${index}`}>{item.name}</label>
              </li>
            ))}
          {errors.dishTypes && <span>{errors.dishTypes.message}</span>}
        </div>
        {/* cuisines */}
        <div>
          <h2>Cuisines</h2>
          {cuisines
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, index) => (
              <li key={index}>
                <input
                  id={`form-cuisines-${index}`}
                  name={`cuisines`}
                  ref={register}
                  type="checkbox"
                  value={item._id}
                />
                <label htmlFor={`form-cuisines-${index}`}>{item.name}</label>
              </li>
            ))}
          {errors.cuisines && <span>{errors.cuisines.message}</span>}
        </div>
        {/* dietaryRestrictions */}
        <div>
          <h2>dietaryRestrictions</h2>
          {dietaryRestrictions
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, index) => (
              <li key={index}>
                <input
                  id={`form-dietaryRestrictions-${index}`}
                  name={`dietaryRestrictions`}
                  ref={register}
                  type="checkbox"
                  value={item._id}
                />
                <label htmlFor={`form-dietaryRestrictions-${index}`}>
                  {item.name}
                </label>
              </li>
            ))}
          {errors.dietaryRestrictions && (
            <span>{errors.dietaryRestrictions.message}</span>
          )}
        </div>
        {/* source */}
        <div>
          <h2>Source</h2>
          <label htmlFor="form-source-name">Name</label>
          <br />
          <input name="source.name" id="form-source-name" ref={register} />
          <br />
          {errors.source?.name && <span>{errors.source.name.message}</span>}
          <br />
          <label htmlFor="form-source-url">URL</label>
          <br />
          <input name="source.url" id="form-source-url" ref={register} />
          <br />
          {errors.source?.url && <span>{errors.source.url.message}</span>}
        </div>
        {/* yield */}
        <div>
          <h2>Yield</h2>
          <label htmlFor="form-yield-amount">Amount</label>
          <br />
          <input
            name="yield.amount"
            id="form-yield-amount"
            ref={register}
            type="number"
          />
          <br />
          {errors.yield?.amount && <span>{errors.yield.amount.message}</span>}
          <br />
          <label htmlFor="form-yield-unit">
            Unit (e.g. servings, burgers, etc.)
          </label>
          <br />
          <input name="yield.unit" id="form-yield-unit" ref={register} />
          <br />
          {errors.yield?.unit && <span>{errors.yield.unit.message}</span>}
        </div>
        {/* duration */}
        <div>
          <h2>Duration</h2>
          <label htmlFor="form-duration-prepTime">Prep Time (in minutes)</label>
          <br />
          <input
            name="duration.prepTime"
            id="form-duration-prepTime"
            ref={register}
            type="number"
          />
          <br />
          {errors.duration?.prepTime && (
            <span>{errors.duration.prepTime.message}</span>
          )}
          <br />
          <label htmlFor="form-duration-cookTime">Unit (in minutes)</label>
          <br />
          <input
            name="duration.cookTime"
            id="form-duration-cookTime"
            ref={register}
            type="number"
          />
          <br />
          {errors.duration?.cookTime && (
            <span>{errors.duration.cookTime.message}</span>
          )}
        </div>
        {/* ingredients */}
        <div>
          <h2>Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <div key={ingredient.id}>
              <h3>Ingredient {index + 1}</h3>
              <label htmlFor={`ingredients[${index}].section`}>Section</label>
              <br />
              <input
                defaultValue={ingredient.section}
                id={`ingredients[${index}].section`}
                name={`ingredients[${index}].section`}
                ref={register()}
                type="text"
              />
              <br />
              <label htmlFor={`ingredients[${index}].amount`}>Amount</label>
              <br />
              <input
                defaultValue={ingredient.amountId}
                id={`ingredients[${index}].amount`}
                name={`ingredients[${index}].amount`}
                ref={register()}
                type="number"
              />
              <br />
              <label htmlFor={`ingredients[${index}].unit`}>
                Unit (e.g. g, ml, tbsp, etc.)
              </label>
              <br />
              <input
                defaultValue={ingredient.unit}
                id={`ingredients[${index}].unit`}
                name={`ingredients[${index}].unit`}
                ref={register()}
                type="text"
              />
              <br />
              <label htmlFor={`ingredients[${index}].name`}>Name</label>
              <br />
              <input
                defaultValue={ingredient.name}
                id={`ingredients[${index}].name`}
                name={`ingredients[${index}].name`}
                ref={register()}
                type="text"
              />
              <br />
              <label htmlFor={`ingredients[${index}].alteration`}>
                Alteration (e.g. chopped, warm, etc.)
              </label>
              <br />
              <input
                defaultValue={ingredient.alteration}
                id={`ingredients[${index}].alteration`}
                name={`ingredients[${index}].alteration`}
                ref={register()}
                type="text"
              />
              <br />
              <label htmlFor={`ingredients[${index}].substitutions`}>
                Substitutions
              </label>
              <br />
              <input
                defaultValue={ingredient.substitutions}
                id={`ingredients[${index}].substitutions`}
                name={`ingredients[${index}].substitutions`}
                ref={register()}
                type="text"
              />
              <br />
              {ingredients.length > 1 && (
                <button onClick={() => remove(index)}>Remove Ingredient</button>
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
          {errors.ingredients && (
            <span>Please fill out at least one ingredient.</span>
          )}
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

  return {
    props: {
      courseTypes: JSON.parse(JSON.stringify(courseTypes)),
      dishTypes: JSON.parse(JSON.stringify(dishTypes)),
      cuisines: JSON.parse(JSON.stringify(cuisines)),
      dietaryRestrictions: JSON.parse(JSON.stringify(dietaryRestrictions)),
    },
  };
}
