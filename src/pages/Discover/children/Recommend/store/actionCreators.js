import { getTopBanners, getHotRecommends, getNewAlbums, getTopList } from '@/api/recommend'
import * as actionType from './constants'



const changeBannersAction = (res) => ({
  type: actionType.CHANGE_TOP_BANNERS,
  topBanners: res.banners
})

export const getTopBannersAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeBannersAction(res))
      // console.log(res);
    })
  }
}

const ChangeHotRecommendAction = (res) => ({
  type: actionType.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result
})

export const getHotRecommendAction = (limit) => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      dispatch(ChangeHotRecommendAction(res))
      // console.log(res);
    })
  }
}

const changeNewAlbum = (res) => ({
  type: actionType.CHANGE_NEW_ALBUM,
  newAlbums: res.albums
})

export const getNewAlbumAction = (limit) => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      dispatch(changeNewAlbum(res))
      // console.log(res);
    })
  }
}

const changeUpRankingAction = res => ({
  type: actionType.CHANGE_UP_RANKING,
  upRanking: res.playlist
})


const changeNewRankingAction = res => ({
  type: actionType.CHANGE_NEW_RANKING,
  newRanking: res.playlist
})

const changeOriginRankingAction = res => ({
  type: actionType.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist
})

export const getUnRankingAction = (id) => {
  return dispatch => {
    getTopList(id).then( res => {
      switch (id) {
        case 0:
          dispatch(changeUpRankingAction(res))
          break;
        case 2: 
          dispatch(changeNewRankingAction(res))
          break;
        case 3:
          dispatch(changeOriginRankingAction(res))
          break;
        default:
          break;
      }
    })
  }
}