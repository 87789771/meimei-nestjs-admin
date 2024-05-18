/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-16 08:15:46
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2023-09-16 09:15:45
 * @FilePath: /ruoyi-ui-3.0-print/src/components/Table/props.js
 * @Description: 表格组件参数
 * 
 */
import defaultProps from "element-plus/es/components/table/src/table/defaults";
export default {
    // 表格的id ，要唯一
    id: {
        type: String || Number,
        required: true
    },
    //  表格的列
    columns: {
        type: Array,
        default: []
    },
    ...defaultProps
};
