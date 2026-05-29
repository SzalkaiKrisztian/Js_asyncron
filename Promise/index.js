
class Vendor{
    #itemList;

    #noItemCallback

    #itemCallback;

    set noItemCallback(value){
        this.#itemCallback=value
    }

    set itemCallback(value){
        this.#itemCallback=value
    }

    constructor(itemList){
        this.#itemList=itemList
    }

    sellSomething(){
        if(this.#itemList===0){
            this.#noItemCallback('Nincs elasni valo termek')
        }else{
            this.#itemCallback(this.#itemCallback.pop())
        }
    }

    sellSomethingPromise(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(this.#itemList.length===0){
                    reject('Nincs eladni valo termek')
                }else{
                    resolve(this.#itemList.pop())
                }
            },1000)
        })
    }
}

class Client{
    /**
     * @type {Vendor}
     */
    #vendor;

    /**
     * 
     * @param {Vendor} vendor 
     */
    constructor(vendor){
        this.#vendor=vendor
        this.#vendor.noItemCallback=(message)=>{
            console.log(`A kliens nem vett semmit mert: ${message}`)
        }
        this.#vendor.itemCallback=(item)=>{
            console.log(`A kliens vett egy ${item}`)
        }
    }

    buyFromSeller(){
        this.#vendor.sellSomething()
    }

    buyFromSellerPromise(){
        this.#vendor.sellSomethingPromise()
        .then((item)=>{
            console.log(`A kliens vett egy ${item}`)
        })
        .catch((reason)=>{
            console.log(`A kliens nem vett semmit mert: ${reason}`)
        })
        .finally(()=>{
            console.log('vege van')
        })
    }
}

const vendor= new Vendor(['alma'])
const client = new Client(vendor)
client.buyFromSeller();