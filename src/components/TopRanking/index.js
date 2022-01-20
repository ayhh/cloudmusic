import { getSizeImage } from '@/utils/format'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { getSongDetailAction } from '../PlayBar/store'

import { TopRankingWrapper } from './style'

export default memo(function TopRanking(props) {
  const { info } = props
  const { tracks = [] } = info

  const dispatch = useDispatch()
  const playmusic = id => {
    dispatch(getSongDetailAction(id))
  }
  return (
    <TopRankingWrapper>
      <div className='header'>
        <div className='image'>
          <img src={getSizeImage(info.coverImgUrl)} alt='' />
          <a href='/todo' className='image_cover'>
            rank
          </a>
        </div>
        <div className='info'>
          <a href='/todo'>{info.name}</a>
          <div>
            <button className='btn play sprite_02'></button>
            <button className='btn favor sprite_02'></button>
          </div>
        </div>
      </div>
      <div className='list'>
        {tracks.slice(0, 10).map((item, index) => {
          return (
            <div className='list-item' key={item.id}>
              <div className='rank'>{index + 1}</div>
              <div className='info'>
                <span className='name text-nowrap'>{item.name}</span>
                <div className='operate'>
                  <button
                    className='btn sprite_02 play'
                    onClick={e => playmusic(item.id)}
                  ></button>
                  <button className='btn sprite_icon2 addto'></button>
                  <button className='btn sprite_02 favor'></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='footer'>
        <a href='/todo'>查看全部</a>
      </div>
    </TopRankingWrapper>
  )
})
