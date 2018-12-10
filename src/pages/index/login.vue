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
			<el-col :offset="8" :span="8">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="Account:">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="Password:">
						<el-input v-model="form.pwd"></el-input>
					</el-form-item>
					<el-form-item >
						<el-radio-group v-model="form.resource">
							<el-radio label="Normal user">Normal user</el-radio>
							<el-radio label="admin">admin</el-radio>
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
          name: '',
          pwd: '',
          resource: '',
        }
      }
    },
    methods: {
		login: function () {
			axios.post('/api/user/login', this.form)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		onSubmit() {
			console.log('submit!');
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