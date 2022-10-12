import { mapValues } from 'lodash'
const commonElementProps = {
  // 操作
  actionType: '',
  url: '',
  // 大小
  height: '',
  width: '',
  paddingLeft: '0px',
  paddingRight: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  // border
  borderStyle: 'none',
  borderColor: '#000',
  borderWidth: '0',
  borderRadius: '0',
  // shadow  opacity
  boxShadow: '0 0 0 #000000',
  opacity: 1,
  // position and x,y
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
}
// 文本默认属性
const textElementProps = {
  fontSize: '14px',
  fontFamily: '',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
  textAlign: 'center',
  color: '#000000',
  backgroundColor: '',
  ...commonElementProps,
  width: '318px',
}
// 图片默认属性
const imageElementProps = {
  imageSrc: '',
  ...commonElementProps,
}

const props = {
  'w-text': {
    props: {
      text: '正文内容',
      ...textElementProps,
      fontSize: '14px',
      width: '125px',
      height: '36px',
      left: 320 / 2 - 125 / 2 + 'px',
      top: 500 / 2 - 36 / 2 + 'px',
    },
  },
  'w-image': {
    props: {
      ...imageElementProps,
    },
  },
  'w-block': {
    props: {
      backgroundColor: '',
      ...commonElementProps,
    },
  },
}

export default props
