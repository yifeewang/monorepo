// 这里引入的是 mobx
import {observable, computed, action, makeObservable} from 'mobx';

class MastSotre {

    constructor() {
        // 必须添加 makeObservable， 否则视图不更新
        makeObservable(this)
        this.list = [
            {
                name: '跑步',
                hasDone: false,
                id: 0
            },
            {
                name: '游泳',
                hasDone: false,
                id: 1
            },
            {
                name: '看书',
                hasDone: false,
                id: 2
            }
        ]
    }
    @observable list; 

    @computed
    get getDoneList () {
        return this.list.filter(v => v.hasDone)
    }

    @computed
    get getListLength () {
        return this.list.length
    }

    @action
    addList = name => this.list.push({
        name,
        id: this.getListLength,
        hasDone: false
    })

    @action
    setList = id => this.list[id].hasDone = !this.list[id].hasDone
}
const mast = new MastSotre() 
export default mast