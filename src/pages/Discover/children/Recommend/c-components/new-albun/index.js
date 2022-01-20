import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'antd'

import ThemeHeader from '@/components/Theme-Header'
import AlbumCard from '@/components/Album-Card'
import { getNewAlbumAction } from '../../store/actionCreators'
import { AlbumWrapper } from './style'

export default memo(function NewAlbum() {
  const { newAlbums } = useSelector(
    state => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])

  const pageRef = useRef()

  return (
    <AlbumWrapper>
      <ThemeHeader title='新碟上架'></ThemeHeader>
      <div className='content'>
        <button
          className='arrow arrow-left sprite_02'
          onClick={e => pageRef.current.prev()}
        ></button>
        <div className='album'>
          <Carousel dots='false' ref={pageRef}>
            {[0, 1].map(item => {
              return (
                <div key={item} className='page'>
                  {newAlbums.slice(item * 5, (item + 1) * 5).map(i => {
                    return (
                      <AlbumCard
                        key={i.id}
                        info={i}
                        size={100}
                        width={118}
                        bgp={'-570px'}
                      ></AlbumCard>
                    )
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className='arrow arrow-right sprite_02'
          onClick={e => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  )
})
