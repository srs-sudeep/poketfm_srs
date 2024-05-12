import React, { useEffect } from 'react'
import FastForwardIcon from '@mui/icons-material/FastForward'
import FastRewindIcon from '@mui/icons-material/FastRewind'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SpeedIcon from '@mui/icons-material/Speed'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const Control = ({
  controlRef,
  playing,
  onPlayPause,
  mute,
  onMute,
  onVolumeChangeHandler,
  onVolumeSeekUp,
  volume,
  played,
  onSeek,
  onSeekMouseUp,
  onMouseSeekDown,
  duration,
  currentTime,
  onRewind,
  onForward,
  onClickFullscreen,
  onClickPIP,
  onPreviousMedia,
  onNextMedia,
  playRate,
  onPlayRateChange,
}) => {
  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&::before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  })
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case ' ':
          onPlayPause()
          break
        case 'ArrowUp':
          if (volume < 1) {
            onVolumeChangeHandler(null, volume * 100 + 5)
          }
          break
        case 'ArrowDown':
          if (volume > 0) {
            onVolumeChangeHandler(null, volume * 100 - 5)
          }
          break
        case 'ArrowRight':
          onForward()
          break
        case 'ArrowLeft':
          onRewind()
          break
        case 'm':
          onMute()
          break
        case 'f':
          onClickFullscreen()
          break
        case 'Escape':
          document.exitFullscreen()
          break
        case 'w':
          onClickPIP()
          break
        case 'n':
          onNextMedia()
          break
        case 'p':
          onPreviousMedia()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    onPlayPause,
    onVolumeChangeHandler,
    volume,
    onForward,
    onRewind,
    onMute,
    onClickFullscreen,
    onNextMedia,
    onPreviousMedia,
    onClickPIP,
  ])
  return (
    <div
      ref={controlRef}
      className={` flex bg-black/[0.6] absolute top-0 bottom-0 left-0 right-0 flex-col z-1 justify-between`}
    >
      <div className="mx-2 my-3 text-icon font-black">
        <h2>Video Player</h2>
      </div>
      <div className="flex flex-row justify-center items-center gap-5">
        <div className="text-icon" onClick={onPreviousMedia}>
          <SkipPreviousIcon fontSize="large" className="cursor-pointer" />
        </div>
        <div className="text-icon" onClick={onRewind}>
          <FastRewindIcon fontSize="large" className="cursor-pointer" />
        </div>

        <div className="text-icon" onClick={onPlayPause}>
          {playing ? (
            <PauseIcon fontSize="large" className="cursor-pointer" />
          ) : (
            <PlayArrowIcon fontSize="large" className="cursor-pointer" />
          )}{' '}
        </div>

        <div className="text-icon" onClick={onForward}>
          <FastForwardIcon fontSize="large" className="cursor-pointer" />
        </div>
        <div className="text-icon" onClick={onNextMedia}>
          <SkipNextIcon fontSize="large" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[20%] w-[100%]">
        <div className="items-center px-10 w-[100%]">
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            min={0}
            max={100}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onMouseSeekDown}
          />
        </div>
        <div className="flex items-center justify-stretch w-[100%]">
          <div className="mx-5 flex items-center flex-row gap-5 w-[35%]">
            <div className="text-icon" onClick={onPlayPause}>
              {playing ? (
                <PauseIcon fontSize="medium" className="cursor-pointer" />
              ) : (
                <PlayArrowIcon fontSize="medium" className="cursor-pointer" />
              )}{' '}
            </div>
            <div className="text-icon" onClick={onNextMedia}>
              <SkipNextIcon fontSize="medium" className="cursor-pointer" />
            </div>
            <div className="text-icon" onClick={onMute}>
              {mute ? (
                <VolumeOffIcon fontSize="medium" className="cursor-pointer" />
              ) : (
                <VolumeUpIcon fontSize="medium" className="cursor-pointer" />
              )}
            </div>
            <Slider
              min={0}
              max={100}
              size="small"
              onChange={(event, value) => {
                if (value === 0) {
                  onMute() // Call onMute function if volume is 0
                } else {
                  onVolumeChangeHandler(event, value) // Otherwise, call onVolumeChangeHandler
                }
              }}
              value={volume * 100}
              onChangeCommitted={onVolumeSeekUp}
            />
            <span className="text-xs">{currentTime}</span>
            <span className="text-xs">/</span>
            <span className="text-xs">{duration}</span>
          </div>
          <div className="flex flex-row gap-6">
            <FullscreenIcon
              size="medium"
              onClick={onClickFullscreen}
              className="cursor-pointer"
            />
            <PictureInPictureIcon
              size="medium"
              onClick={onClickPIP}
              className="cursor-pointer"
            />
            <Select
              value={playRate}
              onChange={(e) => onPlayRateChange(parseFloat(e.target.value))}
              style={{ color: 'white' }}
            >
              {[...Array(15)].map((_, index) => (
                <MenuItem key={index} value={(index + 2) / 4}>
                  {((index + 2) / 4).toFixed(2)}x
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Control
