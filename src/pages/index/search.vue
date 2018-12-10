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
		<el-row>
			<el-col :span='8' :offset="8">
				<el-form ref="form"  label-width="120px">
				  <el-form-item label="Book Name">
					<el-input v-model="name"></el-input>
				  </el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4" :offset="8">
				<el-button round>Display All</el-button>
			</el-col>
			<el-col :span="4">
				<el-button round>Search</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        name: ''
      }
    },
    methods: {
      
    }
  }
</script>