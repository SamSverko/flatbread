import {
  Box,
  Card,
  CardContent,
  Divider,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

import RecipeHeader from '../components/recipe-header'
import RecipeSource from '../components/recipe-source'
import RecipeTags from '../components/recipe-tags'

export default function ViewInfo({
  courseTypes,
  cuisines,
  duration,
  dishTypes,
  dietaryRestrictions,
  recipeYield,
  source,
  title,
}) {
  return (
    <Card>
      <RecipeSource source={source} />
      <CardContent>
        <RecipeHeader
          duration={duration}
          recipeYield={recipeYield}
          title={title}
        />

        <Box marginBottom={1}>
          <Divider />
        </Box>

        <RecipeTags
          courseTypes={courseTypes}
          cuisines={cuisines}
          dishTypes={dishTypes}
          dietaryRestrictions={dietaryRestrictions}
        />
      </CardContent>
    </Card>
  )
}

ViewInfo.propTypes = {
  courseTypes: PropTypes.arrayOf(PropTypes.string),
  cuisines: PropTypes.arrayOf(PropTypes.string),
  dishTypes: PropTypes.arrayOf(PropTypes.string),
  dietaryRestrictions: PropTypes.arrayOf(PropTypes.string),
  duration: PropTypes.shape({
    cookTime: PropTypes.number.isRequired,
    prepTime: PropTypes.number.isRequired,
  }).isRequired,
  recipeYield: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }),
  source: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
}
