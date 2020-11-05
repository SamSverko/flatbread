import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import InfoIcon from '@material-ui/icons/Info'
import ListAltIcon from '@material-ui/icons/ListAlt'
import NotesIcon from '@material-ui/icons/Notes'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => {
  return {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
      padding: theme.spacing(2),
    },
  }
})

const StyledAppBar = withStyles((theme) => {
  return {
    root: {
      '& .MuiTypography-root': {
        color: theme.palette.common.white,
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
  }
})(AppBar)

const StyledToolbar = withStyles(() => {
  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
  }
})(Toolbar)

export default function PageLayout(props) {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  return (
    <div className={classes.pageContainer}>
      {/* header */}
      <StyledAppBar position='static'>
        <Link href='/'>
          <StyledToolbar>
            <Typography variant='h6'>Flatbread</Typography>
          </StyledToolbar>
        </Link>
      </StyledAppBar>

      {/* content */}
      <div className={classes.content}>{props.children}</div>

      {/* footer */}
      {!props.noFooter && (
        <BottomNavigation
          onChange={(event, newValue) => {
            console.log(newValue)
            setValue(newValue)
          }}
          showLabels
          value={value}
        >
          <BottomNavigationAction label='Info' icon={<InfoIcon />} />
          <BottomNavigationAction label='Ingredients' icon={<ListAltIcon />} />
          <BottomNavigationAction label='Steps' icon={<DoneAllIcon />} />
          <BottomNavigationAction label='Notes' icon={<NotesIcon />} />
          <BottomNavigationAction label='Show All' icon={<ViewAgendaIcon />} />
        </BottomNavigation>
      )}
    </div>
  )
}

PageLayout.propTypes = {
  children: PropTypes.any,
  noFooter: PropTypes.bool,
}
