/*
    请求地址:http://wthrcdn.etouch.cn/weather_mini
    请求方式:get
    请求参数:city(城市名)
    响应内容:天气信息

    1.点击回车
    2.查询数据
    渲染数据
 */

let app = new Vue({
    el: "#app",
    data: {
        city: '',
        weatherList: []
    },
    methods: {
        searchWeather: function () {
            let that = this;
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city).then(
                function (response) {
                    console.log(response.data.data);
                    that.weatherList = response.data.data.forecast;
                }, function (err) {
                    console.log(err);
                }
            )
        },
        changeCity: function (city) {
            this.city = city;
            this.searchWeather();
        }
    }
});