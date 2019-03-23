// task 1
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let originalFunc = descriptor.value;
    descriptor.value = function() {
        let origResult = originalFunc.apply(this);
        origResult.date = new Date().getDate() + '.0' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear();
        origResult.info = origResult.name + ' - $' + origResult.price;
        return origResult;
    }
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
console.log(item.getItemInfo());

// task2
function addUserInfo(type: string) {
    return function <T extends {new(...args:any[]):{}}>(constructor:T) {
        return class extends constructor {
            public type: string = type;
            public createDate: string = new Date().getDate() + '.0' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
        }
    }
}

@addUserInfo('user')
class User {
    public name: string;
    public age: number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
}

let user: any = new User('Alexandr', 23);
console.log(user.type)

// task 3
namespace USA {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }
    
    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url'
        public getNews() {} // method
    }
    
}

namespace Ukraine {
    export interface INews {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }
    
    export class NewsService {
        protected apiurl: string = 'https://news_api_2_url';
        public getNews() {}; // method get all news
        public addToFavorite() {}; // method add to favorites
    }
}

// task 4
class Junior {
    public doTasks() {
        console.log('Actions!!!');
    }
}

class Middle {
    public createApp() {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle {
    public doTasks: () => void;
    public createApp: () => void;
    public createArchitecture() {
        console.log('Mixin!!!')
    };
}

applyMixins(Senior, [Junior, Middle]);

function applyMixins(targetClass: any, baseClasses: any[]) {
    baseClasses.forEach(baseClass => 
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name =>
            targetClass.prototype[name] = baseClass.prototype[name])
    )
}

let senior = new Senior();
console.log(senior);



