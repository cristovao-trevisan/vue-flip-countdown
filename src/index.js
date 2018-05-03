import CountdownItem from './CountdownItem'

export { CountdownItem }

const defaultSections = [
  {
    label: 'Days',
    divisor: 24 * 60 * 60 * 1000,
    mod: 100,
  },
  {
    label: 'Hours',
    divisor: 60 * 60 * 1000,
    mod: 24,
  },
  {
    label: 'Minutes',
    divisor: 60 * 1000,
    mod: 60,
  },
  {
    label: 'Seconds',
    divisor: 1000,
    mod: 60,
  },
]

const convertDiff = (diff, divisor, mod) => parseInt(diff / divisor, 10) % mod

const sectionStyles = {
  container: {
    marginRight: '6px',
  },
  label: {
    fontWeight: 'bold',
    width: '100%',
    height: '16px',
    textAlign: 'center',
    fontSize: '12px',
  },
  items: {
    marginRight: '2px',
  },
}
const Section = ({
  props: {
    label,
    labelStyle,
    items,
    background,
    size,
  },
}) => (
  <div style={sectionStyles.container}>
    <div style={[sectionStyles.label, labelStyle]}>
      { label }
    </div>
    <div style={{ display: 'flex' }}>
      {items.map(item => (
        <CountdownItem
          value={item}
          style={sectionStyles.items}
          background={background}
          size={size}
        />
      ))}
    </div>
  </div>
)

const days = number => 1000 * 60 * 60 * 24 * number

// eslint-disable-next-line valid-typeof
const validateExistsAndHasType = (type, value) => value && (typeof value === type)
const sectionsValidator = (sections) => {
  if (!(sections instanceof Array)) return false
  const invalid = sections.some(({ label, divisor, mod }) =>
    !validateExistsAndHasType('string', label) ||
    !validateExistsAndHasType('number', divisor) ||
    !validateExistsAndHasType('number', mod))
  return !invalid
}

export default {
  name: 'Countdown',
  props: {
    end: { type: Number, default: Date.now() + days(20) },
    background: { type: String, default: 'white' },
    size: { type: Number, default: 40 },
    labelStyle: { type: Object, required: false },
    /**
     * This is an array of objects which will construct each
     * couple of numbers. Format is : { label: string, divisor: number, mod: number }[]
     * Example: [{ label: 'Hours', divisor: 60 * 60 * 1000, mod: 24 }.
     */
    sections: { validator: sectionsValidator, default: () => defaultSections },
  },
  data: () => ({ now: Date.now() }),

  mounted() {
    this.listener = setInterval(this.update.bind(this), 1000)
  },
  beforeDestroy() { clearInterval(this.listener) },

  methods: {
    update() { this.now = Date.now() },
  },

  computed: {
    ended() {
      const { now, end, listener } = this
      const ended = now > end
      if (ended) {
        clearInterval(listener)
        this.$emit('ended', true)
      }
      return ended
    },
    items() {
      const {
        now, end, ended, sections,
      } = this
      if (ended) return new Array(sections.length * 2).fill(0)

      const diff = new Date(end - now)
      return sections.map(item => convertDiff(diff, item.divisor, item.mod))
        .map(item => [parseInt(item / 10, 10), item % 10])
        .reduce((acc, item) => acc.concat(item), [])
    },
  },

  render() {
    const {
      items,
      sections,
      background,
      size,
      labelStyle,
    } = this

    const mergedSections = sections.map((section, index) => ({
      ...section,
      items: items.slice(2 * index, (2 * index) + 2),
    }))
    return (
      <div style={{ display: 'flex' }}>
        {mergedSections.map(({ label, items: sItems }) => (
          <Section
            label={label}
            items={sItems}
            background={background}
            size={size}
            labelStyle={labelStyle}
          />
        ))}
      </div>
    )
  },
}
