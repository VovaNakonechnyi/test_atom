export interface EventYT {
  target: RootYT;
  data: number;
}

export interface RootYT {
  h: H;
  g: G2;
  u: U;
  i: number;
  G: boolean;
  o: any[];
  l: L;
  W: W;
  closure_uid_294079271: number;
  id: number;
  M: string;
  ka: Ka;
  playerInfo: PlayerInfo;
  loadVideoById: (str: string) => {};
  videoTitle: string;
}

export interface H {
  g: G;
}

export interface G {
  title: string;
  videoId: string;
  width: string;
  height: string;
  events: Events;
  host: string;
}

export interface Events {}

export interface G2 {}

export interface U {}

export interface L {
  i: boolean;
  G: number;
  l: any[];
  o: number;
  g: string | undefined[];
  h: H2;
  M: boolean;
}

export interface H2 {
  onStateChange: number[];
}

export interface W {
  onStateChange: boolean;
}

export interface Ka {}

export interface PlayerInfo {
  apiInterface: string[];
  videoBytesLoaded: number;
  videoBytesTotal: number;
  videoLoadedFraction: number;
  videoStartBytes: number;
  playlist: any;
  playlistIndex: number;
  playlistId: any;
  option: any;
  options: any[];
  muted: boolean;
  volume: number;
  playerMode: PlayerMode;
  playerState: number;
  availablePlaybackRates: number[];
  playbackQuality: string;
  availableQualityLevels: any[];
  currentTime: number;
  duration: number;
  debugText: string;
  sphericalProperties: SphericalProperties;
  videoEmbedCode: string;
  videoUrl: string;
  mediaReferenceTime: number;
  size: Size;
  videoInfoVisible: boolean;
  playbackRate: number;
  videoData: VideoData;
  currentTimeLastUpdated_: number;
}

export interface PlayerMode {}

export interface SphericalProperties {}

export interface Size {
  width: number;
  height: number;
}

export interface VideoData {
  video_id: string;
  author: string;
  title: string;
  isPlayable: boolean;
  errorCode: any;
  backgroundable: boolean;
  cpn: string;
  isLive: boolean;
  isWindowedLive: boolean;
  isManifestless: boolean;
  allowLiveDvr: boolean;
  isListed: boolean;
  isMultiChannelAudio: boolean;
  hasProgressBarBoundaries: boolean;
  isPremiere: boolean;
  progressBarStartPositionUtcTimeMillis: any;
  progressBarEndPositionUtcTimeMillis: any;
  paidContentOverlayDurationMs: number;
}
