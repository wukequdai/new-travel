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
				<el-form  label-width="120px">
					<el-form-item label="Book Name">
						<el-select v-model="value" placeholder="请选择">
							<el-option
								v-for="item in tableData"
								:key="item.id"
								:label="item.book_name"
								:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<el-form   label-width="120px">
					<el-form-item label="Rent Date">
						<el-date-picker
						  v-model="rant_date"
						  type="daterange"
						  value-format="yyyy-MM-dd"
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col>
				<el-button type="primary" @click="submit">confirm</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        value: '',
		name:'',
		rant_date: '',
		tableData: '',
		token: sessionStorage.getItem('user')
      }
    },
    methods: {
      search: function(){
      	axios.post('/api/book/queryAllBooks', {
			pageSize: 100,
			status: 1
      	})
      	.then(function (res) {
			if(res.data.code == 1){
				this.tableData =res.data.data.list;
				if(this.tableData ==''){
					this.$message.warning('此书不存在');
				}
			}
      	}.bind(this))
      },
	  submit: function(){
		  console.log(this.value)
		  console.log(this.rant_date)
		  if(this.value == ''){
		  	this.$message.warning('请选择书');
		  	return false;
		  }
		  if(this.rant_date == ''){
			  this.$message.warning('请填写日期');
			  return false;
		  }
		  if(this.token == null){
		  	this.$message.warning('请先登录');
		  	return false;
		  }
		  axios.post('/api/book/rantBook', {
		  	id: this.value,
		  	rant_date1: this.rant_date[0],
			rant_date2: this.rant_date[1],
			ranter: this.token
		  })
		  .then(function (res) {
		  	if(res.data.code == 1){
		  		this.$message.success('借阅成功');
		  	}else{
				this.$message.warning(res.data.msg);
			}
		  }.bind(this))
	  }
    },
	mounted() {
		this.search();
	}
  }
</script>