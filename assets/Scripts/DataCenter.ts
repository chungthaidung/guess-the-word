import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataCenter')
export class DataCenter extends Component {
    public inIt(){
        localStorage.setItem('highestLevel', '-1');
        localStorage.setItem('score', '0');
    }
    public SaveLocal(key, value) {
        localStorage.setItem(key, value);
    }

    public GetLocal(key) {
        return localStorage.getItem(key);
    }
}


