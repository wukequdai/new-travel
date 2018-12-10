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
						<el-input v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="Name">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="Email">
						<el-input v-model="form.email"></el-input>
					</el-form-item>
					<el-form-item label="Password">
						<el-input v-model="form.pwd"></el-input>
					</el-form-item>
					<el-form-item label="Password confirmation">
						<el-input v-model="form.pwdcf"></el-input>
					</el-form-item>
					<el-form-item >
						<el-radio-group v-model="form.resource">
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
  export default {
    data() {
      return {
        form: {
		  username: '',
          name: '',
		  email: '',
          pwd: '',
		  pwdcf: '',
          resource: '',
        }
      }
    },
    methods: {
		add: function () {
			axios.post('/api/user/register', this.form)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		},
      onSubmit() {
        console.log('submit!');
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