export const Authorization = (path) => {
  let resUrl = window.location.href.split('#')[0]
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx843cfb0420c54204&redirect_uri=${resUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

export const parseUrl = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r=window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export const getCookie = (cookie_name) => {
// 定义一个函数，用来读取特定的cookie值。
    var allcookies = document.cookie;
    var cookie_start = allcookies.indexOf(cookie_name); //寻找名第一次出现的位置
    // 如果找到了就代表cookie存在
    // 反之，就说明不存在。
    if (cookie_start != -1){
        // 把cookie_start放在值的开始，只要给值加1即可。
        cookie_start += cookie_name.length + 1;
        var cookie_end = allcookies.indexOf(';', cookie_start);
        if (cookie_end == -1){
            cookie_end = allcookies.length;
        }
    }
}
