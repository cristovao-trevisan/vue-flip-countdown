# Vue Flip Countdown

[![npm version](https://badge.fury.io/js/vue-flip-countdown.svg)](https://badge.fury.io/js/vue-flip-countdown)

Simple board countdown component for vue.

[Live Demo](https://cristovao-trevisan.github.io/vue-flip-countdown/)

## Usage

```jsx
import Countdown from 'vue-flip-countdown'

export default {
  name: 'example-app',

  render() {
    return (
      <div>
        <Countdown
          end={Date.now() + (1000 * 60 * 60)}
        />
        <Countdown
          end={Date.now() + (1000 * 60 * 60 * 4)}
          size={60}
        />
        <Countdown
          end={Date.now() + (1000 * 60 * 60 * 26)}
          size={80}
          labelStyle={{ color: 'blue', fontSize: '20px', height: '22px' }}
        />
        <Countdown
          background="black"
          style={{ color: 'white' }}
          labelStyle={{ color: 'gray' }}
        />
      </div>
    )
  },
}
```

## Props

- end: Number
- background: String
- size: Number (in px)
- labelStyle: Object (inline jsx style object)
- sections: Object[] in the format:
    - label: String (e.g. 'Hours')
    - divisor: Number (e.g. 60 * 60 * 1000)
    - mod: Number (e.g. 24) 