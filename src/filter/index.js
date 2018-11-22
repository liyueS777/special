import Vue from 'vue'
Vue.filter('translateToDate', (value) => {
  if(!value || value =='0'){return 0}
    let now = new Date(value),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
})
