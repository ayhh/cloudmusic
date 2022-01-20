import React from 'react'
import { Redirect } from 'react-router-dom'

import Discover from '@/pages/Discover'
import Friends from '@/pages/Friends'
import User from '@/pages/User'
import Album from '../pages/Discover/children/Album'
import Artist from '../pages/Discover/children/Artist'
import Djradio from '../pages/Discover/children/Djradio'
import Ranking from '@/pages/Discover/children/Ranking'
import Recommend from '../pages/Discover/children/Recommend'
import Songs from '../pages/Discover/children/Songs'
import Player from '@/pages/Player'

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/discover' />,
  },
  {
    path: '/discover',
    component: Discover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to='/discover/recommend' />,
      },
      {
        path: '/discover/recommend',
        component: Recommend,
      },
      {
        path: '/discover/ranking',
        component: Ranking,
      },
      {
        path: '/discover/songs',
        component: Songs,
      },
      {
        path: '/discover/djradio',
        component: Djradio,
      },
      {
        path: '/discover/atrist',
        component: Artist,
      },
      {
        path: '/discover/album',
        component: Album,
      },
      {
        path: '/discover/player',
        component: Player,
      },
    ],
  },
  {
    path: '/fiends',
    component: Friends,
  },
  {
    path: '/user',
    component: User,
  },
]

export default routes
