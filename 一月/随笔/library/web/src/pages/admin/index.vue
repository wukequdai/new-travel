<template>
	<div class="container">
		<el-row>
			<el-col :span="4">
				<router-link to="/"><h1>New library</h1></router-link>
			</el-col>
			<el-col v-if="token" :offset="16" :span="2">
				<el-button type="text" >{{token}}</el-button>
			</el-col>
			<el-col  v-else :offset="16" :span="2">
				<router-link to="/login"><el-button type="primary" plain>login</el-button></router-link>
			</el-col>
			<el-col v-show="!token" :span="2">
				<router-link to="/register"><el-button plain>Register</el-button></router-link>
			</el-col>
		</el-row>
		<el-row class="addBook">
			<!-- <h1 @click="dialogVisible = true">add book</h1> -->
			<el-button type="primary" @click="dialogVisible = true">add book</el-button>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				
				<el-table-column
				  prop="book_name"
				  label="bookName"
				  width="180">
				</el-table-column>
				<el-table-column
					prop="author"
					label="author"
					width="180">
				</el-table-column>
				<el-table-column
				  prop="status"
					:formatter="loan"
				  label="status">
				</el-table-column>
				<el-table-column
				prop="rant_date1"
				label="开始时间"
				width="250">
				</el-table-column>
				<el-table-column
				prop="rant_date2"
				label="结束时间"
				format="yyyy 年 MM 月 dd 日"
				width="250">
				</el-table-column>
				<el-table-column
					  label="操作"
					  width="180">
					  <template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">edit</el-button>
						<el-button @click="del(scope.row)" type="text" size="small">delete</el-button>
					  </template>
				</el-table-column>
			  </el-table>
			</el-row>
			<el-dialog
				title="新增"
				:visible.sync="dialogVisible"
				width="30%"
				:before-close="handleClose">
				<el-form label-width="120px">
					<el-form-item label="Book Name">
						<el-input v-model="book_name"  autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="Author">
							<el-input v-model="author"  autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addBook">确 定</el-button>
				</span>
			</el-dialog>
			<el-dialog
				title="编辑"
				:visible.sync="editVisible"
				width="30%"
				:before-close="handleClose">
				<el-form :model="auditForm" label-width="120px">
					<el-form-item label="Book Name">
						<el-input v-model="auditForm.book_name"  autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="Author">
							<el-input v-model="auditForm.author"  autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="leasee">
							<el-input v-model="auditForm.status"   autocomplete="off"></el-input>
					</el-form-item>
					<el-form   label-width="120px">
						<el-form-item label="开始时间">
							<el-date-picker
								v-model="auditForm.rant_date1"
								type="date"
								placeholder="选择日期"
								format="yyyy 年 MM 月 dd 日"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</el-form>
					<el-form   label-width="120px">
						<el-form-item label="结束时间">
							<el-date-picker
								v-model="auditForm.rant_date2"
								type="date"
								placeholder="选择日期"
								format="yyyy 年 MM 月 dd 日"
								value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-form-item>
					</el-form>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="editSubmit">确 定</el-button>
				</span>
			</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'admin',
				tableData: [],
				dialogVisible: false,
				editVisible: false,
				book_name: '',
				author: '',
				auditForm: {
					book_name:'',
					author: '',
					status: '',
					rant_date1: '',
					rant_date2: ''
				},
				token: sessionStorage.getItem('user')
			}
		},
		methods: {
			loan: function(row, column){
				return 	row.status == 1 ? '未借出' : 
								row.status == 2 ? '借出' : 
								'未知';
			},
			handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
			bookList: function(){
				axios.post('/api/book/queryAllBooks', {
					pageSize: 100
				})
				.then(function (res) {
					if(res.data.code == 1){
						this.tableData =res.data.data.list
					}
				}.bind(this))
			},
			addBook: function(){
				axios.post('/api/book/addBook', {
					book_name: this.book_name,
					author: this.author
				})
				.then(function (res) {
					if(res.data.code == 1){
						this.$message.success('新增成功');
						this.dialogVisible = false
						this.bookList();
					}
				}.bind(this))
			},
			submit: function(){
				if(this.bookName == ''){
					this.$message.warning('请填写书名');
					return false;
				}
				if(this.author == ''){
					this.$message.warning('请填写作者');
					return false;
				}
				this.addBook()
			},
			handleClick: function(a) {
				this.editVisible = true
				this.auditForm = a
				console.log(a)
			},
			del: function(a){
				axios.post('/api/book/deleteBook', {
					id: a.id
				})
				.then(function (res) {
					if(res.data.code == 1){
						this.$message.success('删除成功');
						this.bookList();
					}
				}.bind(this))
			},
			editSubmit: function(){
				console.log(this.auditForm)
				// console.log(this.auditForm.value[0])
				axios.post('/api/book/editBook', {
					book_name: this.auditForm.book_name,
					author: this.auditForm.author,
					status: this.auditForm.status,
					rant_date1: this.auditForm.rant_date1,
					rant_date2: this.auditForm.rant_date2,
					
				})
				.then(function (res) {
					if(res.data.code == 1){
						this.$message.success('修改成功');
						this.editVisible = false
						this.bookList();
					}
				}.bind(this))
			}
		},
		mounted() {
			this.bookList();
		}
	}
</script>
<style scoped="scoped">
	.addBook{
		text-align: left;
	}
	.addBook button{
		margin: 10px;
	}
</style>