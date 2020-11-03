import {
  Card,
  CardContent,
  Divider,
} from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import RecipeHeader from '../../components/recipe-header'
import RecipeSource from '../../components/recipe-source'

// const useStyles = makeStyles(() => {
//   return {
//   }
// })

export default function Recipe() {
  const router = useRouter()
  const { id } = router.query

  const [recipe, setRecipe] = useState(false)

  // const classes = useStyles()

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
      <Alert severity='info'>
        Loading recipe...
      </Alert>
    )
  }

  if (recipe === 404) {
    return (
      <Alert severity='warning'>
        Recipe not found.
      </Alert>
    )
  }

  if (recipe === 500) {
    return (
      <Alert severity='error'>
        A server error occured while loading this recipe.
        This is our bad, not yours!
      </Alert>
    )
  }

  return (
    <div>
      <Card>
        <RecipeSource source={recipe.source} />

        <CardContent>

          <RecipeHeader
            duration={recipe.duration}
            recipeYield={recipe.yield}
            title={recipe.title}
          />

          <Divider />

          <div className='card-recipe-tags'></div>

        </CardContent>
      </Card>
    </div>
  )
}
