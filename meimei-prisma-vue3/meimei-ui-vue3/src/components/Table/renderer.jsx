/*
 * @Author: jiang.sheng 87789771@qq.com
 * @Date: 2023-09-16 08:30:57
 * @LastEditors: jiang.sheng 87789771@qq.com
 * @LastEditTime: 2023-09-16 08:47:16
 * @FilePath: /ruoyi-ui-3.0-print/src/components/Table/render.jsx
 * @Description: 表格列渲染器
 * 
 */
import { defineComponent } from "vue";

const props = {
  render: {
    type: Function
  },
  params: {
    type: Object
  }
};

export default defineComponent({
  name: "Renderer",
  props,
  setup(props) {
    return () => <>{props.render(props.params)}</>;
  }
});
