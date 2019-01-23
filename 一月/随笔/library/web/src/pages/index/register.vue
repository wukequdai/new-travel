<template>
	<div class="container">
		<el-row>
			<el-col :span="4">
				<router-link to="/"><h1>New library</h1></router-link>
			</el-col>
			<el-col :offset="16" :span="2">
				<router-link to="/login"><el-button type="primary" plain>login</el-button></router-link>
			</el-col>
			<el-col :span="2">
				<router-link to="/register"><el-button plain>Register</el-button></router-link>
			</el-col>
		</el-row>
		<el-row class="mt">
			<el-col :offset="6" :span="10">
				<el-form ref="form" :model="form" label-width="180px">
					<el-form-item label="Username">
						<el-input v-model="form.user_name"></el-input>
					</el-form-item>
					<el-form-item label="Name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="Email">
						<el-input v-model="form.e_mail"></el-input>
					</el-form-item>
					<el-form-item label="Password">
						<el-input v-model="form.pwd"></el-input>
					</el-form-item>
					<el-form-item label="Password confirmation">
						<el-input v-model="form.pwdcf"></el-input>
					</el-form-item>
					<el-form-item >
						<el-radio-group v-model="form.role">
							<el-radio label="1">Normal user</el-radio>
							<el-radio label="2">admin</el-radio>
						</el-radio-group>
					</el-form-item>
					
					<el-form-item>
						<el-button type="primary" @click="onSubmit">set up</el-button>
						
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		
	</div>
</template>
<script>
	import { Message } from 'element-ui';
  export default {
    data() {
      return {
        form: {
		  user_name: '',
          name: '',
		  e_mail: '',
          pwd: '',
		  pwdcf: '',
          role: '',
        }
      }
    },
    methods: {
			add: function () {
				axios.post('/api/user/register', this.form)
				.then(function (res) {
					if(res.data.code == 1){
						this.$message.success('注册成功');
						this.$router.push({path: '/login'});
					}else if(res.data.code == 0){
						this.$message.warning(res.data.msg);
					}
				}.bind(this))
				
			},
			onSubmit() {
				if(this.form.username == ''){
					this.$message.warning('请填写参数');
					return false;
				}
				if(this.form.name == ''){
					this.$message.warning('请填写参数');
					return false;
				}
				if(this.form.email == ''){
					this.$message.warning('请填写参数');
					return false;
				}
				if(this.form.pwd == ''){
					this.$message.warning('请填写参数');
					return false;
				}
				if(this.form.pwd != this.form.pwdcf){
					this.$message.warning('请确认密码');
					return false;
				}
				if(this.form.resource == ''){
					this.$message.warning('请填写参数');
					return false;
				}
				this.add();
				
			}
    },
	mounted() {
		// this.add();
	}
  }
</script>
<style scoped>
	.mt{
		margin-top: 150px;
	}
</style>