import { Chip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles((theme) => {
  return {
    tags: {
      '& ul': {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        '& li': {
          display: 'inline-block',
          margin: `${theme.spacing(1)}px`,
        },
      },
    },
  }
})

const DisplayTags = ({ tags, title }) => {
  const classes = useStyles()

  return (
    <div className={classes.tags}>
      <Typography
        className='font-weight-bold'
        gutterBottom
      >
        {title}
      </Typography>
      <ul>
        {tags.map((tag) => {
          return (
            <li key={tag}>
              <Chip
                className='text-transform-capitalize'
                color='primary'
                label={tag}
                size='small'
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function RecipeTags({
  courseTypes, cuisines, dishTypes, dietaryRestrictions,
}) {
  return (
    <div>
      <DisplayTags tags={courseTypes} title='Course Types' />
      <DisplayTags tags={dishTypes} title='Dish Types' />
      <DisplayTags tags={cuisines} title='Cuisines' />
      <DisplayTags tags={dietaryRestrictions} title='Dietary Restrictions' />
    </div>
  )
}

DisplayTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

RecipeTags.propTypes = {
  courseTypes: PropTypes.arrayOf(PropTypes.string),
  cuisines: PropTypes.arrayOf(PropTypes.string),
  dishTypes: PropTypes.arrayOf(PropTypes.string),
  dietaryRestrictions: PropTypes.arrayOf(PropTypes.string),
}
