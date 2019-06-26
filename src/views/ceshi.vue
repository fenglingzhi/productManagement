<template>
    <div>
        111111111111111111111111111111111111
        <div>
            <a-checkbox-group :options="plainOptions" v-model="value" @change="onChange1" />
            <br />
            <a-checkbox-group :options="plainOptions" :defaultValue="['Apple']" @change="onChange" />
            <br />
            <a-checkbox-group :options="options" :value="['Pear']" @change="onChange" />
            <br />
            <a-checkbox-group :options="optionsWithDisabled"  :defaultValue="['Apple']" @change="onChange">
                <span style="color: red" slot="label" slot-scope="{value}">{{value}}</span>
            </a-checkbox-group>
        </div>

        <a-row>
            <a-col span="2"></a-col>
            <a-col span="10">
                <div id="main" style="width: 100%;height:400px;"></div>
            </a-col>
            <a-col span="2"></a-col>

        </a-row>


    </div>
</template>
<script>
    const plainOptions = [
        { label: 'Apple', value: 'Apple1',checked:true},
        { label: 'Apple', value: 'Apple2'},
        { label: 'Apple', value: 'Apple'},
    ]
    import echarts from 'echarts'

    const options = [
        { label: 'Apple', value: 'Apple'},
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
    ]
    const optionsWithDisabled = [
        { value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: false },
    ]
    export default {
        data () {
            return {
                plainOptions,
                options,
                optionsWithDisabled,
                option: {
                    title: {
                        text: 'ECharts'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                },
                value: [],
            }
        },
        methods: {
            onChange (checkedValues) {
                console.log('checked = ', checkedValues)
                console.log('value = ', this.value)
            },
            onChange1 (checkedValues) {
                console.log('checked = ', checkedValues)
                console.log('value = ', this.value)
                alert(checkedValues.length)
            },
        },
        mounted(){



            // 使用刚指定的配置项和数据显示图表。
            var vm = this
            setInterval(function () {
                var myChart = echarts.init(document.getElementById('main'));
                myChart.setOption(vm.option);

            },1000)
        }
    }
</script>
