import { checkIsBinRange, isDate } from './dates'

export class Cursor {
  constructor(time) {
    this.time = time
    this.offset = 0
  }

  advanceOffset(time) {
    const shouldAdvance = time === this.time
    this.offset = shouldAdvance ? this.offset + 1 : 1
  }

  print() {
    if (typeof this.time === 'number') {
      const cursorAsDate = new Date(this.time * 1000).toUTCString()
      const msg = `┄\n👇 Cursor\t${this.time}\n👉 Offset\t${this.offset}\n🕰️ UTC\t${cursorAsDate}\n┄`
      console.log(msg)
    } else {
      console.table({
        time: this.time,
        offset: this.offset,
      })
    }
  }
}
