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

theme.overrides.MuiCard = {
  root: {
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
  },
}

export default theme
