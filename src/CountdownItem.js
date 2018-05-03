import { TweenLite } from 'gsap'

const toPx = x => `${x}px`
const fontSize = size => toPx(size * 0.8)

const elevation2 = {
  '-webkit-box-shadow': '0 4px 10px -2px rgba(168, 168, 168, 0.2), 0 7px 8px 0 rgba(189, 189, 189, 0.01), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
  boxShadow: '0 4px 10px -2px rgba(168, 168, 168, 0.2), 0 7px 8px 0 rgba(189, 189, 189, 0.01), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
}

const styleGenerator = ({
  size = 40,
  background = 'white',
}) => ({
  container: {
    ...elevation2,
    background,
    textAlign: 'center',
    position: 'relative',
    width: fontSize(size),
    height: toPx(size),
    fontSize: fontSize(size),
    fontWeight: 900,
    lineHeight: toPx(size),
    borderRadius: toPx(fontSize / 6),
  },
  backTop: {
    overflow: 'hidden',
    zIndex: 1,
    height: '50%',
    borderBottom: '1px solid #00000030',
  },
  backBottom: {
    ...elevation2,
    overflow: 'hidden',
    lineHeight: 0,
    zIndex: 1,
    height: '50%',
  },
  front: {
    zIndex: 2,
    overflow: 'hidden',
    position: 'absolute',
    border: '1px solid #00000030',
    width: '100%',
    height: '50%',
    bottom: '50%',
    left: toPx(-size / 40), // compensate rotation width change
    background,
  },
  frontInverted: {
    transform: 'rotateX(180deg)',
  },
})

export default {
  name: 'CountdownItem',
  props: {
    value: { type: Number, default: 0 },
    size: { type: Number, default: 40 },
    background: { type: String, default: 'white' },
  },
  data() {
    return {
      cachedValue: this.value,
      inverted: false,
      hidden: true,
    }
  },

  methods: {
    rotate(rotationX) {
      const { front } = this.$refs
      return new Promise((resolve) => {
        TweenLite.to(front, 0.4, {
          rotationX,
          transformOrigin: 'left bottom',
          transformPerspective: 300,
          onComplete: resolve,
        })
      })
    },
    async turn() {
      const { front } = this.$refs
      this.hidden = false
      await this.rotate('90deg')
      this.inverted = true
      await this.rotate('180deg')
      this.inverted = false
      this.cachedValue = this.value
      this.hidden = true
      this.$nextTick(() => TweenLite.set(front, { rotationX: 0 }))
    },
  },

  computed: {
    styles() {
      const { size, background } = this
      return styleGenerator({ size, background })
    },
  },

  watch: {
    value() { this.turn() },
  },

  render() {
    const {
      value, inverted, cachedValue, styles, hidden,
    } = this

    return (
      <div style={styles.container}>
        <div style={styles.backTop}>{ value }</div>
        <div style={styles.backBottom}>{ cachedValue }</div>
        <div ref="front" style={[styles.front, { visibility: hidden ? 'hidden' : null }]}>
          <div style={inverted && styles.frontInverted}>
            { inverted ? value : cachedValue }
          </div>
        </div>
      </div>
    )
  },
}
