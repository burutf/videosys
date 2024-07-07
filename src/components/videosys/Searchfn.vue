<template>
    <div class="searchcl">
        <div class="datese">
            <el-date-picker v-model="datascope" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" size="small" unlink-panels :editable="false" @change="searchdata"
                :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <div class="titelse">
            <el-input placeholder="按Enter搜索标题" prefix-icon="el-icon-search" v-model="titledata" @change="titsearch"
                clearable>
            </el-input>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            //选择的日期
            datascope: [],
            //要搜索的标题（模糊查询）
            titledata: '',
            //禁用未来时间
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
        }
    },
    methods: {
        //给父组件传递选择的日期
        searchdata() {
            this.$emit('datesearchfn', this.datascope)
        },
        titsearch() {
            this.$emit('titsearchfn', this.titledata)
        },
        //清空筛选
        clearfiliter() {
            this.datascope = []
            this.titledata = ''
            this.searchdata()
            this.titsearch()
        }
    },
}
</script>

<style lang="less" scoped>
.searchcl {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    justify-content: space-between;

    .datese {
        width: 50%;

        .el-input__inner {
            width: 100%;
            max-width: 400px;
        }
    }

    .titelse {
        width: 40%;
        max-width: 400px;
    }
}
</style>