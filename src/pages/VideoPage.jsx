import ReactPlayer from 'react-player'
import Container from '@mui/material/Container'
import Control from '../components/Control'
import Typography from '@mui/material/Typography'
import { useState, useRef, useEffect } from 'react'
import { formatTime } from '../utils'
import screenfull from 'screenfull' // Import screenfull library
import CircularProgress from '@mui/material/CircularProgress' // Import CircularProgress component from Material-UI
import { useDispatch, useSelector } from 'react-redux'
import { setMediaUrls, setCurrentMediaIndex } from '../app/slices'
let count = 0
const VideoPage = () => {
  const controlRef = useRef(null)
  const videoPlayerRef = useRef(null)
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playbackRate: 1.0,
    played: 0,
    seeking: false,
    buffer: true,
  })
  const dispatch = useDispatch()
  const handleVideoSelect = (index) => {
    dispatch(setCurrentMediaIndex(index))
  }
  // Redux state
  const media = useSelector((state) => state.videos.media)
  const mediaUrls = media.map((item) => item.url)
  const currentMediaIndex = useSelector(
    (state) => state.videos.currentMediaIndex,
  )
  const { playing, muted, volume, playbackRate, played, seeking, buffer } =
    videoState
  const onMouseMoveCaptureHandler = () => {
    controlRef.current.style.visibility = 'visible'
  }
  const progressHandler = (state) => {
    if (count > 5) {
      controlRef.current.style.visibility = 'hidden'
    } else if (controlRef.current.style.visibility === 'visible') {
      count += 1
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state })
    }
  }
  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing })
  }

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted })
  }
  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    })
  }

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    })
  }

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : '00:00'
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : '00:00'

  const formatCurrentTime = formatTime(currentTime)
  const formatDuration = formatTime(duration)
  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value / 100) })
    videoPlayerRef.current.seekTo(parseFloat(value / 100))
    console.log(videoPlayerRef.current)
  }

  const seekMouseUpHandler = (e, value) => {
    console.log(value)

    setVideoState({ ...videoState, seeking: false })
    videoPlayerRef.current.seekTo(value / 100)
  }
  const onSeekMouseDownHandler = (e) => {
    setVideoState({ ...videoState, seeking: true })
  }
  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 10)
  }
  const fastFowardHandler = () => {
    //FastFowards the video player by adding 10
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10)
  }
  const bufferStartHandler = () => {
    console.log('Bufering.......')
    setVideoState({ ...videoState, buffer: true })
  }

  const bufferEndHandler = () => {
    console.log('buffering stoped ,,,,,,play')
    setVideoState({ ...videoState, buffer: false })
  }
  const handleClickFullscreen = () => {
    if (screenfull.isEnabled && videoPlayerRef.current) {
      screenfull.request(videoPlayerRef.current.wrapper)
    }
  }
  const handleClickPIP = () => {
    if (videoPlayerRef.current) {
      const videoElement = videoPlayerRef.current.getInternalPlayer()
      if (document.pictureInPictureEnabled && videoElement) {
        videoElement
          .requestPictureInPicture()
          .then(() => {
            console.log('Entered Picture-in-Picture mode')
          })
          .catch((error) => {
            console.error('Failed to enter Picture-in-Picture mode:', error)
          })
      } else {
        console.error(
          'Picture-in-Picture mode is not supported in this browser',
        )
      }
    }
  }
  const previousMedia = () => {
    dispatch(
      setCurrentMediaIndex(
        currentMediaIndex === 0 ? mediaUrls.length - 1 : currentMediaIndex - 1,
      ),
    )
  }

  const nextMedia = () => {
    dispatch(setCurrentMediaIndex((currentMediaIndex + 1) % mediaUrls.length))
  }
  const onPlayRateChange = (rate) => {
    setVideoState({ ...videoState, playbackRate: rate })
  }
  const isAudioOnly =
    mediaUrls[currentMediaIndex].endsWith('.mp3') ||
    mediaUrls[currentMediaIndex].endsWith('.wav')

  return (
    <>
      <div>
        <Typography
          variant="h3"
          gutterBottom
          className="text-center py-5 text-6xl md:text-9xl font-black bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
        >
          SonicFlix Player
        </Typography>
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row ">
        <div className=" w-3/4">
          <Container maxWidth="md" justify="center">
            <div className="relative" onMouseMove={onMouseMoveCaptureHandler}>
              {isAudioOnly ? ( // Display black background only for audio files
                <img
                  src="public/black.jpg"
                  alt="Blank"
                  style={{ width: '100%', height: '100%' }}
                  className="border-yellow-100"
                />
              ) : (
                <></>
              )}
              <ReactPlayer
                className="react-player border border-yellow-100"
                url={mediaUrls[currentMediaIndex]}
                width="100%"
                height="100%"
                playing={playing}
                muted={muted}
                ref={videoPlayerRef}
                onProgress={progressHandler}
                onBuffer={bufferStartHandler}
                onBufferEnd={bufferEndHandler}
              />
              {buffer && (
                <CircularProgress
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}{' '}
              {/* Display CircularProgress component when buffering */}
              {!buffer && (
                <Control
                  controlRef={controlRef}
                  onPlayPause={playPauseHandler}
                  playing={playing}
                  mute={muted}
                  onMute={muteHandler}
                  volume={volume}
                  onVolumeChangeHandler={volumeChangeHandler}
                  onVolumeSeekUp={volumeSeekUpHandler}
                  played={played}
                  onSeek={seekHandler}
                  onSeekMouseUp={seekMouseUpHandler}
                  onMouseSeekDown={onSeekMouseDownHandler}
                  duration={formatDuration}
                  currentTime={formatCurrentTime}
                  onRewind={rewindHandler}
                  onForward={fastFowardHandler}
                  onClickFullscreen={handleClickFullscreen}
                  onClickPIP={handleClickPIP}
                  onPreviousMedia={previousMedia}
                  onNextMedia={nextMedia}
                  playRate={playbackRate}
                  onPlayRateChange={onPlayRateChange}
                  onTitle = {media[currentMediaIndex].title}
                />
              )}
            </div>
          </Container>
        </div>
        <div className="my-4 md:my-2 md:w-1/4 border-l px-2 border-gray-300 pr-4">
          {/* Video List */}
          <Typography variant='h4' className="text-xl mb-4">Video List</Typography>
          <div className="overflow-y-auto h-80">
            <ul>
              {media.map((video, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => handleVideoSelect(index)}
                    className="text-base text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    {video.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoPage
