import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { connectToDatabase } from "../util/mongodb";

const schema = yup.object().shape({
  title: yup.string().min(4).lowercase().required(),
  courseTypes: yup.array().of(yup.string()).min(1),
  dishTypes: yup.array().of(yup.string()).min(1),
  cuisines: yup.array().of(yup.string()).min(1),
  dietaryRestrictions: yup.array().of(yup.string()),
  source: yup.object({
    name: yup.string().lowercase().required(),
    url: yup.string().url(),
  }),
  yield: yup.object({
    amount: yup.number().required(),
    unit: yup.string().lowercase().required(),
  }),
  duration: yup.object({
    prepTime: yup.number().required(),
    cookTime: yup.number().required(),
  }),
  ingredients: yup.array().of(
    yup.object({
      section: yup.string().lowercase(),
      amount: yup.number().required(),
      // unit: yup.string().lowercase().required(),
      // name: yup.string().lowercase().required(),
      // alteration: yup.string().lowercase().required(),
      // substitutions: yup.array().of(yup.string()),
    })
  ),
});

export default function Add({
  courseTypes,
  cuisines,
  dietaryRestrictions,
  dishTypes,
}) {
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

  const onSubmit = (data) => {
    console.log(data);
    console.log(data.ingredients);
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
              <label htmlFor={`ingredients[${index}].section`}>Section</label>
              <input
                defaultValue={ingredient.section}
                id={`ingredients[${index}].section`}
                name={`ingredients[${index}].section`}
                ref={register()}
                type="text"
              />
              <label htmlFor={`ingredients[${index}].amount`}>Amount</label>
              <input
                defaultValue={ingredient.amountId}
                id={`ingredients[${index}].amount`}
                name={`ingredients[${index}].amount`}
                ref={register()}
                type="number"
              />
              {ingredients.length > 1 && (
                <button onClick={() => remove(index)}>Remove Ingredient</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => append()}>
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

  return {
    props: {
      courseTypes: JSON.parse(JSON.stringify(courseTypes)),
      dishTypes: JSON.parse(JSON.stringify(dishTypes)),
      cuisines: JSON.parse(JSON.stringify(cuisines)),
      dietaryRestrictions: JSON.parse(JSON.stringify(dietaryRestrictions)),
    },
  };
}
