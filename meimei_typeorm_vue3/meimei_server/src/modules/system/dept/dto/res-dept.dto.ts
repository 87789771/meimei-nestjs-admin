import { TreeDataDto } from 'src/common/dto/tree-data.dto'

export class ResRoleDeptTreeselectDto {
  /* 选中的菜单id数组 */
  checkedKeys: number[]

  /* 菜单列表 */
  depts: TreeDataDto[]
}
