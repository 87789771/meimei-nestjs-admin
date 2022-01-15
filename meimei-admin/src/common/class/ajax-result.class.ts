/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 19:00:14
 * @LastEditTime: 2021-12-23 11:32:18
 * @LastEditors: Sheng.Jiang
 * @Description: 返回值封装对象
 * @FilePath: \meimei\src\common\class\ajax-result.class.ts
 * You can you up，no can no bb！！
 */
export class AjaxResult {
    readonly code: number
    readonly msg: string
    [key: string]: any

    constructor(code, msg, data) {
        this.code = code
        this.msg = msg
        Object.assign(this, data)
    }

    static success(data?: any, msg: string = '操作成功') {
        return new AjaxResult(200, msg, data)
    }

    static error(msg: string = '操作失败', code = 500,) {
        return new AjaxResult(code, msg, null)
    }
}