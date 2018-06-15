//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
import {Resources} from "./Resources.js"

class ResourceLoader {	 
	constructor() {
		this.map = new Map(Resources);
		for(let[key,value] of this.map){
			const image = new Image();
			image.src = value;
			this.map.set(key,image);
		}
	}
	
	onloaded(callback) {
		let loadedCount = 0; //用一个变量loadedCount记录所有的图片加载完毕
		for (let value of this.map.values()){
			value.onload = () => { //箭头函数
				loadedCount++;
				if (loadedCount >= this.map.size) {
					callback(this.map);
				}				
			}
		}
	}
	static create() {
		return new ResourceLoader();
	}
}

export {ResourceLoader}
