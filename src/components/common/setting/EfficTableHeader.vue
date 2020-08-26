<template>
    <div>
        <el-row class="table-title" type="flex" justify="space-between" align="middle">
            <slot name="title">
                {{title}}
            </slot>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle">
            <span class="operate-button">
                <effic-table-button :is-tester-permission="isTesterPermission" v-if="showCreate" icon="el-icon-circle-plus-outline" :content="createTip" @click="create"/>
                <slot name="button"></slot>
            </span>
            <span>
                <effic-table-search :condition.sync="condition" @change="search"/>
            </span>
        </el-row>
    </div>
</template>
<script>
import EfficTableButton from '../button/EfficTableButton';
import EfficTableSearch from '../search/EfficTableSearch';
export default {
    name: "EfficTableHeader",
    components:{EfficTableButton,EfficTableSearch},
    data() {
        return {
        }
    },
    props: {
        title: {
          type: String,
          default() {
            return 用户中心;
          }
        },
        showCreate: {
          type: Boolean,
          default: true
        },
        condition: {
          type: String,
          default() {
              return "";
          }
        },
        createTip: {
          type: String,
          default() {
            return 创建用户;
          }
        },
        isTesterPermission: {
          type: Boolean,
          default: false
        }
    },
    methods: {
        search() {
            this.$emit('condition', this.condition);
            this.$emit('search');
        },
        create() {
            this.$emit('create');
        }
    },
    activated() {
    }
}
</script>
<style>
.table-title {
    height: 40px;
    font-weight: bold;
    font-size: 18px;
  }
</style>

<style scoped>

  .operate-button {
    margin-bottom: -5px;
  }

</style>
