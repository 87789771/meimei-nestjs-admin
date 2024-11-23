let icons = []
const modules = import.meta.glob('./../../components/SvgIcon/svg/*.svg')
for (const path in modules) {
  const p = path.split('components/SvgIcon/svg/')[1].split('.svg')[0]
  icons.push(p)
}

export default icons
