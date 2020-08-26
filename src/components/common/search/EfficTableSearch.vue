<template>
    <el-input
        class="search"
        type="text"
        size="small"
        placeholder="根据用户名查找"
        prefix-icon="el-icon-search"
        @change="search"
        maxlength="60"
        v-model="searchValue" clearable/>
</template>
<script>
export default {
    name: "EfficTableSearch",
    data() {
        return {
            searchValue: ""
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
    mounted() {
        this.searchValue = this.condition;
    },
    methods: {
        search() {
            // this.$emit('condition', this.condition);
            this.$emit('search',this.searchValue);
        }
    },
    activated() {
    }
}
</script>
<style>
</style>
