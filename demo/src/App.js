import Countdown from '../../src/index'

import Item from './Item'

export default {
  name: 'example-app',

  render() {
    return (
      <div>
        <Item>
          <Countdown
            end={Date.now() + (1000 * 60 * 60)}
          />
        </Item>
        <Item>
          <Countdown
            end={Date.now() + (1000 * 60 * 60 * 4)}
            size={60}
          />
        </Item>
        <Item>
          <Countdown
            end={Date.now() + (1000 * 60 * 60 * 26)}
            size={80}
            labelStyle={{ color: 'blue', fontSize: '20px', height: '22px' }}
          />
        </Item>
        <Item>
          <Countdown
            background="black"
            style={{ color: 'white' }}
            labelStyle={{ color: 'gray' }}
          />
        </Item>
      </div>
    )
  },
}
