import { Box, Link, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import PropTypes from 'prop-types'
import React from 'react'

const StyledBox = withStyles((theme) => {
  return {
    root: {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      padding: theme.spacing(2),
    },
  }
})(Box)

export default function RecipeSource({ source }) {
  return (
    <StyledBox boxShadow={1}>
      <Typography
        className='text-transform-capitalize'
        component='h2'
        variant='h6'
      >
        {source.url && (
          <Link
            href={source.url}
            rel='noopener noreferrer'
            target='_blank'
            underline='none'
          >
            {source.name}
          </Link>
        )}
        {!source.url && source.name}
      </Typography>
    </StyledBox>
  )
}

RecipeSource.propTypes = {
  source: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
}
