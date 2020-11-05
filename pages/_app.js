import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import PageLayout from '../components/page-layout'
import theme from '../src/theme'

const NO_FOOTER_ROUTES = ['/', '/add']

export default function MyApp(props) {
  const { Component, pageProps } = props
  const router = useRouter()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Flatbread</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageLayout noFooter={NO_FOOTER_ROUTES.includes(router.pathname)}>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}
