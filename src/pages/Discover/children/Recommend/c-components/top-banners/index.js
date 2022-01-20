import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import { connect } from 'react-redux';

import { Carousel } from 'antd';

import { getTopBannersAction } from '../../store/actionCreators';
import {
  TopBannersWrapper,
  BannerLeft,
  BannerRight,
  BannerControl
} from './style';

export default memo(function TopBanners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const { getBanners } = props
  const { topBanners } = useSelector(state => ({
    topBanners: state.getIn(['recommend', 'topBanners'])
  }), shallowEqual)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopBannersAction())
  }, [dispatch])
  // console.log(topBanners);

  const bannerRef = useRef()
  const bannerChange = useCallback((form, to) => {
    setTimeout(() => {
      setCurrentIndex(to);
    }, 0);
  },[])

  const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + '?imageView&blur=40x20')


  return (
    <TopBannersWrapper bgImage={bgImage} >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={bannerChange}>
            {
              topBanners.map((item) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                  </div>
                )
              })
            }
          </Carousel>,
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </TopBannersWrapper>
  )
})
