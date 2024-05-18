import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
export function useSwitchPaper(hiprintTemplate) {
    const paperTypes = reactive([
        {
            type: 'A3',
            width: 420,
            height: 296.6
        },
        {
            type: 'A4',
            width: 210,
            height: 296.6
        },
        {
            type: 'A5',
            width: 210,
            height: 147.6
        },
        {
            type: 'B3',
            width: 500,
            height: 352.6
        },
        {
            type: 'B4',
            width: 250,
            height: 352.6
        },
        {
            type: 'B5',
            width: 250,
            height: 175.6
        }
    ])
    const curPaper = ref({
        type: 'A4',
        width: 210,
        height: 296.6
    })
    const paperWidth = ref(220)
    const paperHeight = ref(80)
    /* 切换纸张 */
    function otherPaper() {
        if (!paperWidth.value || !paperHeight.value)
            return ElMessage.warning('请输入有效的宽度或高度')
        const obj = {
            type: 'other',
            width: paperWidth.value,
            height: paperHeight.value
        }
        setPaper(obj)
    }
    function setPaper(value) {
        curPaper.value = value
        hiprintTemplate.setPaper(value.width, value.height)
    }
    return {
        paperTypes,
        curPaper,
        otherPaper,
        setPaper,
        paperWidth,
        paperHeight
    }
}