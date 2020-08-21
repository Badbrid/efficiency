<template>
    <el-button :disabled="disabled" @click="exec()" plain :type="type" :icon="icon" :size="size">
        {{content}}
    </el-button>
</template>
<script>
import {checkoutTestManagerOrTestUser} from '../../../utils/utils';
export default {
    name: "EfficTableButton",
    components: {checkoutTestManagerOrTestUser},
    data() {
        return {
            disabled: false
        }
    },
    props: {
        content: String,
        icon: {
          type: String,
          default: 'el-icon-question'
        },
        type: {
          type: String,
          default: null
        },
        effect: {
          type: String,
          default: 'dark'
        },
        size: {
          type: String,
          default: 'mini'
        },
        isTesterPermission: {
          type: Boolean,
          default: false
        }
    },
    mounted() {
        if (this.isTesterPermission && !checkoutTestManagerOrTestUser()) {
            this.disabled = true;
        }
    },
    methods: {
        exec() {
            this.$emit('click');
        }
    },
    activated() {
    }
}
</script>
<style>
</style>
