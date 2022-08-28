/**  
 * 函数防抖 (只执行最后一次点击)  
 * @param fn  
 * @param delay  
 * @returns {Function}  
 * @constructor  
 */  
let timer1 = null; //防抖，  
let timer2 = null; //节流  
export const Debounce = (fn, t) => {  
    let delay = t || 500;   
    return function () {  
        let args = arguments;  
        // let timer1 = null  
        // console.log(timer1);  
        if(timer1){  
            clearTimeout(timer1);  
        }  
        timer1 = setTimeout(() => {  
            fn.apply(this, args);  
            timer1 = null;  
        }, delay);  
    }  
};  

// 使用  
/*import {Debounce} from '@/common/debounceThrottle.js'  
Debounce(() => {  
    //要执行的函数  
}, 200)() */  

/**  
 * 函数节流  
 * @param fn  
 * @param interval  
 * @returns {Function}  
 * @constructor  
 */  
export const Throttle = (fn, t) => {  
    return function () {  
        let args = arguments;  
          if (!timer2){
            timer2 = setTimeout(() => {  
                fn.apply(this, args); 
                 timer2 = null
            }, t);  
        } 
    }  
};  