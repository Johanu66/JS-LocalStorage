import { Card } from "../models/card.js";
import { Memory } from "../models/memory.js";
import { Notifier } from "../patterns/notifier.js";

export class ControllerMemory extends Notifier
{

    #memory;

    constructor()
    {
        super();
        this.#memory = new Memory();
    }

    get memory(){
        return this.#memory;
    }

    newGame(){
        this.memory.newGame(10);
        this.notify();
        this.saveGame();
    }

    saveGame(){
        sessionStorage.setItem("memory",  JSON.stringify(this.memory.toData()));
    }

    loadGame(){
        try{
            this.memory.formData(JSON.parse(localStorage.getItem("memory")));
            this.notify();
            return true;
        } catch (e){
            return false;
        }
    }

    start(){
        if(!this.loadGame()){
            this.newGame();
        }
    }
}