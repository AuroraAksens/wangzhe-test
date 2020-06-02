<template>
    <div>
        <h1>装备列表</h1>
        <el-table :data="item">
            <el-table-column prop="_id" label="ID" width="220">
            </el-table-column>
            <el-table-column prop="name" label="装备名称">
            </el-table-column>
            <el-table-column prop="avatar" label="装备图标">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar"  style="height: 5rem;">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/item/create/${scope.row._id}`)">编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                item: []
            }
        },
        created() {
            this.lis();
        },
        methods: {
            async lis() {
                const res = await this.$http.get('/rest/item')
                this.item = res.data
            },
            async del(row) {
                this.$confirm(`是否删除此装备 ${row.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`/rest/item/${row._id}`)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.lis()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },

    }
</script>