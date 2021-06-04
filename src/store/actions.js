import {getCart} from "network/cart";

const actions ={

    updateCart({state,commit}){
        console.log(state.user.isLogin);
        if (state.user.isLogin){
            getCart().then(res =>{
                commit('addCart',{count:res.data.length || 0})
            })
        }
    }

}

export default actions;