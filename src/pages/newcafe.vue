<template>
    <div class="page">
        <form>
            <div class="form-inner">
                <div class="cell allline">
                    <label>
                        名称:
                        <input type="text" placeholder="咖啡店名" v-model="name">
                    </label>
                    <span class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</span>
                </div>
                <div class="cell allline">
                    <label>
                        网址:
                        <input type="text" placeholder="网址" v-model="website">
                    </label>
                    <span class="validation" v-show="!validations.website.is_valid">{{ validations.website.text }}</span>
                </div>
                <div class="cell allline">
                    <label>简介
                        <input type="text" placeholder="简介" v-model="description">
                    </label>
                </div>
            </div>

            <div class="form-inner position"  v-for="(location, key) in locations" :key="key">
                <div class="cell allline">
                    <h3>位置</h3>
                </div>
                <div class="cell halfline">
                    <label>
                        位置名称：
                        <input type="text" placeholder="位置名称" v-model="description">
                    </label>
                </div>

                <div class="halfline cell">
                    <label>
                        详细地址：
                        <input type="text" placeholder="详细地址" v-model="locations[key].address">
                    </label>
                    <span class="validation"
                        v-show="!validations.locations[key].address.is_valid">{{ validations.locations[key].address.text }}</span>
                </div>
                <div class="halfline cell">
                    <label>
                        城市：
                        <input type="text" placeholder="城市" v-model="locations[key].city">
                    </label>
                    <span class="validation"
                        v-show="!validations.locations[key].city.is_valid">{{ validations.locations[key].city.text }}</span>
                </div>
                <div class="halfline cell">
                    <label>
                        省份：
                        <input type="text" placeholder="省份" v-model="locations[key].state">
                    </label>
                    <span class="validation"
                        v-show="!validations.locations[key].state.is_valid">{{ validations.locations[key].state.text }}</span>
                </div>
                <div class="halfline cell">
                    <label>
                        邮编：
                        <input type="text" placeholder="邮编" v-model="locations[key].zip">
                    </label>
                    <span class="validation"
                        v-show="!validations.locations[key].zip.is_valid">{{ validations.locations[key].zip.text }}</span>
                </div>

                <div class="allline cell brew-method-wrraper">
                    <label>支持的冲泡方法</label>
                    <span class="brew-method" v-for="brewMethod in brewMethods">
                        <input v-bind:id="'brew-method-'+brewMethod.id+'-'+key" type="checkbox"
                            v-bind:value="brewMethod.id" v-model="locations[key].methodsAvailable">
                        <label v-bind:for="'brew-method-'+brewMethod.id+'-'+key">{{ brewMethod.method }}</label>
                    </span>
                </div>
                <div class="allline cell">
                    <a class="button" v-on:click="removeLocation(key)">移除位置</a>
                </div>
            </div>

            <div class="form-inner">
                <div class="allline cell">
                    <a class="button" @click="addLocation">新增位置</a>
                </div>
                <div class="allline cell">
                    <a class="button" @click="submitNewCafe">提交表单</a>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            locations: [], //位置
            website: '',  //网站
            description: '',//描述
            roaster: false,
            validations: {
                name: {
                    is_valid: true,
                    text: ''
                },
                locations: [],
                oneLocation: {
                    is_valid: true,
                    text: ''
                },
                website: {
                    is_valid: true,
                    text: ''
                }
            }
        }
    },
    computed: {
        brewMethods() {
            return this.$store.getters.getBrewMethods;
        },
        addCafeStatus() {
            return this.$store.getters.getCafeAddStatus;
        }
    },
    watch: {
        addCafeStatus() {
            if (this.addCafeStatus === 2) {
                // 添加成功
                this.clearForm();
                $("#cafe-added-successfully").show().delay(5000).fadeOut();
            }

            if (this.addCafeStatus === 3) {
                // 添加失败
                $("#cafe-added-unsuccessfully").show().delay(5000).fadeOut();
            }
        }
    },
    created() {
        this.addLocation();
    },
    methods: {
        submitNewCafe () {
            console.log(this.validateNewCafe());
            if(this.validateNewCafe()){
                this.$store.dispatch('addCafe', {
                    name: this.name,
                    locations: this.locations,
                    website: this.website,
                    description: this.description,
                    roaster: this.roaster
                });
            }
        },
        validateNewCafe () {
            let validNewCafeForm = true;

            // 确保 name 字段不为空
            if( this.name.trim() === '' ){
                validNewCafeForm = false;
                this.validations.name.is_valid = false;
                this.validations.name.text = '请输入咖啡店的名字';
            }else{
                this.validations.name.is_valid = true;
                this.validations.name.text = '';
            }

            for (var index in this.locations) {
                if (this.locations.hasOwnProperty(index)) {
                    // 确保地址字段不为空
                    if (this.locations[index].address.trim() === '') {
                        validNewCafeForm = false;
                        this.validations.locations[index].address.is_valid = false;
                        this.validations.locations[index].address.text = 'Please enter an address for the new cafe!';
                    } else {
                        this.validations.locations[index].address.is_valid = true;
                        this.validations.locations[index].address.text = '';
                    }

                    // 确保城市字段不为空
                    if (this.locations[index].city.trim() === '') {
                        validNewCafeForm = false;
                        this.validations.locations[index].city.is_valid = false;
                        this.validations.locations[index].city.text = 'Please enter a city for the new cafe!';
                    } else {
                        this.validations.locations[index].city.is_valid = true;
                        this.validations.locations[index].city.text = '';
                    }

                    // 确保省份字段不为空
                    if (this.locations[index].state.trim() === '') {
                        validNewCafeForm = false;
                        this.validations.locations[index].state.is_valid = false;
                        this.validations.locations[index].state.text = 'Please enter a state for the new cafe!';
                    } else {
                        this.validations.locations[index].state.is_valid = true;
                        this.validations.locations[index].state.text = '';
                    }

                    // 确保邮编字段不为空
                    if (this.locations[index].zip.trim() === '' || !this.locations[index].zip.match(/(^\d{6}$)/)) {
                        validNewCafeForm = false;
                        this.validations.locations[index].zip.is_valid = false;
                        this.validations.locations[index].zip.text = 'Please enter a valid zip code for the new cafe!';
                    } else {
                        this.validations.locations[index].zip.is_valid = true;
                        this.validations.locations[index].zip.text = '';
                    }

                }else{
                    validNewCafeForm = false;
                }              
            }

            // 确保网址是有效的 URL
            if (this.website.trim !== '' && !this.website.match(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/)) {
                validNewCafeForm = false;
                this.validations.website.is_valid = false;
                this.validations.website.text = '请输入有效的网址 URL';
            } else {
                this.validations.website.is_valid = true;
                this.validations.website.text = '';
            }
            
            return validNewCafeForm;
        },
        addLocation() {
            this.locations.push({name: '', address: '', city: '', state: '', zip: '', methodsAvailable: []});
            this.validations.locations.push({
                address: {
                    is_valid: true,
                    text: ''
                },
                city: {
                    is_valid: true,
                    text: ''
                },
                state: {
                    is_valid: true,
                    text: ''
                },
                zip: {
                    is_valid: true,
                    text: ''
                }
            });
        },
        removeLocation(key) {
            this.locations.splice(key, 1);
            this.validations.locations.splice(key, 1);
        },
        clearForm() {
            this.name = '';
            this.locations = [];
            this.website = '';
            this.description = '';
            this.roaster = false;
            this.validations = {
                name: {
                    is_valid: true,
                    text: ''
                },
                locations: [],
                oneLocation: {
                    is_valid: true,
                    text: ''
                },
                website: {
                    is_valid: true,
                    text: ''
                }
            };

            this.addLocation();
        }
    }
}
</script>
<style scoped>
    .form-inner{
        margin: 0 auto;
        max-width: 1200px;
        display: flex;
        flex-wrap: wrap;
    }
    .form-inner.position{
        justify-content: space-between;
    }
    .cell{
        margin-top: 20px;
    }
    .cell.allline{
        width:100%
    }
    .cell.halfline{
        width: 48%;
    }
    input{
        box-sizing: border-box;
        margin-top: 10px;
        padding: 0 5px;
        width: 100%;
        height: 34px;
        font-size: 15px
    }
    .validation{
        color:brown;
        font-size: 14px;
    }
    .brew-method-wrraper{
        display: flex;
        flex-wrap: wrap;
    }
    .brew-method-wrraper>label{
        width:100%;
    }
    .brew-method{
        display: flex;
        align-items: center;
        width: auto;
        margin-right:100px;
    }
    .brew-method>input{
        margin: 0;
        margin-right: 10px;
        width: auto;
    }
    a.button{
        /* display: block; */
        padding: 5px 10px;
        background: #1779ba;
        color: #FFF;
        cursor: pointer;
    }
</style>