import { createRouter, createWebHistory } from 'vue-router'
import {Notify, Toast} from 'vant';
import store from '../store';
const Home =  () => import( '../views/home/Home')
const Category =  () => import( '../views/category/Category')
const Detail =  () => import( '../views/detail/Detail')
const Profile =  () => import( '../views/profile/Profile')
const Cart = () => import('../views/cart/Cart')
const Register = () => import('../views/profile/Register')
const Login = () => import('../views/profile/Login')
const Address = () => import('../views/profile/Address')
const AddressEdit = () => import('../views/profile/AddressEdit')
const Order = () => import('../views/order/Order');
const OrderDetail = () => import('../views/order/OrderDetail');
const CreateOrder = () => import('../views/order/CreateOrder');

const routes = [
  {
    path: '/',
    name: 'DefaultHome',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'图书兄弟'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta:{
      title:'图书兄弟-商品分类'
    }
  },
  {
    path: '/detail/',
    name: 'Detail',
    component: Detail,
    meta:{
      title:'图书兄弟-商品详情'
    }
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta:{
      title:'图书兄弟-购物车',
      isAuthRequired:true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'图书兄弟-个人中心',
      isAuthRequired:true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta:{
      title:'地址管理',
      isAuthRequired:true
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta:{
      title:'地址编辑',
      isAuthRequired:true
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title:'图书兄弟-生成订单',
      isAuthRequired:true
    }
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component: CreateOrder,
    meta: {
      title:'图书兄弟-订单预览',
      isAuthRequired:true
    }
  },
  {
    path: '/orderdetail',
    name: 'OrderDetail',
    component: OrderDetail,
    meta: {
      title:'图书兄弟-订单详情',
      isAuthRequired:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      title:'用户注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'用户登录'
    }
  },


]

const router = createRouter({
  history:createWebHistory(process.env.BASE_URL),//VueRouter.createWebHashHistory()

  routes
})
//导航守卫
router.beforeEach((to,from,next)=>{

  if (to.meta.isAuthRequired && store.state.user.isLogin === false){

    Notify('请先登录')
      return next('/login');
  }else {
    store.dispatch('updateCart')
    next();
  }
 //登录跳转

  document.title = to.meta.title

})

export default router
