import {
  getLyric,
  getSongDetail
} from "@/api/player"
import { parseLyric } from "@/utils/parseLyric"
import * as actionType from './contants'

export const changeCurrentSongAction = (currentSong) => ({
  type: actionType.CHANGE_CURRENT_SONG,
  currentSong
})

export const changeCurrentSongIndexAction = (index) => ({
  type: actionType.CHANGE_CURRENT_SONG_INDEX,
  index
})

const changePlayListAction = (playList) => ({
  type: actionType.CHANGE_PLAY_LIST,
  playList
})

export const changeSequenceAction = (sequence) => ({
  type: actionType.CHANGE_SEQUENCE,
  sequence
})

const changeLyricAtion = (lyricList) => ({
  type: actionType.CHANGE_LYRIC_LIST,
  lyricList
})

export const changeLyricIndexAction = index => ({
  type: actionType.CHANGE_LYRIC_INDEX,
  index
})

export const getLyricAction = (id) => {
  return dispatch => {
    getLyric(id).then(res => {
      // dispatch(changeLyricAtion(res.lrc.lyric))
      // console.log(res.lrc.lyric);
      const { lyric } = res.lrc
      const lyricList = parseLyric(lyric)
      dispatch(changeLyricAtion(lyricList))
    })
  }
}

export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 获取播放列表
    const playList = getState().getIn(["player", "playList"])
    // 根据id找到列表中已有的歌曲
    const songIndex = playList.findIndex(item => {
      return item.id === ids
    })

    let song = null
    // 找到列表中当前歌曲
    if (songIndex !== -1) {
      // 修改当前歌曲和index
      dispatch(changeCurrentSongIndexAction(songIndex))
      const currentsong = playList[songIndex]
      dispatch(changeCurrentSongAction(currentsong))
      dispatch(getLyricAction(currentsong.id))
    } else {
      // 请求新的歌曲,并添加到播放列表中
      getSongDetail(ids).then(res => {
        song = res.songs && res.songs[0]
        if (!song) return
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))

        // 获取歌词
        dispatch(getLyricAction(song.id))
      })
    }
    // 因为前面都是异步操作，所以不能在后面判断歌曲是否存在再获取歌词，不然会直接返回出去
  }
}