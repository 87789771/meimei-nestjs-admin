import { TreeDataDto } from 'src/common/dto/tree-data.dto';

export class ResRoleMenuTreeselectDto {
  /* 选中的菜单id数组 */
  checkedKeys: number[];

  /* 菜单列表 */
  menus: TreeDataDto[];
}

export class Router {
  menuId: number;
  parentId: number;
  name?: string;
  path?: string;
  hidden?: boolean;
  redirect?: string;
  component?: string;
  alwaysShow?: boolean;
  meta?: {
    title?: string;
    icon?: string;
    noCache?: boolean;
    link?: string | null;
  };
  children?: Router[];
}
