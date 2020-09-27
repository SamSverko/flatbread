import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import { connectToDatabase } from "../util/mongodb";

const schema = yup.object().shape({
  title: yup.string().required(),
  courseTypes: yup.array().min(1),
});

export default function Add({ courseTypes }) {
  // console.log(courseTypes);

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

  return {
    props: {
      courseTypes: JSON.parse(JSON.stringify(courseTypes)),
    },
  };
}
