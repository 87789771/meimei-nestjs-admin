/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 18:06:20
 * @LastEditTime: 2021-12-17 14:29:43
 * @LastEditors: Sheng.Jiang
 * @Description: 数据库基类
 * @FilePath: \meimei\src\common\entities\base.entity.ts
 * You can you up，no can no bb！！
 */
import { IsOptional, IsString } from "class-validator"
import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ApiHideProperty } from '@nestjs/swagger'
import { Excel } from "src/modules/common/excel/excel.decorator"
import { ExcelTypeEnum } from "src/modules/common/excel/excel.enum"

export class BaseEntity {
    /* 创建时间 */
    @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
    @ApiHideProperty()
    @Excel({
        name: '创建时间',
        type: ExcelTypeEnum.EXPORT,
        dateFormat: 'YYYY-MM-DD HH:mm:ss',
        sort: 99
    })
    createTime: Date

    /* 更新时间 */
    @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
    @ApiHideProperty()
    updateTime: Date

    /* 创建人 */
    @Column({ name: 'create_by', comment: '创建人', length: "50", default: '' })
    @ApiHideProperty()
    @Excel({
        name: '创建人',
        type: ExcelTypeEnum.EXPORT,
        sort: 98
    })
    createBy: string

    /* 更新人 */
    @Column({ name: 'update_by', comment: '更新人', length: "50", default: '' })
    @ApiHideProperty()
    updateBy: string

    /* 备注 */
    @Column({ name: 'remark', comment: '备注', default: '' })
    @IsOptional()
    @IsString()
    @Excel({
        name: '备注',
        sort: 100
    })
    remark?: string
}