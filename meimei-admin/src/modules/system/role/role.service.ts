/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { Between, FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { DeptService } from '../dept/dept.service';
import { MenuService } from '../menu/menu.service';
import { ReqUserListDto } from '../user/dto/req-user.dto';
import { UserService } from '../user/user.service';
import {
  ReqAddRoleDto,
  ReqAllocatedListDto,
  ReqDataScopeDto,
  ReqRoleListDto,
} from './dto/req-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @Inject(forwardRef(() => MenuService))
    private readonly menuService: MenuService,
    @Inject(forwardRef(() => DeptService))
    private readonly deptService: DeptService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  /* 新增或者编辑 */
  async addOrUpdate(reqAddRoleDto: ReqAddRoleDto) {
    const menuArr = await this.menuService.listByIdArr(reqAddRoleDto.menuIds);
    reqAddRoleDto.menus = menuArr;
    await this.roleRepository.save(reqAddRoleDto);
  }

  /* 分页查询 */
  async list(reqRoleListDto: ReqRoleListDto): Promise<PaginatedDto<Role>> {
    const where: FindOptionsWhere<Role> = {
      delFlag: '0',
    };
    if (reqRoleListDto.roleName) {
      where.roleName = Like(`%${reqRoleListDto.roleName}%`);
    }
    if (reqRoleListDto.roleKey) {
      where.roleKey = Like(`%${reqRoleListDto.roleKey}%`);
    }
    if (reqRoleListDto.status) {
      where.status = reqRoleListDto.status;
    }
    if (reqRoleListDto.params) {
      where.createTime = Between(
        reqRoleListDto.params.beginTime,
        moment(reqRoleListDto.params.endTime).add(1, 'day').format(),
      );
    }
    const result = await this.roleRepository.findAndCount({
      select: [
        'roleId',
        'roleName',
        'roleKey',
        'createTime',
        'status',
        'roleSort',
        'createBy',
        'remark',
      ],
      where,
      order: {
        roleSort: 1,
        createTime: 1,
      },
      skip: reqRoleListDto.skip,
      take: reqRoleListDto.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  /* 通过id查询 */
  async findById(roleId: number) {
    return this.roleRepository.findOneBy({ roleId });
  }

  /* 通过id数组删除 */
  async delete(roleIdArr: string[], userName: string) {
    return await this.roleRepository
      .createQueryBuilder()
      .update()
      .set({ delFlag: '2', updateBy: userName })
      .where('roleId in (:...roleIdArr) ', { roleIdArr })
      .execute();
  }

  /* 更新数据权限 */
  async updateDataScope(reqDataScopeDto: ReqDataScopeDto) {
    let deptArr = [];
    if (reqDataScopeDto.deptCheckStrictly) {
      //如果菜单选择父子联动就需要排除 所有父级
      deptArr = await this.deptService.listByIdArrFilter(
        reqDataScopeDto.deptIds,
      );
    } else {
      deptArr = await this.deptService.listByIdArr(reqDataScopeDto.deptIds);
    }
    reqDataScopeDto.depts = deptArr;
    return await this.roleRepository.save(reqDataScopeDto);
  }

  /* 通过id数组查询 */
  listByIdArr(idArr: number[]) {
    return this.roleRepository.find({
      where: {
        delFlag: '0',
        roleId: In(idArr),
      },
    });
  }

  /* 更改角色状态 */
  async changeStatus(roleId: number, status: string, updateBy: string) {
    return await this.roleRepository
      .createQueryBuilder()
      .update()
      .set({ status, updateBy })
      .where({ roleId })
      .execute();
  }

  /* 通过角色id 分页 查询该角色下的用户列表 或 不存在的用户 */
  async allocatedListByRoleId(
    reqAllocatedListDto: ReqAllocatedListDto,
    reverse?: boolean,
  ) {
    let getUserDto = new ReqUserListDto();
    getUserDto = Object.assign(getUserDto, reqAllocatedListDto);
    return this.userService.list(
      getUserDto,
      reqAllocatedListDto.roleId,
      reverse,
    );
  }

  /* 取消角色下的用户 */
  async cancel(roleId: number, userIdArr: number[] | string[]) {
    return await this.roleRepository
      .createQueryBuilder('role')
      .relation('users')
      .of(roleId)
      .remove(userIdArr);
  }

  /* 给角色添加用户 */
  async selectAll(roleId: number, userIdArr: number[] | string[]) {
    return await this.roleRepository
      .createQueryBuilder('role')
      .relation('users')
      .of(roleId)
      .add(userIdArr);
  }
}
