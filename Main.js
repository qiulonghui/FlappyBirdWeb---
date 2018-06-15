//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

class Main {
	constructor() {
		//console.log('我执行啦');
		this.canvas = document.getElementById('game_canvas');
		this.ctx = this.canvas.getContext('2d');
		this.dataStore = DataStore.getInstance();
		this.director = Director.getInstance();
		const loader = ResourceLoader.create();
		loader.onloaded(map => this.onResourceFirstLoaded(map));
		
	}
	
	onResourceFirstLoaded(map) {
		this.dataStore.canvas = this.canvas;
		this.dataStore.ctx = this.ctx;
		this.dataStore.res = map;
		this.init();
	}
	
	init() {
		
		//首先重置游戏是没有结束的
		this.director.isGameOver = false;
		//精灵对象统一put到资源管理器中，方便其他类调用
		this.dataStore
				.put('pencils', [])
				.put('background',BackGround)
				.put('land',Land)
				.put('birds',Birds)
				.put('score',Score)
				.put('startButton', StartButton);
		
		//注册事件
		this.registerEvent();
		
		//在游戏逻辑运行前创建铅笔		      
		this.director.createPencil();		
		this.director.run();						
	}
	
	registerEvent() {
		this.canvas.addEventListener('touchstart',e => {
			//阻止事件冒泡
			e.preventDefault();
			if(this.director.isGameOver){
				console.log('游戏开始');
				this.init();
			}else{
				this.director.birdsEvent();
			}
		})
	}
	
}

export {Main}
