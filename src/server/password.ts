import { randomInt } from 'node:crypto'

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

function randomGroup(length: number): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += CHARS[randomInt(CHARS.length)]
  }
  return result
}

export function generatePassword(): string {
  return `${randomGroup(3)}-${randomGroup(3)}-${randomGroup(3)}`
}
