export class TreeDataDto {
  /* id值 */
  id: number;

  /* 名称 */
  label: string;

  /* 子项数组 */
  // eslint-disable-next-line @typescript-eslint/ban-types
  children?: TreeDataDto[];
}
