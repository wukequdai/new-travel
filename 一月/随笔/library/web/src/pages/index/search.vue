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
		<el-row>
			<el-col :span='8' :offset="7">
				<el-form ref="form"  label-width="120px">
				  <el-form-item label="Book Name">
					<el-input v-model="name"></el-input>
				  </el-form-item>
				</el-form>
			</el-col>
			<el-col :span="2">
				<el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<el-row>
			<!-- <el-col :span="4" :offset="0">
				<el-button round>Display All</el-button>
			</el-col> -->
<!-- 			<el-col :span="4">
				<el-button round>Search</el-button>
			</el-col> -->
		</el-row>
		<el-row>
			<el-table
				:data="tableData"
				stripe
				style="width: 100%">
				<el-table-column
					prop="book_name"
					label="bookName"
				>
				</el-table-column>
				<el-table-column
					prop="author"
					label="author"
					width="350">
				</el-table-column>
				<el-table-column
					prop="status"
					:formatter="loan"
					label="status" width="350">
				</el-table-column>
			</el-table>
		</el-row>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        name: '',
		tableData: [],
		token: sessionStorage.getItem('user')
      }
    },
    methods: {
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
	  loan: function(row, column){
	  	return 	row.status == 1 ? '未借出' : 
	  					row.status == 2 ? '借出' : 
	  					'未知';
	  },
	  search: function(){
		  axios.post('/api/book/queryAllBooks', {
		  	pageSize: 100,
			book_name: this.name
		  })
		  .then(function (res) {
		  	if(res.data.code == 1){
		  		this.tableData =res.data.data.list
				if(this.tableData ==''){
					this.$message.warning('此书不存在');
				}
		  	}
		  }.bind(this))
		 
	  }
    },
	mounted() {
		this.bookList();
	}
  }
</script>