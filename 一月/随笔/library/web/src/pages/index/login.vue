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
		<el-row class="mt">
			<el-col :offset="8" :span="8">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="Account:">
						<el-input v-model="form.user_name"></el-input>
					</el-form-item>
					<el-form-item label="Password:">
						<el-input v-model="form.pwd"></el-input>
					</el-form-item>
					<el-form-item >
						<el-radio-group v-model="form.role">
							<el-radio label="1">Normal user</el-radio>
							<el-radio label="2">admin</el-radio>
						</el-radio-group>
					</el-form-item>
					
					<el-form-item>
						<el-button type="primary" @click="onSubmit">login</el-button>
						
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		
	</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          user_name: '',
          pwd: '',
          role: '',
        },
				token: ''
      }
    },
    methods: {
		login: function () {
			axios.post('/api/user/login', this.form)
			.then(function (res) {
				if(res.data.code == 1){
					this.$message.success('登陆成功');
// 					let a = res.data.data.user_name;
// 					console.log(a)
// 					
					if(this.form.role == 1){
						this.$router.push({path: '/'});
						sessionStorage.setItem('user', 'user');
					}else{
						this.$router.push({path: '/admin'});
						sessionStorage.setItem('user', 'Administrator');
					}
					
				}else{
					this.$message.warning('请确认密码');
				}
			}.bind(this))
		},
		onSubmit() {
			if(this.form.name == ''){
				this.$message.warning('请填写参数');
				return false;
			}
			if(this.form.pwd == ''){
				this.$message.warning('请填写参数');
				return false;
			}
			if(this.form.resource == ''){
				this.$message.warning('请填写参数');
				return false;
			}
			this.login()
		}
    }
  }
</script>
<style scoped>
	.mt{
		margin-top: 150px;
	}
</style>