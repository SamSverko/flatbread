import { createMuiTheme } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100',
        },
        body: {
          height: '100vh',
        },
        '#__next': {
          display: 'flex',
          minHeight: '100vh',
        },
        '.font-weight-bold': {
          fontWeight: 'bold',
        },
        '.text-transform-capitalize': {
          textTransform: 'capitalize',
        },
      },
    },
  },
})

theme.overrides.MuiAlert = {
  root: {
    margin: `0 0 ${theme.spacing(2)}px 0`,
  },
}

theme.overrides.MuiCard = {
  root: {
    margin: `0 auto ${theme.spacing(2)}px auto`,
    textAlign: 'center',
    width: '100%',
    '& .MuiCardActions-root': {
      justifyContent: 'center',
      padding: `
        0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px
      `,
    },
    '& .MuiCardContent-root': {
      paddingBottom: `${theme.spacing(2)}px !important`,
    },
    '& .MuiTextField-root': {
      margin: `0 0 ${theme.spacing(2)}px 0`,
    },
    '& .card-recipe-source': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      padding: theme.spacing(2),
    },
    '& .card-recipe-duration-yield': {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      '& div': {
        maxWidth: '150px',
        width: '33%',
      },
    },
  },
}

export default theme
