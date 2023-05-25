import { _decorator, Component, Node, instantiate } from 'cc';
import { BaseApp } from '../BaseApp';
import { ALPHABET, CONFIG } from '../Data/constant';
import { LButton } from '../Letter/LButton';
import { Letter } from '../Letter/Letter';
import { NoticeMenuManager } from '../NoticeMenuManager';
import { GetFromPool, ReturnToPool } from '../Utils/PrefabPool';
import { BoardModel } from './BoardModel';
const { ccclass, property } = _decorator;

@ccclass('BoardController')
export class BoardController extends Component {
    public static Instance: BoardController = null;
    private _boardModel: BoardModel | null = null;
    private _chosenLetters: number[];
    private _listLetters: Letter[];
    private _fillNum: number;
    private _level: number;
    private _disableBoard: boolean;
    start() {
        this._boardModel = this.getComponent(BoardModel);
        this._disableBoard = false;
        this.firstInIt();

        this.LoadLevel(this._level ? this._level : 0);
    }
    public set Level(lvl: number) {
        this._level = lvl;
        console.log(this._level);
    }
    onLoad() {
        this._boardModel = this.getComponent(BoardModel);
        BoardController.Instance = this;
    }

    public get DisableBoard(){
        return this._disableBoard;
    }
    public set DisableBoard(bool: boolean){
        this._disableBoard = bool;
    }
    public get BoardModel() {
        return this._boardModel;
    }

    public firstInIt() {
        this._listLetters = [];
        for (let i = 0; i < CONFIG.CHAR_AMOUNT; i++) {
            this._listLetters[i] = new Letter(i);
        }
    }

    public SplitChar(input: string) {
        let output = input.split("");
        return output;
    }

    public LoadLevel(level: number) {
        this.PreloadLevel();
        let lvlData = BaseApp.Instance.LevelData.LevelList[level];
        let result = this.SplitChar(lvlData.Result);
        for (let i = 0; i < result.length; i++) {
            this._chosenLetters[i] = -1;
        }
        let newarr = this.GenerateLetter([...result]);
        let button = GetFromPool(BaseApp.Instance.LetterButton).getComponent(LButton);
        for (let i = 0; i < this._listLetters.length; i++) {
            button.setLButton(newarr[i], i);
            this._listLetters[i].SetLetterButton(button, newarr[i]);
            button = GetFromPool(BaseApp.Instance.LetterButton).getComponent(LButton);
        }

        this._boardModel?.SetCurrentLevel(level, lvlData.ImageUrl, this._listLetters, result);
    }

    public GetRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    public SwapPos(arr: string[], x: number, y: number) {
        let temp = arr[x];
        arr[x] = arr[y];
        arr[y] = temp;
        return arr;
    }

    public GenerateLetter(result: string[]) {
        for (let i = result.length; i < CONFIG.CHAR_AMOUNT; i++) {
            result[i] = ALPHABET[this.GetRandomInt(ALPHABET.length - 1)];
        }

        let randPos = 0;
        for (let i = result.length - 1; i > 0; i--) {
            randPos = this.GetRandomInt(i);
            while (randPos == i) {
                randPos = this.GetRandomInt(i);
            }
            this.SwapPos(result, i, randPos);
        }
        return result;
    }

    public GetEmptyResultIndex() {
        for (let i = 0; i < this._chosenLetters.length; i++) {
            if (this._chosenLetters[i] == -1) return i;
        }
        return -1
    }

    public UpdateBoardOnClick(index: number) {
        if (!this._disableBoard)
        {
            if (!this._listLetters[index].IsResult) {
                let resultIndex = this.GetEmptyResultIndex();
                if (resultIndex > -1) {
                    this._listLetters[index].IsResult = true;
                    this._boardModel.UpdateLetterToResult(this._listLetters, index, resultIndex);
                    this._disableBoard = true;
                    this._chosenLetters[resultIndex] = index;
                    this._fillNum += 1;
                    if (this._fillNum == this._boardModel.Result.length) {
                        if (this.CheckResult()) {
                            console.log('YOU WIN');
                            this.ShowNotice();
                        } else {
                            console.log('NOOOO');
                        }
                    }
                }
            } else {
                this._listLetters[index].IsResult = false;
                for (let i = 0; i < this._chosenLetters.length; i++) {
                    if (this._chosenLetters[i] == index) {
                        this._fillNum -= 1;
                        this._chosenLetters[i] = -1;
                        this._boardModel.UpdateLetterToList(this._listLetters, index, i);
                        this._disableBoard = true;

                        break;
                    }
                }
            }
        }
        
    }

    public ShowNotice() {
        let notice = this.node.parent.getComponentInChildren(NoticeMenuManager);
        notice.node.active = true;
        if (this._boardModel.CurrentLevel > Number(BaseApp.Instance.DataCenter.GetLocal('highestLevel'))) {
            BaseApp.Instance.DataCenter.SaveLocal('highestLevel', this._boardModel.CurrentLevel);
        }
    }
    public CheckResult() {
        if (this._fillNum < this._boardModel.Result.length) return;
        let lvlresult = this._boardModel.Result;
        for (let i = 0; i < lvlresult.length; i++) {
            if (lvlresult[i] != this._listLetters[this._chosenLetters[i]].Letter) {
                return false;
            }
        }
        return true;
    }

    public PreloadLevel() {
        for (let i = 0; i < this._listLetters.length; i++) {
            if (this._listLetters[i].LetterButton != null) {
                // this._listLetters[i].IsResult = false;
                this._listLetters[i].ResetLetter();
                ReturnToPool(this._listLetters[i].LetterButton.node);
                this._listLetters[i].SetLetterButton(null, null);
            }
        }
        this._chosenLetters = [];
        this._fillNum = 0;
        this._boardModel.PreloadLevel();
    }
}


