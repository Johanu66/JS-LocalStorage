import { Card } from "../models/card.js";
import { Memory } from "../models/memory.js";
import { Notifier } from "../patterns/notifier.js";

export class ControllerMemory extends Notifier
{

    #memory;
    #card1;
    #card2;
    #win;

    constructor()
    {
        super();
        this.#memory = new Memory();
        this.#card1 = null;
        this.#card2 = null;
        this.#win = false;
    }

    get memory(){
        return this.#memory;
    }

    get win(){
        return this.#win;
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
            this.memory.fromData(JSON.parse(localStorage.getItem("memory")));
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

    showCard(index){
        let card = null;

        //Pour ne pas permetre de tourner d'autres cartes si 2 cartes sont déjà retournées et sont en cours de comparaison
        if(this.#card2 == null){
            card = this.memory.showCard(index);
        }

        // Pour ne rien faire si la carte est déjà retournée
        if(card != null){
            if(this.#card1 == null){
                this.#card1 = card;
            } else if(this.#card2 == null){
                this.#card2 = card;
                this.checkCards();
            }
            this.notify();
            this.saveGame();
        }
    }

    checkCards(){
        if(this.#card1 != null && this.#card2 != null){
            if(this.#card1.value == this.#card2.value){
                setTimeout(() => {
                    this.#card1 = null;
                    this.#card2 = null;
                    //Vérifier si toutes les cartes sont retournées
                    let allCardsShown = true;
                    for(let card of this.#memory.cards){
                        if(card.faceHidden){
                            allCardsShown = false;
                            break;
                        }
                    }
                    if(allCardsShown){
                        this.#win = true;
                        setTimeout(() => {
                            this.#win = false;
                            this.newGame();
                            this.notify();
                            this.saveGame();
                        }, 2000);
                        this.notify();
                        this.saveGame();
                    }
                }, 1000);
                this.notify();
                this.saveGame();
            } else {
                setTimeout(() => {
                    this.#card1.hide();
                    this.#card2.hide();
                    this.#card1 = null;
                    this.#card2 = null;
                    this.notify();
                    this.saveGame();
                }, 1500);
            }
        }
    }

    current_card(){
        return this.#card2 ? this.#card2 : this.#card1;
    }
}