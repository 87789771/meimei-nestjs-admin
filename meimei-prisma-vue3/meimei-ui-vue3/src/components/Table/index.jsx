/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-15 22:19:14
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2024-01-14 10:20:38
 * @FilePath: /耗材前端/src/components/Table/index.jsx
 * @Description: 自定义表格
 *
 */
import { defineComponent, getCurrentInstance, ref, toRefs, toValue, unref } from "vue";
import props from './props'
import renderColumns from './renderColumns'
import seting from './seting.vue'
import { formatColumn } from './formatColumn'
export default defineComponent({
    name: "JsTable",
    props,
    setup(props, { slots, attrs, emit, expose }) {
        const { proxy } = getCurrentInstance()
        const TableRef = ref(null)
        const { id, columns } = toRefs(props)
        // 加载表格列数据， 表格样式列表和本地的样式列表进行处理合并
        const { mergeColumn, getData } = formatColumn(id, columns, TableRef)
        getData()
        //获取表格的组件引用
        const getTableRef = () => unref(TableRef)
        //表格方法代理
        const funProxy = (funcName, ...args) => unref(TableRef)[funcName](...args)
        expose({
            getTableRef,
            funProxy
        })
        const renderFun = renderColumns(props, slots, attrs)
        const renderTable = () => {
            return <ElTable {...props} {...attrs} ref={TableRef}>
                {{
                    default: () => toValue(mergeColumn).map(renderFun),
                    append: () => slots.append && slots.append(),
                    empty: () => slots.empty && slots.empty(),
                }}
            </ElTable>;
        };
        const setingShow = ref(false)
        const clickSeting = () => {
            setingShow.value = true
        }
        const resetTable = (message) => {
            proxy.$modal.msgSuccess(message)
            proxy.$tab.refreshPage();
        }
        return () => (
            <div
                class="js-table"
                style={{ height: props.height, width: props.width }}
            >
                {renderTable()}
                <div class="set-button">
                    <el-tooltip
                        content="表格设置"
                        placement="top"
                    >
                        <el-button
                            link
                            type="primary"
                            icon="Setting"
                            onClick={clickSeting}
                        >
                        </el-button>
                    </el-tooltip>
                </div>
                <seting modelValue={setingShow.value} onUpdate:modelValue={(value) => setingShow.value = value} list={mergeColumn.value} id={id.value} onReset={resetTable}></seting>
            </div>
        )
    },
});
