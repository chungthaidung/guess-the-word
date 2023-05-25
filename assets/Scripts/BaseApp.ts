import { _decorator, Component, Node, game, director, Prefab } from 'cc';
import { CONFIG } from './Data/constant';
import { LevelData } from './Data/LevelData';
import { DataCenter } from './DataCenter';
import { BoardController } from './MVC/BoardController';
import { InItPool } from './Utils/PrefabPool';
const { ccclass, property } = _decorator;

@ccclass('BaseApp')
export class BaseApp extends Component {
    @property({type: Prefab, visible: true})
    public LetterButton: Prefab;

    public static Instance: BaseApp = null;
    private _dataCenter: DataCenter = null;
    private _levelData: LevelData = null;
    onLoad(){
        BaseApp.Instance = this;
    } 

    public get DataCenter() : DataCenter {
        return this._dataCenter;
    }

    public get LevelData(): LevelData{
        return this._levelData;
    }

    start() {
        game.addPersistRootNode(this.node);
        this._dataCenter = new DataCenter();
        this._dataCenter.inIt();
        this._levelData = new LevelData();
        this._levelData.LevelInit();
        InItPool(this.LetterButton,CONFIG.CHAR_AMOUNT);
        director.loadScene('menu');
    }
}


