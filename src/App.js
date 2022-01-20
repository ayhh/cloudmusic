import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import routes from '@/route'
import store from '@/store'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlayBar from '@/components/PlayBar'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Header></Header>
        {renderRoutes(routes)}
        <Footer></Footer>
        <PlayBar></PlayBar>
      </HashRouter>
    </Provider>
  )
})
