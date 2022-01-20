import React, { memo, useEffect } from 'react';
import { HotRecommendWrapper } from './style';
import ThemeHeader from '@/components/Theme-Header';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getHotRecommendAction } from '../../store/actionCreators';
import SongsCard from '@/components/Songs-Card';

export default memo(function HotRecommend() {

  const dispatch = useDispatch()
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.getIn(["recommend", "hotRecommends"])
  }), shallowEqual)

  useEffect(() => {
    dispatch(getHotRecommendAction(8))
  }, [dispatch])

  return (
    <HotRecommendWrapper>
      <ThemeHeader title="热门推荐" keywords={["华语", "流行", "民谣", "摇滚", "电子"]} />
      <div className="recommend-list">
        {
          hotRecommends.map(item => {
            return <SongsCard info={item} key={item.id} />
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
