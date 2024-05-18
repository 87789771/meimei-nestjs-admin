<!--
 * @Author: sheng.jiang 87789771@qq.com
 * @Date: 2024-01-29 14:11:00
 * @LastEditors: jiangSheng 87789771@qq.com
 * @LastEditTime: 2024-03-14 15:14:51
 * @FilePath: \耗材前端\src\views\basicData\goodsManagement\goodsMessage\goodsMessageDetails\index.vue
 * @Description: 
 * 
-->
<template>
  <div class="app-container">
    <el-auto-resizer @resize="resizerChange" v-loading="getLoading">
      <template #default>
        <!-- 基本信息 -->
        <el-descriptions title="基本信息" :column="spanValue" border>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="所属医院"
            >{{ goodsObj.consumablesType }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="商品大类"
          >
            <dict-tag
              :options="basic_goods_big"
              :value="goodsObj.consumablesType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="商品名称"
            >{{ goodsObj.consumablesName }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="通用名"
            >{{ goodsObj.commonName }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="简称"
            >{{ goodsObj.shortName }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="院内码"
            >{{ goodsObj.hospitalCode }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="商品分类"
            >{{ goodsObj.classificationType }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="财务分类"
          >
            <dict-tag
              :options="basic_goods_finance"
              :value="goodsObj.financialClassType"
            ></dict-tag
          ></el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="十八类重点分类"
            ><dict-tag
              :options="basic_goods_18type"
              :value="goodsObj.keyMonitoringType"
            ></dict-tag
          ></el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="生产厂家"
            >{{ goodsObj.factoryName }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="规格"
            >{{ goodsObj.spec }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="型号"
            >{{ goodsObj.model }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="品牌"
            >{{ goodsObj.brand }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="产地类型"
            ><dict-tag
              :options="basic_goods_producer"
              :value="goodsObj.originType"
            ></dict-tag
          ></el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="产地"
            >{{ goodsObj.originAddress }}</el-descriptions-item
          >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否高值"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isHigh"
            ></dict-tag
          ></el-descriptions-item>
        </el-descriptions>
        <!-- 管理属性 -->
        <el-descriptions
          title="管理属性"
          class="mt-20"
          :column="spanValue"
          border
        >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="进价"
            >{{ goodsObj.price }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="售价"
            >{{ goodsObj.salePrice }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="招标进价"
            >{{ goodsObj.supPrice }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否一物一码"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.oneCode"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否可收费"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isCharge"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否带量"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isVolume"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="带量批次"
            >{{ goodsObj.volumeLot }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="重复使用次数"
            >{{ goodsObj.repeatNum }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否临时采购"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isTemporary"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否批次管理"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isBatch"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="状态"
            ><dict-tag
              :options="sys_normal_disable"
              :value="goodsObj.isEnable"
            ></dict-tag>
          </el-descriptions-item>
        </el-descriptions>
        <!-- 单位信息 -->
        <el-descriptions
          title="单位信息"
          class="mt-20"
          :column="spanValue"
          border
        >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="最小单位"
            ><dict-tag
              :options="basic_goods_unit"
              :value="goodsObj.unitId"
            ></dict-tag
          ></el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="赋码单位"
            ><dict-tag
              :options="basic_goods_unit"
              :value="goodsObj.codeUnitId"
            ></dict-tag
          ></el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="赋码单位系数"
            >{{ goodsObj.codeRatio }}</el-descriptions-item
          >
        </el-descriptions>
        <!-- 医保属性 -->
        <el-descriptions
          title="医保属性"
          :column="spanValue"
          border
          class="mt-20"
        >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否医保记账"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isInsurance"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="医保名称"
            >{{ goodsObj.insuranceName }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="医保编码"
            >{{ goodsObj.insuranceCode }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="医保流水号"
            >{{ goodsObj.insuranceNo }}
          </el-descriptions-item>
        </el-descriptions>
        <!-- 其他属性 -->
        <el-descriptions
          title="其他属性"
          :column="spanValue"
          border
          class="mt-20"
        >
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="结算类型"
            ><dict-tag
              :options="basic_goods_settlement"
              :value="goodsObj.settlementType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="采购类型"
            ><dict-tag
              :options="basic_goods_buy"
              :value="goodsObj.purchaseType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="存储类型"
            ><dict-tag
              :options="basic_goods_storage"
              :value="goodsObj.storageType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="中标类型"
            ><dict-tag
              :options="basic_goods_bidder"
              :value="goodsObj.bidType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="中标编码"
            >{{ goodsObj.bidCode }}
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="细分类别"
            ><dict-tag
              :options="basic_goods_small"
              :value="goodsObj.detailType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="医嘱类别"
            ><dict-tag
              :options="basic_goods_advice"
              :value="goodsObj.orderType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="医用耗材等级"
            ><dict-tag
              :options="basic_goods_grade"
              :value="goodsObj.riskLevelType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="专用类型"
            ><dict-tag
              :options="basic_goods_one"
              :value="goodsObj.dedicatedType"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否国家谈判"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isNational"
            ></dict-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label-class-name="my-label"
            label-align="right"
            label="是否常备物质"
            ><dict-tag
              :options="basic_goods_has"
              :value="goodsObj.isStanding"
            ></dict-tag>
          </el-descriptions-item>
        </el-descriptions>
        <!-- 图片信息 -->
        <el-descriptions title="图片信息" class="mt-20"> </el-descriptions>
        <div v-if="srcList.length">
          <el-image
            class="mr-20 mb-20"
            v-for="(item, index) in srcList"
            :key="item"
            style="width: 100px; height: 100px"
            :src="item"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="srcList"
            :initial-index="index"
            fit="cover"
          />
        </div>
        <el-empty description="暂未任何图片" :image-size="60" />
        <el-divider />
        <div class="df aic jcc">
          <el-button type="primary" @click="edit()">编辑</el-button>
          <el-button @click="close()">返回</el-button>
        </div>
      </template>
    </el-auto-resizer>
  </div>
</template>

<script setup name="GoodsMessageDetails">
import { computed } from 'vue'

const { proxy } = getCurrentInstance()
const {
  basic_goods_big,
  basic_goods_finance,
  basic_goods_unit,
  basic_goods_producer,
  basic_goods_risk,
  basic_goods_18type,
  basic_goods_has,
  basic_goods_buy,
  basic_goods_storage,
  basic_goods_bidder,
  basic_goods_small,
  basic_goods_advice,
  basic_goods_grade,
  basic_goods_one,
  basic_goods_unittype
} = proxy.useDict(
  'basic_goods_big',
  'basic_goods_finance',
  'basic_goods_unit',
  'basic_goods_producer',
  'basic_goods_risk',
  'basic_goods_18type',
  'basic_goods_has',
  'basic_goods_buy',
  'basic_goods_storage',
  'basic_goods_bidder',
  'basic_goods_small',
  'basic_goods_advice',
  'basic_goods_grade',
  'basic_goods_one',
  'basic_goods_unittype'
)
const route = useRoute()
const spanValue = ref(3)
const goodsObj = ref({})
const getLoading = ref(false)
const srcList = computed(() => {
  if (!goodsObj.value.imageUrl) return []
  return goodsObj.value.imageUrl.split(',')
})
const currentRow = ref({
  id: 1,
  unitList: [
    {
      type: '最小单位'
    },
    {
      type: '包装单位/采购单位'
    }
  ]
})
function resizerChange ({ width }) {
  if (width <= 1000) {
    spanValue.value = 1
  } else if (width > 1000 && width <= 1400) {
    spanValue.value = 2
  } else {
    spanValue.value = 3
  }
}
/** 关闭按钮 */
function close (path) {
  const obj = {
    path: '/basicData/goodsManagement/goodsMessage'
  }
  proxy.$tab.closeOpenPage(obj)
}

/* 编辑按钮 */
function edit () {
  const obj = {
    path:
      '/basicData/goodsManagement-custom/addGoodsMessage/edit/' +
      currentRow.value.id
  }
  proxy.$tab.openPage(obj)
}
</script>

<style lang="scss" scoped>
:deep(.my-label) {
  width: 150px !important;
}
</style>
