class Account {
	
	constructor (titolare, saldo){
		this.titolare = titolare;
		this.saldo = saldo;
		this.log = [];
	}
	
	depositoData(value, data){
		this.setSaldo(value, "Deposito");
		console.log(`${this.titolare} ha depositato ${value} e il nuovo saldo è ${this.getSaldo()}`);
		this.scriviLogData(this.saldo, "Deposito", value, data);
	}
	
	deposito(value){
		this.setSaldo(value, "Deposito");
		console.log(`${this.titolare} ha depositato ${value} e il nuovo saldo è ${this.getSaldo()}`);
		this.scriviLog(this.saldo, "Deposito", value);
	}
	
	prelievoData(value, data){
		if (this.saldo < value) {
			console.log(`Non puoi prelevare, il tuo saldo: ${this.saldo} è inferiore a ${value}`);
		}
		else{
			this.setSaldo(value, "Prelievo");
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLogData(this.saldo, "Prelievo", value, data);
		} 
	}
	
	prelievo(value){
		if (this.saldo < value) {
			console.log(`Non puoi prelevare, il tuo saldo: ${this.saldo} è inferiore a ${value}`);
		}
		else{
			this.setSaldo(value, "Prelievo");
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLog(this.saldo, "Prelievo", value);
		} 
	}
	
	getSaldo(){
		return this.saldo;
	}
	
	getTitolare(){
		return this.titolare;
	}
	
	setSaldo(value, operazione){
		if (operazione == "Deposito" || operazione == 'Interesse'){
			this.saldo += value;
		}
		else{
			this.saldo -= value;
		}
	}
	
	scriviLog(balance, operazione, value){
		this.log.push({
			Saldo: balance,
			Operazione: operazione,
			Importo: value,
			Data_Operazione: new Date().toISOString().split('T')[0] //utilizzo split per recuperare solo la data in formato ISO
			});
	}
		
	scriviLogData(balance, operazione, value, data){
		this.log.push({
			Saldo: balance,
			Operazione: operazione,
			Importo: value,
			Data_Operazione: data //la data viene giù passata in formato iso
			});
	}
		
	
	stampaEstrattoConto(){
		console.table(this.log);
	}
}

class ContoCorrente extends Account{
	
	constructor (titolare, saldo, limitePrelievi){
		super(titolare, saldo);
		this.limitePrelievi = limitePrelievi;
		this.limitePrelieviIniziale = limitePrelievi;
        this.ultimaDataPrelievo = null; //utilizzo questa variabile per resettare il limite giornaliero
	}

	aggiornaLimiteGiornaliero(data) {
        if (this.ultimaDataPrelievo !== data) {
			this.setLimitiPrelivo(this.getLimitePrelieviIniziale());
			this.setUltimaDataPrelievo(data);
            //this.limitePrelievi = this.getLimitePrelieviIniziale();
            //this.ultimaDataPrelievo = data;
        }
    }
	
	prelievo(value){
		this.aggiornaLimiteGiornaliero(new Date().toISOString().split('T')[0]);
		if (this.getSaldo() < value){
			console.log("Non puoi prelevare il tuo saldo è insufficiente");
		}
		else if ((this.calcolaTotPrelievi() + value) > this.getlimitePrelievi()){
			console.log(`Non puoi prelevare ${value} hai superato il limite giornaliero di ${this.getLimitePrelieviIniziale()} puoi prelevare ${this.getlimitePrelievi() - this.calcolaTotPrelievi()}`);
		}
		else{
			this.setSaldo(value, "Prelievo");
			this.riducilimitePrelievi(value);
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLog(this.saldo, "Prelievo", value);
		}
	}
	
	prelievoData(value, data){
		this.aggiornaLimiteGiornaliero(data);
		if (this.getSaldo() < value){
			console.log("Non puoi prelevare il tuo saldo è insufficiente");
		}
		else if ((this.calcolaTotPrelieviData(data) + value) > this.getlimitePrelievi()){
			console.log(`Non puoi prelevare ${value} hai superato il limite giornaliero di ${this.getLimitePrelieviIniziale()} puoi prelevare ${this.getlimitePrelievi() - this.calcolaTotPrelieviData(data)}`);
		}
		else{
			this.setSaldo(value, "Prelievo");
			this.riducilimitePrelievi(value);
			console.log(`${this.titolare} ha prelevato ${value} e il nuovo saldo è ${this.getSaldo()}`);
			this.scriviLogData(this.saldo, "Prelievo", value, data);
		}
	}
	
	calcolaTotPrelievi(){
		return this.log.filter((log) => log.Operazione == 'Prelievo' && log.Data_Operazione == new Date().toISOString().split('T')[0]) //filtro il log in base all'operazione di tipo Prelievo e in base alla data di oggi
		.reduce((sommaImporti, log) => sommaImporti + log.Importo, 0); //utilizzo la funzione reduce per calcolarmi dal filtro precedente la somma degli importi
	}
	
	calcolaTotPrelieviData(data){
		return this.log.filter((log) => log.Operazione == 'Prelievo' && log.Data_Operazione == data) //filtro il log in base all'operazione di tipo Prelievo e in base alla data passata in input
		.reduce((sommaImporti, log) => sommaImporti + log.Importo, 0); //utilizzo la funzione reduce per calcolarmi dal filtro precedente la somma degli importi
	}

	getlimitePrelievi(){
		return this.limitePrelievi;
	}
	
	riducilimitePrelievi(value){
		this.limitePrelievi -= value;
	}

	getLimitePrelieviIniziale(){
		return this.limitePrelieviIniziale;
	}

	setLimitiPrelivo(value){
		this.limitePrelievi = value;
	}

	setUltimaDataPrelievo(data){
		this.ultimaDataPrelievo = data;
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
		this.setSaldo(result, "Interesse");
		console.log(`Interessi maturati: ${result}, in ${giorni} giorni con un tasso di interesse del ${this.tassoInteresse}%, il nuovo saldo è: ${this.getSaldo()}`);
		this.scriviLog(this.saldo, "Interesse maturato", result);
	}
}


const data = new Date(2025, 2, 25).toISOString().split('T')[0];
const account = new Account("Luca", 0);
account.depositoData(2000, data);
account.prelievoData(200, data);
account.prelievo(400);
account.stampaEstrattoConto();
const cc = new ContoCorrente("Antonio", 0, 500);
cc.depositoData(3000, data);
cc.prelievoData(500, data);
cc.prelievoData(50, data);
cc.prelievo(50);
cc.prelievo(50);
cc.prelievo(700);
cc.prelievo(300);
cc.stampaEstrattoConto();
const cr = new ContoRisparmio("Mario", 0, 2); //interesse del 2%
cr.deposito(2000);
cr.calcolaInteresse(20); //20 giorni maturati
cr.stampaEstrattoConto();