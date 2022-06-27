export interface UIOption {
  components?: {
    alias: string
    hide: boolean
    isBlock: boolean
    items: {
      action?: any
      img?: string
    }[]
    name: string
    style: {
      bg?: string
      height?: string
      mgB?: number
      mgL?: number
      mgR?: number
      mgT?: number
      pdB?: number
      pdL?: number
      pdR?: number
      pdT?: number
      radius?: number
      shadow?: { x?: number; y?: number; radius?: number; color?: string }
      zIndex?: number
      bgImg?: string
    }
    subTitle?: string
    title?: string
  }[]
  headerBg: string
  headerColor: string
  hideIndex: boolean
  hideTitle: boolean
  pageBg: string
  pageBgImg: string
  title: string
  showFooter: boolean
}
