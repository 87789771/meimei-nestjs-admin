<!--
 * @Author: sheng.jiang 87789771@qq.com
 * @Date: 2024-01-29 14:09:54
 * @LastEditors: jiangSheng 87789771@qq.com
 * @LastEditTime: 2024-03-14 13:56:50
 * @FilePath: \耗材前端\src\views\basicData\goodsManagement\goodsMessage\addGoodsMessage\index.vue
 * @Description: 
 * 
-->
<template>
  <div class="app-container">
    <el-auto-resizer @resize="resizerChange">
      <template #default>
        <el-form
          :model="form"
          label-width="120px"
          ref="ruleFormRef"
          :rules="rules"
        >
          <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
              <div class="box-show">
                <el-card>
                  <el-row :gutter="20">
                    <el-col :span="spanValue">
                      <el-form-item prop="hospitalDeptId" label="所属医院">
                        <deptSelect
                          v-model="form.hospitalDeptId"
                          type="hospitalList"
                          clearable
                        ></deptSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="consumablesType" label="商品大类">
                        <el-select
                          v-model="form.consumablesType"
                          placeholder="商品大类"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_big"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="consumablesName" label="商品名称">
                        <el-input
                          v-model="form.consumablesName"
                          placeholder="商品名称"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="commonName" label="通用名">
                        <el-input
                          v-model="form.commonName"
                          placeholder="通用名"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="shortName" label="简称">
                        <el-input v-model="form.shortName" placeholder="简称" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="hospitalCode" label="院内码">
                        <el-input
                          v-model="form.hospitalCode"
                          placeholder="院内码"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="classificationType" label="商品分类">
                        <el-input
                          v-model="form.classificationType"
                          placeholder="商品分类"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="financialClassType" label="财务分类">
                        <el-select
                          v-model="form.financialClassType"
                          placeholder="财务分类"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_finance"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item
                        prop="keyMonitoringType"
                        label="十八类重点分类"
                      >
                        <el-select
                          v-model="form.keyMonitoringType"
                          placeholder="十八类重点分类"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_18type"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="factoryName" label="生产厂家">
                        <el-input
                          v-model="form.factoryName"
                          placeholder="生产厂家"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="spec" label="规格">
                        <el-input v-model="form.spec" placeholder="规格" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="model" label="型号">
                        <el-input v-model="form.model" placeholder="型号" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="brand" label="品牌">
                        <el-input v-model="form.brand" placeholder="品牌" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="originType" label="产地类型">
                        <el-select
                          v-model="form.originType"
                          placeholder="产地类型"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_producer"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="originAddress" label="产地">
                        <el-input
                          v-model="form.originAddress"
                          placeholder="产地"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isHigh" label="是否高值">
                        <el-radio-group v-model="form.isHigh">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="管理属性" name="2">
              <div class="box-show">
                <el-card>
                  <el-row :gutter="20">
                    <el-col :span="spanValue">
                      <el-form-item prop="price" label="进价">
                        <el-input-number
                          style="width: 100%"
                          v-model="form.price"
                          :min="0"
                          :max="9999999"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="salePrice" label="售价">
                        <el-input-number
                          style="width: 100%"
                          v-model="form.salePrice"
                          :min="0"
                          :max="9999999"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="supPrice" label="招标进价">
                        <el-input-number
                          style="width: 100%"
                          v-model="form.supPrice"
                          :min="0"
                          :max="9999999"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="oneCode" label="是否一物一码">
                        <el-radio-group v-model="form.oneCode">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isCharge" label="是否可收费">
                        <el-radio-group v-model="form.isCharge">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isVolume" label="是否带量">
                        <el-radio-group v-model="form.isVolume">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="volumeLot" label="带量批次">
                        <el-input v-model="form.volumeLot" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="repeatNum" label="重复使用次数">
                        <el-input-number
                          style="width: 100%"
                          v-model="form.repeatNum"
                          :min="1"
                          :max="9999999"
                          step-strictly
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isTemporary" label="是否临时采购">
                        <el-radio-group v-model="form.isTemporary">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isBatch" label="是否批次管理">
                        <el-radio-group v-model="form.isBatch">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isEnable" label="状态">
                        <el-radio-group v-model="form.isEnable">
                          <el-radio
                            v-for="dict in sys_normal_disable"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="单位信息" name="3">
              <div class="box-show">
                <el-card>
                  <el-row>
                    <el-col :span="spanValue">
                      <el-form-item prop="unitId" label="最小单位">
                        <el-select
                          v-model="form.unitId"
                          placeholder="最小单位"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_unit"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="codeUnitId" label="赋码单位">
                        <el-select
                          v-model="form.codeUnitId"
                          placeholder="赋码单位"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_unit"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="codeRatio" label="赋码单位系数">
                        <el-input-number
                          style="width: 100%"
                          v-model="form.codeRatio"
                          :min="1"
                          :max="9999999"
                          step-strictly
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="医保属性" name="4">
              <div class="box-show">
                <el-card>
                  <el-row :gutter="20">
                    <el-col :span="spanValue">
                      <el-form-item prop="isInsurance" label="是否医保记账">
                        <el-radio-group v-model="form.isInsurance">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="insuranceName" label="医保名称">
                        <el-input v-model="form.insuranceName" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="insuranceCode" label="医保编码">
                        <el-input v-model="form.insuranceCode" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="insuranceNo" label="医保流水号">
                        <el-input v-model="form.insuranceNo" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="其他属性" name="5">
              <div class="box-show">
                <el-card>
                  <el-row :gutter="20">
                    <el-col :span="spanValue">
                      <el-form-item prop="settlementType" label="结算类型">
                        <el-select
                          v-model="form.settlementType"
                          placeholder="结算类型"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_settlement"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="purchaseType" label="采购类型">
                        <el-select
                          v-model="form.purchaseType"
                          placeholder="采购类型"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_buy"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="storageType" label="存储类型">
                        <el-select
                          v-model="form.storageType"
                          placeholder="存储类型"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_storage"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="bidType" label="中标类型">
                        <el-select
                          v-model="form.bidType"
                          placeholder="中标类型"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_bidder"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="bidCode" label="中标编码">
                        <el-input v-model="form.bidCode" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="detailType" label="细分类别">
                        <el-select
                          v-model="form.detailType"
                          placeholder="细分类别"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_small"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="orderType" label="医嘱类别">
                        <el-select
                          v-model="form.orderType"
                          placeholder="医嘱类别"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_advice"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="riskLevelType" label="医用耗材类别">
                        <el-select
                          v-model="form.riskLevelType"
                          placeholder="医用耗材类别"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_grade"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="dedicatedType" label="专用类型">
                        <el-select
                          v-model="form.dedicatedType"
                          placeholder="专用类型"
                          clearable
                          filterable
                        >
                          <el-option
                            v-for="dict in basic_goods_one"
                            :key="dict.value"
                            :label="dict.label"
                            :value="dict.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isNational" label="是否国家谈判">
                        <el-radio-group v-model="form.isNational">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="spanValue">
                      <el-form-item prop="isStanding" label="是否常备物质">
                        <el-radio-group v-model="form.isStanding">
                          <el-radio
                            v-for="dict in basic_goods_has"
                            :key="dict.value"
                            :label="dict.value"
                            >{{ dict.label }}</el-radio
                          >
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-collapse-item>
            <el-collapse-item title="图片信息" name="6">
              <ImageUpload v-model="form.imageUrl" :limit="8"></ImageUpload>
            </el-collapse-item>
          </el-collapse>
          <div class="df aic jcc mt-20">
            <el-button
              type="primary"
              :loading="submitLoading"
              @click="submitForm(ruleFormRef)"
              >提交</el-button
            >
            <el-button @click="close()">返回</el-button>
          </div>
        </el-form>
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup name="AddGoodsMessage">
const { proxy } = getCurrentInstance()
const ruleFormRef = ref(null)
const {
  basic_goods_big,
  basic_goods_finance,
  basic_goods_unit,
  basic_goods_producer,
  basic_goods_18type,
  basic_goods_has,
  basic_goods_buy,
  basic_goods_storage,
  basic_goods_bidder,
  basic_goods_small,
  basic_goods_advice,
  basic_goods_grade,
  basic_goods_one,
  basic_goods_settlement,
  sys_normal_disable
} = proxy.useDict(
  'basic_goods_big',
  'basic_goods_finance',
  'basic_goods_unit',
  'basic_goods_producer',
  'basic_goods_18type',
  'basic_goods_has',
  'basic_goods_buy',
  'basic_goods_storage',
  'basic_goods_bidder',
  'basic_goods_small',
  'basic_goods_advice',
  'basic_goods_grade',
  'basic_goods_one',
  'basic_goods_settlement',
  'sys_normal_disable'
)
const route = useRoute()
const submitLoading = ref(false)
function initGoods () {
  if (route.params) {
    if (route.params.type === 'edit') {
      // 如果是编辑，更改标签页名称
      const obj = Object.assign({}, route, { title: '编辑商品' })
      proxy.$tab.updatePage(obj)
    }
    // 如果id不为0。 就加载商品档案， 可进行编辑或者拷贝新增
    if (route.params.id && route.params.id !== '0') {
      getData(route.params.id)
    }
  }
}
const activeNames = ref(['1', '2', '3', '4', '5', '6'])
const spanValue = ref(6)
/* 动态计算页面尺寸，调整页面显示 */
function resizerChange ({ width }) {
  if (width <= 1000) {
    spanValue.value = 12
  } else if (width > 1000 && width <= 1400) {
    spanValue.value = 8
  } else {
    spanValue.value = 6
  }
}
/* 表单初始化值 */
const form = ref({
  spec: '',
  model: '',
  brand: '',
  price: undefined,
  consumablesName: '',
  commonName: '',
  shortName: '',
  consumablesType: undefined,
  classificationType: undefined,
  hospitalDeptId: undefined,
  originType: '',
  originAddress: '',
  unitId: '',
  salePrice: undefined,
  supPrice: undefined,
  factoryName: '',
  isHigh: '0',
  oneCode: '0',
  insuranceCode: '',
  insuranceName: '',
  insuranceNo: '',
  isInsurance: '0',
  hospitalCode: '',
  storageType: '',
  financialClassType: '',
  keyMonitoringType: '',
  riskLevelType: '',
  orderType: '',
  bidType: '',
  bidCode: '',
  purchaseType: '',
  dedicatedType: '',
  settlementType: '',
  isVolume: '0',
  volumeLot: '',
  isCharge: '1',
  isTemporary: '0',
  repeatNum: 1,
  isNet: '',
  isBatch: '1',
  isNational: '0',
  isStanding: '0',
  isEnable: '0',
  imageUrl: '',
  approveStatus: ''
})
const rules = reactive({
  hospitalDeptId: [
    { required: true, message: '请选择所属医院', trigger: ['blur', 'change'] }
  ],
  consumablesType: [
    { required: true, message: '请选择商品大类', trigger: ['blur', 'change'] }
  ],
  consumablesName: [
    { required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }
  ],
  classificationType: [
    { required: true, message: '请选择商品分类', trigger: ['blur', 'change'] }
  ],
  spec: [
    { required: true, message: '请输入规格', trigger: ['blur', 'change'] }
  ],
  isHigh: [
    { required: true, message: '请选择是否高值', trigger: ['blur', 'change'] }
  ],
  price: [
    { required: true, message: '请输入进价', trigger: ['blur', 'change'] }
  ],
  salePrice: [
    { required: true, message: '请输入售价', trigger: ['blur', 'change'] }
  ],
  oneCode: [
    {
      required: true,
      message: '请选择是否一物一码',
      trigger: ['blur', 'change']
    }
  ],
  isBatch: [
    {
      required: true,
      message: '请选择是否批次管理',
      trigger: ['blur', 'change']
    }
  ],
  isEnable: [
    { required: true, message: '请选择商品状态', trigger: ['blur', 'change'] }
  ],
  unitId: [
    { required: true, message: '请选择最小单位', trigger: ['blur', 'change'] }
  ],
  codeUnitId: [
    { required: true, message: '请选择赋码单位', trigger: ['blur', 'change'] }
  ],
  codeRatio: [
    {
      required: true,
      message: '请输入赋码单位系数',
      trigger: ['blur', 'change']
    }
  ],
  settlementType: [
    { required: true, message: '请选择结算类型', trigger: ['blur', 'change'] }
  ]
})
/* 加载商品档案 */
function getData (id) {
  // 如果 route.params.type === 'add' ，就是拷贝新增，删除档案id
}
/** 关闭按钮 */
function close () {
  const obj = {
    path: '/basicData/goodsManagement/goodsMessage'
  }
  proxy.$tab.closeOpenPage(obj)
}
/** 提交按钮 */
function submitForm (formEl) {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      submitLoading.value = true
    } else {
      return false
    }
  })
  // const userId = form.value.userId;
  // const rIds = roleIds.value.join(",");
  // updateAuthRole({ userId: userId, roleIds: rIds }).then(response => {
  //   proxy.$modal.msgSuccess("授权成功");
  //   proxy.$bus.emit('goodsMessage-getList')
  //   close();
  // });
}
initGoods()
</script>

<style lang="scss" scoped>
.box-show {
  padding: 7px 7px 0px;
}
</style>
