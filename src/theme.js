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
          fontWeight: 'bold',
        },
        '.text-transform-capitalize': {
          textTransform: 'capitalize',
        },
      },
    },
  },
})

export default theme
