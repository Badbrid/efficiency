<template>
    <el-input
        class="search"
        type="text"
        size="small"
        placeholder="根据用户名查找"
        prefix-icon="el-icon-search"
        @change="search"
        maxlength="60"
        v-model="condition" clearable/>
</template>
<script>
export default {
    name: "EfficTableSearch",
    data() {
        return {
        }
    },
    props: {
        condition: {
            type: String,
            default() {
                return "";
            }
        }
    },
    methods: {
        search() {
            this.$emit('condition', this.condition);
            this.$emit('change');
        }
    },
    activated() {
    }
}
</script>
<style>
</style>
