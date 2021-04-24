import { createContext, ReactNode, useState } from 'react'

type Episode = {
  title: string;
  members: string;
  thumbnail: string  
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffle: boolean
  play: (episode: Episode) => void
  togglePlay: () => void
  toggleLoop: () => void
  toggleSuffling: () => void
  setPlayingState: (state: boolean) => void
  playList: (episodeList: Episode[], index: number) => void
  playNext: () => void
  playPrevious: () => void
  hasNext: () => boolean
  hasPrevious: () => boolean
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode
}

export const PlayerContextProvider = ({ children }: PlayerContextProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffling] = useState(false);

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  const playList = (episodeList: Episode[], index: number) => {
    setEpisodeList(episodeList);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  }

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  }

  const toggleSuffling = () => {
    setIsShuffling(!isShuffle);
  }

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state);
  }

  const hasPrevious = () => currentEpisodeIndex > 0
  const hasNext = () => currentEpisodeIndex + 1 < episodeList.length

  const playNext = () => {
    if (hasNext()) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  const playPrevious = () => {
    if (hasPrevious()) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffle,
        play,
        togglePlay,
        toggleLoop,
        toggleSuffling,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
