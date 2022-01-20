import React, { memo, useState, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Slider } from 'antd'

import { PlaybarWrapper, PlayInfo, Control, Operator } from './style'
import {
  changeSequenceAction,
  changeCurrentSongIndexAction,
  changeCurrentSongAction,
  getLyricAction,
  changeLyricIndexAction,
} from './store/actionCreators'
import { formatMinuteSecond, getPlaySong, getSizeImage } from '@/utils/format'

export default memo(function PlayerBar() {
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChangeing, setIsChangeing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const dispatch = useDispatch()
  const { currentSong, sequence, currentSongIndex, playList, lyricList } =
    useSelector(
      state => ({
        currentSong: state.getIn(['player', 'currentSong']),
        sequence: state.getIn(['player', 'sequence']),
        currentSongIndex: state.getIn(['player', 'currentSongIndex']),
        playList: state.getIn(['player', 'playList']),
        lyricList: state.getIn(['player', 'lyricList']),
      }),
      shallowEqual
    )

  const audioRef = useRef()

  // useEffect(() => {
  //   dispatch(getSongDetailAction(1330348068))
  // }, [dispatch])

  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id)
    audioRef.current
      .play()
      .then(setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false)
      })
  }, [currentSong])

  const picUrl = currentSong.al && currentSong.al.picUrl
  const songName = currentSong.name && currentSong.name
  const singerName = currentSong.ar && currentSong.ar[0].name
  const duration = currentSong.dt || 0
  // const progress = currentTime / duration * 100

  // 播放/暂停音乐
  const playMusic = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  // 播放进度时间
  const timeUpdate = e => {
    const currentTime = e.target.currentTime * 1000
    // 进度条没有改变
    if (!isChangeing) {
      setCurrentTime(currentTime)
      setProgress((currentTime / duration) * 100)
    }
    let i = 0
    for (; i < lyricList.length; i++) {
      if (currentTime < lyricList[i].time) {
        break
      }
    }
    // console.log(lyricList[i - 1]);
    dispatch(changeLyricIndexAction(i - 1))
  }

  // 进度滑动时
  const changOn = value => {
    // console.log('changOn',value);
    setIsChangeing(true)
    setProgress(value)
    setCurrentTime((value / 100) * duration)
  }

  // 滑动结束
  const changOnAfter = value => {
    // console.log('changOnAfter',value);
    const currentTime = ((value / 100) * duration) / 1000
    audioRef.current.currentTime = currentTime
    setCurrentTime(currentTime * 1000)
    setIsChangeing(false)
  }

  // 改变播放顺序
  const changeSequence = () => {
    let changeSequenceIndex = sequence + 1
    if (changeSequenceIndex > 2) {
      changeSequenceIndex = 0
    }
    dispatch(changeSequenceAction(changeSequenceIndex))
  }

  const changeMusic = tag => {
    let nextSongIndex = 0
    switch (sequence) {
      case 1:
        let randomIndex = Math.floor(Math.random() * playList.length)
        while (randomIndex === currentSongIndex) {
          randomIndex = Math.floor(Math.random() * playList.length)
        }
        nextSongIndex = randomIndex
        // console.log(randomIndex);
        break
      default:
        nextSongIndex = currentSongIndex + tag
        if (nextSongIndex >= playList.length) nextSongIndex = 0
        if (nextSongIndex < 0) nextSongIndex = playList.length - 1
        break
    }
    const nextSong = playList[nextSongIndex]
    dispatch(changeCurrentSongIndexAction(nextSongIndex))
    dispatch(changeCurrentSongAction(nextSong))
    dispatch(getLyricAction(nextSong.id))
  }
  const handleMuiscEnd = () => {
    if (sequence === 2) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      changeMusic(1)
    }
  }

  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content wrap-v2'>
        <Control isPlaying={isPlaying}>
          <button
            className='sprite_player prev'
            onClick={e => changeMusic(-1)}
          ></button>
          <button className='sprite_player play' onClick={playMusic}></button>
          <button
            className='sprite_player next'
            onClick={e => changeMusic(+1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <NavLink to='/discover/player'>
              <img src={getSizeImage(picUrl, 34)} alt='' />
            </NavLink>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{songName}</span>
              <span className='singer-name'>{singerName}</span>
            </div>
            <div className='progress'>
              <Slider
                defaultValue={30}
                value={progress}
                onChange={changOn}
                onAfterChange={changOnAfter}
              ></Slider>
              <div className='time'>
                <span className='now-time'>
                  {formatMinuteSecond(currentTime)}
                </span>
                <span className='divider'>/</span>
                <span className='duration'>{formatMinuteSecond(duration)}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className='left'>
            <button className='sprite_player btn favor'></button>
            <button className='sprite_player btn share'></button>
          </div>
          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button
              className='sprite_player btn loop'
              onClick={e => changeSequence()}
            ></button>
            <button className='sprite_player btn playlist'></button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdate}
        onEnded={handleMuiscEnd}
      ></audio>
    </PlaybarWrapper>
  )
})
