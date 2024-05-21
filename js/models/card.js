export class Card{
    #value;
    #faceHidden;

    constructor(value, faceHidden = true){
        this.#value = value;
        this.#faceHidden = faceHidden;
    }

    get value(){
        return this.#value;
    }

    get faceHidden(){
        return this.#faceHidden;
    }

    show(){
        this.#faceHidden = false;
    }

    hide(){
        this.#faceHidden = true;
    }

    toData(){
        return { value: this.value, faceHidden: this.faceHidden };
    }
}