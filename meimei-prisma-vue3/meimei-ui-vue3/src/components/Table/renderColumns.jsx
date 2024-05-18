/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-16 14:20:30
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2023-09-16 14:58:00
 * @FilePath: /ruoyi-ui-3.0-print/src/components/Table/renderColumns.jsx
 * @Description: 渲染 Column 列渲染函数的构造函数 * 
 */
import Renderer from './renderer'
export default function renderColumns(props, slots, attrs) {
    return function renderFun(column, index) {
        const {
            cellRenderer,
            slot,
            headerRenderer,
            headerSlot,
            hide,
            children,
            ...args
        } = column;
        /* 如果列表隐藏直接返回 undefined */
        if (hide) return;
        /* 默认插槽渲染 */
        const defaultSlots = {
            default: (scope) => {
                if (cellRenderer) {
                    /* 直接配置cellRenderer函数 */
                    return (
                        <Renderer
                            render={cellRenderer}
                            params={Object.assign(scope, {
                                index: scope.$index,
                                props,
                                attrs
                            })}
                        ></Renderer>
                    );
                } else if (slot) {
                    /* 在 JsTable 内直接插入自定义的具名插槽 */
                    if (slots[slot]) {
                        return slots[slot](
                            Object.assign(scope, {
                                index: scope.$index,
                                props,
                                attrs
                            })
                        );
                    }
                }
            }
        }
        /* 头部插槽和默认插槽同时渲染 */
        //若果只有默认插槽
        let scopedSlots = defaultSlots
        //如果头部插槽渲染器存在
        if (headerRenderer) {
            scopedSlots = {
                header: (scope) => {
                    return (
                        <Renderer
                            render={headerRenderer}
                            params={Object.assign(scope, {
                                index: scope.$index,
                                props,
                                attrs
                            })}
                        ></Renderer>
                    );
                },
                ...defaultSlots
            }
        } else if (headerSlot) {
            //如果自定义头部插槽名存在
            if (slots[headerSlot]) {
                scopedSlots = {
                    header: (scope) => {
                        return slots[headerSlot](
                            Object.assign(scope, {
                                index: scope.$index,
                                props,
                                attrs
                            })
                        );
                    },
                    ...defaultSlots
                }
            }
        }
        /* 如果孩子存在，就直接渲染孩子 */
        if (children && children.length) {
            scopedSlots = children.map(renderFun);
        }
        return (
            <ElTableColumn
                key={index}
                {...args}
            >
                {scopedSlots}
            </ElTableColumn>
        );
    }
}