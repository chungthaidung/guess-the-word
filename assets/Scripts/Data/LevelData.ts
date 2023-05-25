import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelData')

export class LevelData extends Component {

    private _levelList: Level[] = [];


    public LevelInit(){
        this._levelList[this._levelList.length] = new Level('Image/baocao','baocao');  
        this._levelList[this._levelList.length] = new Level('Image/cadao','cadao');  
        this._levelList[this._levelList.length] = new Level('Image/bahoa','bahoa');  
        this._levelList[this._levelList.length] = new Level('Image/cungcau','cungcau');  
        this._levelList[this._levelList.length] = new Level('Image/khaucung','khaucung');  
        this._levelList[this._levelList.length] = new Level('Image/hoahau','hoahau');  
    }
    public get LevelList(){
        return this._levelList;
    }
}
class Level {
    private _imageUrl : string;
    private _result : string;
    constructor(url: string, result: string) {
        this._imageUrl = url;
        this._result = result;
    }
    public get ImageUrl(){
        return this._imageUrl;
    }
    public get Result(){
        return this._result;
    }
}