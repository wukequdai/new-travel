// 引入 router
import router from '../../router'

// 引入html模板，会被作为字符串引入
import template from './index.html'

// 引入css，会生成style插入head中
import './style.css'

// 导出类
export default class {
  mount(container) {
    document.title = 'foo'
    container.innerHTML =template
    container.querySelector('.foo_gobar').addEventListener('click',()=>{
      // 调用router.go方法加载/bar 页面
      router.go('./bar')
    })
  }
}
