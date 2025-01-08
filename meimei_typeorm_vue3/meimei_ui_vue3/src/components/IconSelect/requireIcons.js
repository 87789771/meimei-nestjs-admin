let icons = []
const modules = import.meta.glob('./../../components/SvgIcon/svg/*.svg')
for (const path in modules) {
  // const p = path.split('components/SvgIcon/svg/')[1].split('.svg')[0]
  // icons.push(p)

  // 使用正则表达式匹配最后一个斜杠后的文件名
  const match = path.match(/\/([^/]+)\.svg$/)
  if (match) {
    icons.push(match[1])
  }
}

export default icons
