<template>
    <div>
        <h1>分类列表</h1>
        <el-table :data="item">
            <el-table-column prop="_id" label="ID" width="220">
            </el-table-column>
            <el-table-column prop="parent.name" label="父级分类">
            </el-table-column>
            <el-table-column prop="name" label="分类名称">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/category/create/${scope.row._id}`)">编辑
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
                const res = await this.$http.get('/rest/category')
                this.item = res.data
            },
            async del(row) {
                this.$confirm(`是否删除此分类 ${row.name}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await this.$http.delete(`/rest/category/${row._id}`)
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