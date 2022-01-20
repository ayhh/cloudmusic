import React, { memo } from 'react'
import TopBanners from './c-components/top-banners';
import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from './style';
import HotRecommend from './c-components/hot-recommend';
import NewAlbum from './c-components/new-albun';
import Ranking from './c-components/ranking';
function Recommend() {


  return (
    <RecommendWrapper>
      <TopBanners></TopBanners>
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend></HotRecommend>
          <NewAlbum></NewAlbum>
          <Ranking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(Recommend)

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannersAction())
//   }
// })

// export default connect(mapStateToProps,mapDispatchToProps)(memo(Recommend))
