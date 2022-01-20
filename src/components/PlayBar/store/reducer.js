import { Map } from 'immutable';
import * as actionType from './contants'

const defaultState = Map({
  currentSong: {},
  playList: [],
  currentSongIndex: 0,
  sequence: 0,  //0循环播放 1随机 2单曲循环
  lyricList: [],
  currentLyricIndex: 0
})

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionType.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong)
    case actionType.CHANGE_PLAY_LIST:
      return state.set('playList', action.playList)
    case actionType.CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.index)
    case actionType.CHANGE_SEQUENCE:
      return state.set('sequence', action.sequence)
    case actionType.CHANGE_LYRIC_LIST:
      return state.set('lyricList', action.lyricList)
    case actionType.CHANGE_LYRIC_INDEX:
      return state.set('currentLyricIndex', action.index)
    default:
      return state
  }
}