import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { connectToDatabase } from "../util/mongodb";

const schema = yup.object().shape({
  title: yup.string().min(4).lowercase().required(),
  courseTypes: yup.array().min(1),
  dishTypes: yup.array().min(1),
  cuisines: yup.array().min(1),
  dietaryRestrictions: yup.array(),
  source: yup.object({
    name: yup.string().lowercase().required(),
    url: yup.string().url(),
  }),
});

export default function Add({
  courseTypes,
  cuisines,
  dietaryRestrictions,
  dishTypes,
}) {
  const { errors, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
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
