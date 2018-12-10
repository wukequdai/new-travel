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
			<h1>admin</h1>
			<el-table
				:data="tableData"
				border
				style="width: 100%">
				
				<el-table-column
				  prop="bookName"
				  label="bookName"
				  width="180">
				</el-table-column>
				<el-table-column
				  prop="status"
				  label="status">
				</el-table-column>
				<el-table-column
				prop="leasee"
				label="leasee"
				width="180">
				</el-table-column>
				<el-table-column
				prop="date"
				label="date"
				width="180">
				</el-table-column>
				<el-table-column
					  label="操作"
					  width="180">
					  <template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">edit</el-button>
						<el-button type="text" size="small">delete</el-button>
					  </template>
				</el-table-column>
			  </el-table>
			</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: 'admin',
				tableData: [{
					bookName: '笑傲江湖',
					status: '出租中',
					leasee: '小明',
					date: '2018-5-02 to 2019-08-20',

				}]
			}
		}
	}
</script>