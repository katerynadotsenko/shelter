import data from '../../js/pets-mock.js';

export default class PetsGeneratedData {
    constructor() {
        this.data = data;
    }

    shuffle() {
        let j, temp;
        for (var i = this.data.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = this.data[j];
            this.data[j] = this.data[i];
            this.data[i] = temp;
        }
        return this.data;
    }

    generatePetsData() {
        let generatePetsArray = [];
        for (let i = 1; i <= 6; i++) {
            generatePetsArray.push(...this.shuffle());
        }
        console.log("generatePetsArray - ", generatePetsArray);
        return generatePetsArray;
    }
}