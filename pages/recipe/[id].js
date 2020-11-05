import {
  Box,
  Card,
  CardContent,
  Divider,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import RecipeHeader from '../../components/recipe-header'
import RecipeSource from '../../components/recipe-source'
import RecipeTags from '../../components/recipe-tags'

const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {
      margin: '0 auto',
      maxWidth: `${theme.breakpoints.values.sm}px`,
    },
  }
})

export default function Recipe() {
  const router = useRouter()
  const { id } = router.query

  const [recipe, setRecipe] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    async function fetchData() {
      // /api/recipes/5f832c34e97769961f0375d1 // example recipe ID
      if (id) {
        fetch(`/api/recipes/${id}`)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result)
              setRecipe(result)
            },
            (error) => {
              console.error(error)
              setRecipe(500)
            },
          )
      }
    }
    fetchData()
  }, [id])

  if (!recipe) {
    return (
      <Alert className={classes.pageContainer} severity='info'>
        Loading recipe...
      </Alert>
    )
  }

  if (recipe === 404) {
    return (
      <Alert className={classes.pageContainer} severity='warning'>
        Recipe not found.
      </Alert>
    )
  }

  if (recipe === 500) {
    return (
      <Alert className={classes.pageContainer} severity='error'>
        A server error occured while loading this recipe.
        This is our bad, not yours!
      </Alert>
    )
  }

  return (
    <div className={classes.pageContainer}>
      <Card>
        <RecipeSource source={recipe.source} />

        <CardContent>

          <RecipeHeader
            duration={recipe.duration}
            recipeYield={recipe.yield}
            title={recipe.title}
          />

          <Box marginBottom={1}>
            <Divider />
          </Box>

          <RecipeTags
            courseTypes={recipe.courseTypes}
            cuisines={recipe.cuisines}
            dishTypes={recipe.dishTypes}
            dietaryRestrictions={recipe.dietaryRestrictions}
          />

        </CardContent>
      </Card>
    </div>
  )
}