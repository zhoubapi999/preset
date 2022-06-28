export type ConfigOption = {
  alias: string
  hide: boolean
  isBlock: boolean
  [x: string]: any
  items: {
    [x: string]: any
  }[]
  name: string
  fit?: number | string
  ratio?: Array<number | string>
  hideAddress?: boolean
  showUserBalance?: boolean
  showUserPoint?: boolean
  showUserLevel?: boolean
  showSubTitle?: boolean
  shopType?: string
  style: {
    [x: string]: any
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
    color?: string
    fontSize?: number
    shadow?: { x?: number; y?: number; radius?: number; color?: string }
    zIndex?: number
    bgImg?: string
    iconSize?: number
    itemMg?: number
    itemWidth?: number | string
    itemDir?: string
    borderColor?: string
    itemFontSize?: number
    noSize?: number
  }
  subTitle?: string
  title?: string
}
export interface UIOption {
  components: ConfigOption[]
  headerBg: string
  headerColor: string
  hideIndex: boolean
  hideTitle: boolean
  pageBg: string
  pageBgImg: string
  title: string
  showFooter: boolean
  bgSize?: string
  openCardDialog: any
  showIndex: boolean
  opencardbg: string
}
