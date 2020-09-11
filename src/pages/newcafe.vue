<template>
    <div class="page">
        <form>
            <div class="form-inner">
                <div class="cell">
                    <label>
                        Name:
                        <input type="text" placeholder="咖啡店名" v-model="name">
                        <span class="validation" v-show="!validations.name.is_valid">{{ validations.name.text }}</span>
                    </label>
                </div>
                <div class="cell">
                    <label>
                        Address:
                        <input type="text" placeholder="地址" v-model="address">
                        <span class="validation" v-show="!validations.address.is_valid">{{ validations.address.text }}</span>
                    </label>
                </div>
                <div class="cell">
                    <label>
                        City:
                        <input type="text" placeholder="城市" v-model="city">
                        <span class="validation" v-show="!validations.city.is_valid">{{ validations.city.text }}</span>
                    </label>
                </div>
                <div class="cell">
                    <label>
                        State:
                        <input type="text" placeholder="省份" v-model="state">
                        <span class="validation" v-show="!validations.state.is_valid">{{ validations.state.text }}</span>
                    </label>
                </div>
                <div class="cell">
                    <label>
                        Zip:
                        <input type="text" placeholder="邮编" v-model="zip">
                        <span class="validation" v-show="!validations.zip.is_valid">{{ validations.zip.text }}</span>
                    </label>
                </div>
                <div class="cell">
                    <button class="button" @click="submitNewCafe">提交</button>
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
            address: '',
            city: '',
            state: '',
            zip: '',
            validations: {
                name: {
                    is_valid: true,
                    text: ''
                },
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
            }
        }
    },
    methods: {
        submitNewCafe () {
            if(this.validateNewCafe()){
                this.$store.dispatch('addCafe', {
                    name: this.name,
                    address: this.address,
                    city: this.city,
                    state: this.state,
                    zip: this.zip
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

            // 确保 address 字段不为空
            if( this.address.trim() === '' ){
                validNewCafeForm = false;
                this.validations.address.is_valid = false;
                this.validations.address.text = '请输入咖啡店的地址!';
            }else{
                this.validations.address.is_valid = true;
                this.validations.address.text = '';
            }

            //  确保 city 字段不为空
            if( this.city.trim() === '' ){
                validNewCafeForm = false;
                this.validations.city.is_valid = false;
                this.validations.city.text = '请输入咖啡店所在城市!';
            }else{
                this.validations.city.is_valid = true;
                this.validations.city.text = '';
            }

            //  确保 state 字段不为空
            if( this.state.trim() === '' ){
                validNewCafeForm = false;
                this.validations.state.is_valid = false;
                this.validations.state.text = '请输入咖啡店所在省份!';
            }else{
                this.validations.state.is_valid = true;
                this.validations.state.text = '';
            }

            // 确保 zip 字段不为空且格式正确
            if( this.zip.trim() === '' || !this.zip.match(/(^\d{6}$)/) ){
                validNewCafeForm = false;
                this.validations.zip.is_valid = false;
                this.validations.zip.text = '请输入有效的邮编地址!';
            }else{
                this.validations.zip.is_valid = true;
                this.validations.zip.text = '';
            }

            return validNewCafeForm;
        }
    }
}
</script>
<style scoped>
    .form-inner{
        margin: 0 auto;
        max-width: 1200px;
    }
    .cell{
        margin-top: 20px;
        width:100%;
    }
    input{
        box-sizing: border-box;
        margin-top: 10px;
        padding: 0 5px;
        width: 100%;
        height: 34px;
        font-size: 15px
    }
</style>