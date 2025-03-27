/*function Persona(nome, cognome){
	this.nome = nome;
	this.cognome = cognome;
	this.occhi = 2;
	this.stampaNomeCompleto = function(){
		console.log(`Ciao sono ${this.nome} ${this.cognome} e ho ${this.occhi} occhi`);
	}
}

let marioRossi = new Persona("Mario", "Rossi");
marioRossi.stampaNomeCompleto();
let giuseppeVerdi = new Persona("Giuseppe", "Verdi");
giuseppeVerdi.stampaNomeCompleto();*/

/*function Libro(titolo, autore, annoPubblicazione, genere){
	this.titolo = titolo;
	this.autore = autore;
	this.annoPubblicazione = annoPubblicazione;
	this.genere = genere;
	this.descrizione = function(){
		console.log(`Il libro ${this.titolo} è stato scritto da ${this.autore} 
		ed è stato pubblicato nel ${this.annoPubblicazione} il suo genere è ${this.genere}`);
	}
}

let libro1 = new Libro("L'assassinio di Roger Ackroyd", "Raymond Chandler ", "2010", "Giallo");
libro1.descrizione();
let libro2 = new Libro("Il grande sonno", "Agatha Christie", "2013", "Giallo");
libro2.descrizione();
Libro.prototype.copertina = true;
Libro.prototype.maiuscolo = function(){
	console.log(this.titolo.toUpperCase());
}
console.log(libro1.copertina);
libro2.copertina = false;
console.log(libro2.copertina);
libro1.maiuscolo();
libro2.maiuscolo();
*/

/*class Animale{
	
	constructor(nome){
		this.nome = nome;
	}
	
	verso(){
		console.log(`${this.nome} fa un verso generico`);
	}
	
}

class Cane extends Animale{
	
	constructor(nome){
		super(nome);
	}
	
	verso(){
		console.log(`Sono ${this.nome} e sono un cane e faccio bau bau`);
	}
}

class Uccellino extends Animale{
	
	constructor(nome){
		super(nome);
	}
	
	verso(){
		console.log(`Sono ${this.nome} e sono un uccellino e faccio cip cip`);
	}
}

const animal = new Animale("Animale");
animal.verso();
const dog = new Cane("Rex");
dog.verso();
const bird = new Uccellino("Titty");
bird.verso();
*/

/*class Libro{
	
	constructor (titolo, autore){
		this.titolo = titolo;
		this.autore = autore;
	}
}

class Ebook extends Libro{
	
	constructor (titolo, autore, formato){
		super(titolo, autore);
		this.formato = formato;
	}
}

const e = new Ebook("Il grande sonno", "Agatha Christie", "Ebook");
console.log("Titolo:", e.titolo);
console.log("Autore:", e.autore);
console.log("Formato:", e.formato);
*/

/*class Forma{
	
	constructor (nome){
		this.nome = nome
	}
	
	calcolaArea(){
		console.log("Calcolo dell'area");
	}
}

class Quadrato extends Forma{
	
	constructor (nome){
		super(nome);
	}
	
	calcolaArea(lato1, lato2){
		let result = lato1 * lato2;
		console.log(`L'area del ${this.nome} è: ${result}`);
	}
}

class Triangolo extends Forma{
	
	constructor(nome){
		super(nome);
	}
	
	calcolaArea(base, altezza){
		let result = (base * altezza) / 2;
		console.log(`L'area del ${this.nome} è ${result}`);
	}
}

class Cerchio extends Forma{
	
	constructor(nome){
		super(nome);
	}
	
	calcolaArea(raggio){
		let result = Math.PI * raggio**2;
		console.log(`L'area del ${this.nome} è ${result}`);
	}
}

const square = new Quadrato("Quadrato");
const triangle = new Triangolo("Triangolo");
const circle = new Cerchio("Cerchio");
square.calcolaArea(2,2);
triangle.calcolaArea(10, 20);
circle.calcolaArea(30);
*/

class Account {
	
	constructor (titolare, saldo, log){
		this.titolare = titolare;
		this.saldo = saldo;
		this.log = [];
	}
	
	depositoData(value, data){
		this.saldo += value;
		console.log(`${this.titolare} ha depositato ${value} e il nuovo saldo è ${this.getSaldo()}`);
		this.scriviLogData(this.saldo, "Deposito", data);
	}
	
