import { networkInterfaces } from 'os'
import { SnowFlake } from './snowflake'

const idWorker = new SnowFlake(1n, 1n)

/**
 * 获取雪花id
 */
export function genId(): string {
  return idWorker.nextId().toString()
}

/**
 * 来源：https://www.jianshu.com/p/fdbf293d0a85
 * @param { Number } len uuid 长度
 * @param { Number } radix 基数
 */
export function guid(len = 32, radix = 16): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const uuid = []
  let i = 0
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 检查一个给定的值是否有效（不为 null,或者 undefined）
 * @param val { unknown } 需要检查的值
 * @returns 检查结果
 */
export function isValidValue(val: unknown): boolean {
  const emptyList = [null, undefined]
  return !emptyList.includes(val)
}

export function getLocalIpAddresses(): string[] {
  const interfaces = networkInterfaces()
  const addresses: string[] = []

  for (const iface of Object.values(interfaces)) {
    if (Array.isArray(iface)) {
      for (const info of iface) {
        if (!info.internal && info.family === 'IPv4') {
          addresses.push(info.address)
        }
      }
    }
  }

  return addresses
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const convertIPFStoHTTPS = (ipfsUrl: string) => {
  if (ipfsUrl.startsWith('ipfs://')) {
    const gatewayUrl = 'https://ipfs.io/ipfs/'
    const ipfsHash = ipfsUrl.replace('ipfs://', '')
    const httpsUrl = gatewayUrl + ipfsHash
    return httpsUrl
  }
  return ipfsUrl
}

export const getJSONFromURL = async (url: string) => {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const json = await response.json()
      return json
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

export const extractFilename = (urlString: string) => {
  const url = new URL(urlString)
  const pathname = url.pathname
  return pathname.split('/').pop()
}

export const getFormattedTimestamp = () => {
  const now = new Date()

  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0')

  return `${year}${month}${day}-${hours}${minutes}${seconds}-${milliseconds}`
}

export const getFileExtension = (filename: string) => {
  // 确保filename是一个字符串
  if (typeof filename !== 'string') {
    throw new Error('filename must be a string.')
  }

  // 查找最后一个点的位置
  const lastDotIndex = filename.lastIndexOf('.')

  // 如果没有点，或者点是文件名的第一个字符（可能是一个隐藏文件），则没有后缀名
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return ''
  }

  // 提取并返回扩展名
  return filename.substring(lastDotIndex + 1)
}
