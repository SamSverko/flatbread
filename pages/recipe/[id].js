import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => {
  return {
    alert: {
      margin: `0 0 ${theme.spacing(2)}px 0`,
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
      // /api/recipes/5f832c34e97769961f0375d1
      if (id) {
        fetch('/api/recipes/5f832c34e97769961f0375d1')
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result)
              setRecipe(result)
            },
            (error) => {
              setRecipe(error)
            },
          )
      }
    }
    fetchData()
  }, [id])

  return (
    <div>
      {!recipe && (
        <Alert className={classes.alert} severity="info">
          Loading recipe...
        </Alert>
      )}

      {recipe && (
        <Card variant="outlined">
          <CardContent>
            <Typography component="h1" variant="h5">
              {recipe.source.name}
            </Typography>

            <Typography component="h1" variant="h5">
              {recipe.title}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