	deposito(value){
		this.saldo += value;
		console.log(`${this.titolare} ha depositato ${value} e il nuovo saldo è ${this.getSaldo()}`);
		this.scriviLog(this.saldo, "Deposito");
	}
	
	prelievoData(value, data){
		if (this.saldo < value) {
			console.log(`Non puoi prelevare, il tuo saldo: ${this.saldo} è inferiore a ${value}`);
		}
		else
		{
			this.saldo -= value;
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLogData(this.saldo, "Prelievo", data);
		} 
	}
	
	prelievo(value){
		if (this.saldo < value) {
			console.log(`Non puoi prelevare, il tuo saldo: ${this.saldo} è inferiore a ${value}`);
		}
		else
		{
			this.saldo -= value;
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLog(this.saldo, "Prelievo");
		} 
	}
	
	getSaldo(){
		return this.saldo;
	}
	
	getTitolare(){
		return this.titolare;
	}
	
	setSaldo(value, operazione){
		if (operazione == toLowerCase("Deposito")){
			this.saldo += value;
		}
		else{
			this.saldo -= value;
		}
	}
	
	scriviLog(balance, operazione){
		let logger = {
			Saldo: balance,
			Operazione: operazione,
			Data: new Date().toISOString().split('T')[0]
			};
		this.log.push(logger);
	}
		
	scriviLogData(balance, operazione, data){
		let logger = {
			Saldo: balance,
			Operazione: operazione,
			Data: data
			};
		this.log.push(logger);
	}
		
	
	stampaEstrattoConto(){
		/*let result = '';
		for (let elem in this.log){
			result += elem + ': ' + this.log.elem +'; ';
		}
		console.log(result);
		*/
		/*for(let [key, value] of
			Object.entries(this.log)){
				console.log(`${key} : ${value}`);
			}
		*/
		console.table(this.log);
		//console.log(JSON.stringify(this.log));
	}
}

class ContoCorrente extends Account{
	
	constructor (titolare, saldo, limitePrelievi){
		super(titolare, saldo);
		this.limitePrelievi = limitePrelievi;
	}
	

	prelievo(value){
		
		if (this.getSaldo() < value){
			console.log("Non puoi prelevare il tuo saldo è insufficiente");
		}
		if (this.getlimitePrelievi() <= 0){
			console.log("Non puoi prelevare hai superato il limite");
		}
		else{
			this.saldo -= value;
			this.riducilimitePrelievi();
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLog(this.saldo, "Prelievo");
		}
	}
	
	prelievoData(value, data){
		
		if (this.getSaldo() < value){
			console.log("Non puoi prelevare il tuo saldo è insufficiente");
		}
		if (this.getlimitePrelievi() <= 0){
			console.log("Non puoi prelevare hai superato il limite");
		}
		else{
			this.saldo -= value;
			this.riducilimitePrelievi();
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLog(this.saldo, "Prelievo", data);
		}
	}
	
	calcolaNumRecord(data){
		
	}
	
	getlimitePrelievi(){
		return this.limitePrelievi;
	}
	
	riducilimitePrelievi(){
		this.limitePrelievi --;
	}
}

class ContoRisparmio extends Account{
	
	constructor(titolare, saldo, tassoInteresse){
		super(titolare, saldo);
		this.tassoInteresse = tassoInteresse;
	}
	
	calcolaInteresse(giorni){
		let result = (this.saldo * this.tassoInteresse * giorni)/36500;
		result = Math.round(result * 100) / 100;
		this.saldo += result;
		console.log(`Interessi maturati: ${result}, in ${giorni} giorni con un tasso di interesse del ${this.tassoInteresse}%, il nuovo saldo è: ${this.getSaldo()}`);
		this.scriviLog(this.saldo, "Interesse maturato");
	}
}
const data = new Date(2025, 2, 25).toISOString().split('T')[0];
const account = new Account("Peppino", 0);
account.depositoData(2000, data);
account.prelievoData(200, data);
account.deposito(2000);
account.prelievo(200);
account.stampaEstrattoConto();
const cc = new ContoCorrente("Antonio", 0, 3);
cc.depositoData(3000, data);
cc.prelievoData(200, data);
cc.prelievo(400);
cc.prelievo(400);
cc.prelievo(400);
cc.stampaEstrattoConto();
/*const cr = new ContoRisparmio("Mario", 0, 2);
cr.deposito(2000);
cr.calcolaInteresse(20);
cr.stampaEstrattoConto();
*/