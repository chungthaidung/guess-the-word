import { _decorator, Component, Node, game, director } from 'cc';
import { BaseApp } from './BaseApp';
import { BoardController } from './MVC/BoardController';
const { ccclass, property } = _decorator;

@ccclass('MainMenuManager')
export class MainMenuManager extends Component {
    @property({ type: Node, visible: true })
    private _loadButton: Node;
    onLoad() {
        if (Number(BaseApp.Instance.DataCenter.GetLocal('highestLevel')) < 0) {
            this._loadButton.active = false;
        }
    }
    public StartGame() {
        director.loadScene('main', () => {
            BoardController.Instance.Level = 0;
        });
    }
    public LoadGame() {
        let highestLevel = Number(BaseApp.Instance.DataCenter.GetLocal('highestLevel'))

        if (highestLevel + 1 < BaseApp.Instance.LevelData.LevelList.length) {
            director.loadScene('main', () => {
                BoardController.Instance.Level = Number(BaseApp.Instance.DataCenter.GetLocal('highestLevel')) + 1;
            });
        } else {
            console.log("NO MORE LEVEL");
        }

    }
}


