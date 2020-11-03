import { Typography } from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => {
  return {
    durationYield: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      margin: `0 0 ${theme.spacing(1)}px 0`,
      '& div': {
        maxWidth: '150px',
        width: '33%',
      },
    },
  }
})

export default function RecipeHeader({ duration, recipeYield, title }) {
  const classes = useStyles()

  return (
    <div>
      <Typography
        className='text-transform-capitalize'
        component='h3'
        gutterBottom
        variant='h5'
      >
        {title}
      </Typography>
      <div className={classes.durationYield}>
        <div>
          <RestaurantMenuIcon titleAccess='Knife and spoon icon.' />
          <Typography>
            <span className='font-weight-bold'>Prep</span>
          </Typography>
          <Typography>
            {duration.prepTime} min
            {duration.prepTime > 1 ? 's' : ''}
          </Typography>
        </div>
        <div>
          <AccessTimeIcon titleAccess='Clock icon.' />
          <Typography>
            <span className='font-weight-bold'>Cook</span>
          </Typography>
          <Typography>
            {duration.cookTime} min
            {duration.cookTime > 1 ? 's' : ''}
          </Typography>
        </div>
        <div>
          <GroupWorkIcon
            titleAccess='Circle with three dots in it.'
          />
          <Typography>
            <span className='font-weight-bold'>Yield</span>
          </Typography>
          <Typography>
            {recipeYield.amount} {recipeYield.unit}
          </Typography>
        </div>
      </div>
    </div>
  )
}

RecipeHeader.propTypes = {
  duration: PropTypes.shape({
    cookTime: PropTypes.number.isRequired,
    prepTime: PropTypes.number.isRequired,
  }).isRequired,
  recipeYield: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
}
