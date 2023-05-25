import { _decorator, Component, Node, director } from 'cc';
import { BaseApp } from './BaseApp';
import { LevelData } from './Data/LevelData';
import { BoardController } from './MVC/BoardController';
const { ccclass, property } = _decorator;

@ccclass('NoticeMenuManager')
export class NoticeMenuManager extends Component {

    public OnClickNextLevel(){
        console.log(BoardController.Instance?.BoardModel.CurrentLevel);
        if (BoardController.Instance?.BoardModel.CurrentLevel < BaseApp.Instance.LevelData.LevelList.length -1 ){
            BoardController.Instance.LoadLevel(BoardController.Instance?.BoardModel.CurrentLevel + 1);
            this.node.active = false;
        } else {
            console.log('LAST LEVEL');
        }
    }

    public OnClickBack(){
        director.loadScene('menu');
    }
}


