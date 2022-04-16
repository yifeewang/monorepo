import {observable, action, makeObservable} from 'mobx';

class TestStore {

    constructor() {
        // 必须添加 makeObservable， 否则视图不更新
        makeObservable(this)
        this.name = '浮云先生'
        this.age = 25
    }
    @observable name; 
    @observable age;

    @action 
    changeAge = i => {
        this.age = this.age + Number(i)
    }
}
const test = new TestStore() 
export default test