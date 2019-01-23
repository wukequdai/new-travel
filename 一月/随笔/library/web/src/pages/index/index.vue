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
			<el-col>
				<h2>Welcome to the new library!</h2>
			</el-col>
		</el-row>
		<el-row>
			<el-col :offset="9" :span="3">
				<router-link to="/rentBook"><el-button type="primary" round>Rent Book</el-button></router-link>
			</el-col>
			<el-col :span="3">
				<router-link to="/search"><el-button  round>Search Book</el-button></router-link>
			</el-col>
		</el-row>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        token: sessionStorage.getItem('user')
      };
    },
    methods: {
    }
  }
</script>
<style scoped>
	.el-row .el-col h2{
		margin-top:150px;
		margin-bottom: 80px;
	}

</style>