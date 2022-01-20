import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import ThemeHeader from '@/components/Theme-Header';
import TopRanking from '@/components/TopRanking';

import { getUnRankingAction } from '../../store/actionCreators';
import { RankingWrapper } from './style';
export default memo(function Ranking() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUnRankingAction(0))
    dispatch(getUnRankingAction(2))
    dispatch(getUnRankingAction(3))
  }, [dispatch])

  const { upRanking, newRanking, originRanking} = useSelector(state => ({
    upRanking: state.getIn(['recommend', 'upRanking']),
    newRanking: state.getIn(['recommend', 'newRanking']),
    originRanking: state.getIn(['recommend', 'originRanking'])
  }))


  return (
    <RankingWrapper>
      <ThemeHeader title="榜单" />
      <div className="tops">
        <TopRanking info={upRanking}></TopRanking>
        <TopRanking info={newRanking}></TopRanking>
        <TopRanking info={originRanking}></TopRanking>
      </div>
    </RankingWrapper>
  )
})
