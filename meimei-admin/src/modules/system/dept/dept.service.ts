/*
https://docs.nestjs.com/providers#services
*/

import { forwardRef, Get, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SharedService } from 'src/shared/shared.service';
import { FindConditions, In, Like, Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { ReqAddDeptDto, ReqDeptListDto } from './dto/req-dept.dto';
import { Dept } from './entities/dept.entity';

@Injectable()
export class DeptService {
    constructor(
        @InjectRepository(Dept) private readonly deptRepository: Repository<Dept>,
        @Inject(forwardRef(() => RoleService)) private readonly roleService: RoleService,
        private readonly sharedService: SharedService
    ) { }

    /* 新增或编辑部门 */
    async addOrUpdate(reqAddDeptDto: ReqAddDeptDto) {
        if (reqAddDeptDto.parentId) {
            const parentDept = await this.findById(reqAddDeptDto.parentId)
            reqAddDeptDto.parent = parentDept
        }
        await this.deptRepository.save(reqAddDeptDto)
    }

    /* 查询部门列表 */
    async list(reqDeptListDto: ReqDeptListDto) {
        let where: FindConditions<Dept> = { delFlag: '0' }
        if (reqDeptListDto.deptName) {
            where.deptName = Like((`%${reqDeptListDto.deptName}%`))
        }
        if (reqDeptListDto.status) {
            where.status = reqDeptListDto.status
        }
        return this.deptRepository.createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.createTime', 'createTime')
            .addSelect('dept.deptName', 'deptName')
            .addSelect('dept.orderNum', 'orderNum')
            .addSelect('dept.status', 'status')
            .addSelect("ifnull(dept.parentDeptId,0)", "parentId")
            .where(where)
            .orderBy('dept.orderNum', 'ASC')
            .addOrderBy('dept.createTime', 'ASC')
            .getRawMany()
    }

    /* 通过id查询 */
    async findById(deptId: number | string) {
        return this.deptRepository.findOne(deptId)
    }

    /* 通过id查询，返回原始数据 */
    async findRawById(deptId: number | string) {
        return await this.deptRepository.createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.createTime', 'createTime')
            .addSelect('dept.deptName', 'deptName')
            .addSelect('dept.orderNum', 'orderNum')
            .addSelect('dept.status', 'status')
            .addSelect('dept.leader', 'leader')
            .addSelect('dept.phone', 'phone')
            .addSelect('dept.email', 'email')
            .addSelect("ifnull(dept.parentDeptId,0)", "parentId")
            .where("dept.delFlag = 0")
            .andWhere("dept.deptId = :deptId", { deptId })
            .getRawOne()
    }

    /* 查询除自己(包括子类) 外的所有 */
    async outList(deptId: number | string) {
        return await this.deptRepository.createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.createTime', 'createTime')
            .addSelect('dept.deptName', 'deptName')
            .addSelect('dept.orderNum', 'orderNum')
            .addSelect('dept.status', 'status')
            .addSelect("ifnull(dept.parentDeptId,0)", "parentId")
            .where("dept.delFlag = 0")
            .andWhere("concat('.',dept.mpath) not like :v", { v: '%.' + deptId + '.%' })
            .getRawMany()
    }

    /* 通过 parentId 查询其所有孩子 */
    async findChildsByParentId(parentId: string): Promise<Dept[]> {
        return this.deptRepository.createQueryBuilder('dept')
            .where("dept.delFlag = 0")
            .andWhere("dept.parentDeptId = :parentId", { parentId })
            .getMany()
    }

    /* 删除部门 */
    async delete(deptId: string, userName: string) {
        return this.deptRepository.createQueryBuilder()
            .update()
            .set({ delFlag: '2', updateBy: userName })
            .where({
                deptId
            })
            .execute()
    }

    /* 查询 部门 树结构 */
    async treeselect() {
        const deptArr = await this.deptRepository.createQueryBuilder('dept')
            .select('dept.deptId', 'id')
            .addSelect('dept.deptName', 'label')
            .addSelect('dept.parentDeptId', 'parentId')
            .where("dept.delFlag = 0")
            .getRawMany()
        return this.sharedService.handleTree(deptArr)
    }

    /* 获取角色的数据权限列表 */
    async getCheckedKeys(roleId: number | string): Promise<number[]> {
        let deptArr = await this.deptRepository.createQueryBuilder('dept')
            .select('dept.deptId', 'deptId')
            .addSelect('dept.mpath', 'mpath')
            .innerJoin('dept.roles', 'role', "role.roleId = :roleId", { roleId })
            .where("dept.delFlag = 0")
            .andWhere('role.delFlag = 0')
            .getRawMany()
        return deptArr.map(dept => dept.deptId)
    }

    /* 通过id数组查询 */
    async listByIdArr(deptIdArr: number[]): Promise<Dept[]> {
        return this.deptRepository.find({
            where: {
                deptId: In(deptIdArr),
                delFlag: 0
            }
        })
    }

    /* 通过id数组查询，并只取最后一级 */
    async listByIdArrFilter(deptIdArr: number[]): Promise<Dept[]> {
        const queryBuilder = this.deptRepository.createQueryBuilder('dept')
        queryBuilder.select('dept.deptId', 'deptId')
            .addSelect("dept.mpath")
            .where("dept.delFlag = 0")
            .andWhere({
                deptId: In(deptIdArr),
            })
            .andWhere(qb => {
                const subQuery = qb.subQuery()
                    .select("dept2.deptId")
                    .from(Dept, 'dept2')
                    .where("dept2.delFlag = 0")
                    .andWhere("dept.deptId != dept2.deptId")
                    .andWhere({
                        deptId: In(deptIdArr),
                    })
                    .andWhere("concat('.',dept2.mpath) like concat('%.',dept.dept_id,'.%')")
                    .getQuery()
                return "not exists" + subQuery
            })
        let DeptArr = await queryBuilder.getRawMany()
        return DeptArr
    }
}
