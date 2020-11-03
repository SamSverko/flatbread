import { yupResolver } from '@hookform/resolvers'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import RecipeHeader from '../components/recipe-header'
import RecipeSource from '../components/recipe-source'
import { connectToDatabase } from '../util/mongodb'

const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      margin: '0 auto',
      maxWidth: `${theme.breakpoints.values.sm}px`,
      width: '100%',
    },
  }
})

export default function Home({ isConnected }) {
  const classes = useStyles()

  const [recipes, setRecipes] = useState(false)
  const [hideAlerts, setHideAlerts] = useState(false)

  const schema = yup.object().shape({
    title: yup.string().trim().lowercase().min(4).required(),
  })

  const { errors, handleSubmit, register } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    axios
      .post(`/api/recipes?title=${data.title}`, data)
      .then(function (response) {
        console.log(response.data)
        setRecipes(response.data)
        setHideAlerts(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  if (!isConnected) {
    return (
      <Alert severity='error'>
        Error connecting to the database, please try again later.
      </Alert>
    )
  }

  return (
    <div className={classes.pageContainer}>
      {/* search card */}
      <Card>
        <CardContent>
          <Typography component='h1' gutterBottom variant='h5'>
            Find a Recipe
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* title */}
            <TextField
              error={typeof errors.title !== 'undefined'}
              fullWidth
              helperText={errors.title?.message}
              id='form-title'
              inputRef={register}
              label='Search by recipe title'
              name='title'
              size='small'
              variant='outlined'
            />
            {/* submit */}
            <div>
              {/* <input type='submit' /> */}
              <Button color='primary' type='submit' variant='contained'>
                Search
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* search alert feedback */}
      {!hideAlerts && recipes && recipes.length === 0 && (
        <Alert
          onClose={() => {
            setHideAlerts(true)
          }}
          severity='warning'
        >
          No recipes found.
        </Alert>
      )}
      {!hideAlerts && recipes && recipes.length !== 0 && (
        <Alert
          onClose={() => {
            setHideAlerts(true)
          }}
          severity='success'
        >
          {recipes.length} recipe{recipes.length > 1 ? 's' : ''} found!
        </Alert>
      )}

      {/* search results */}
      {recipes && recipes.length !== 0 && (
        <div>
          {recipes.map((recipe, index) => (
            <Card key={index}>
              <RecipeSource source={recipe.source} />

              <CardContent>
                <RecipeHeader
                  duration={recipe.duration}
                  recipeYield={recipe.yield}
                  title={recipe.title}
                />

              </CardContent>
              <CardActions>
                <Link href={`/recipe/${recipe._id}`} underline='none'>
                  <Button color='primary' variant='contained'>
                    View Recipe
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

Home.propTypes = {
  isConnected: PropTypes.bool,
}

export async function getStaticProps() {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
