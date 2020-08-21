<template>
    <effic-tip-button
        :disabled="disabled || isReadOnly"
        @click="exec"
        @clickStop="clickStop"
        :type="type"
        :tip="tip"
        :icon="icon" size="mini" circle/>
</template>
<script>
import EfficTipButton from './EfficTipButton';
import {checkoutTestManagerOrTestUser} from '../../../utils/utils';
export default {
    name: "EfficTableOperatorButton",
    components: {EfficTipButton},
    data() {
        return {
            isReadOnly: false
        }
    },
    props: {
        icon: {
            type: String,
            default: 'el-icon-question'
        },
        type: {
            type: String,
            default: 'primary'
        },
        tip: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isTesterPermission: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (this.isTesterPermission && !checkoutTestManagerOrTestUser()) {
            this.isReadOnly = true;
        }
    },
    methods: {
        exec() {
            this.$emit('exec');
        },
        clickStop() {
            this.$emit('clickStop');
        }
    }
}
</script>
<style>
</style>
