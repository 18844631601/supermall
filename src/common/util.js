export function debounce(func, delay) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

export function formatDate(date, formatType) {
    //y+ 匹配 1个或多个y
    //y* 匹配 0个或多个y
    //y+ 匹配 0个或1个y
    if (/(y+)/.test(formatType)) {
        //RegExp.$1是test出来的字符串
        //str.substr(2)是从str截取掉两位，取剩下的
        formatType = formatType.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDay(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(formatType)) {
            let str = o[k] + '';
            formatType = formatType.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return formatType
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
