<template>
    <span>
        <slot name="front"></slot>
        <effic-table-operator-button :isTesterPermission="isTesterPermission" :tip="tip1" icon="el-icon-edit" @exec="editClick" @click.stop="editClickStop"/>
        <slot name="middle"></slot>
        <effic-table-operator-button :isTesterPermission="isTesterPermission" :tip="tip2" icon="el-icon-delete" type="danger" @exec="deleteClick" @click.stop="deleteClickStop"/>
        <slot name="behind"></slot>
    </span>
</template>
<script>
import EfficTableOperatorButton from './EfficTableOperatorButton';
export default {
    name: "EfficTableOperator",
    components: {EfficTableOperatorButton},
    props: {
        tip1: {
                type: String,
                default() {
                    return '编辑';
                }
            },
        tip2: {
            type: String,
            default() {
                return '删除';
            }
        },
        isTesterPermission: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
        editClick() {
          this.$emit('editClick');
        },
        editClickStop() {
          this.$emit('editClickStop');
        },
        deleteClick() {
          this.$emit('deleteClick');
        },
        deleteClickStop() {
          this.$emit('deleteClickStop');
        }
    },
    activated() {
    }
}
</script>
<style>
</style>
