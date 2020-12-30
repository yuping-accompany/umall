export let state={
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export let mutations={
        changeuserInfo(state,obj){
            state.userInfo=obj

            if(obj.id){
                sessionStorage.setItem("userInfo",JSON.stringify(obj))
            }else{
                sessionStorage.removeItem("userInfo")
            }
        }

}
export let getters={
    userInfo(state){
        return state.userInfo
    }
}
