import { createMuiTheme } from '@material-ui/core/styles'

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
          fontWeight: 'bold !important',
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
  },
}

export default theme
