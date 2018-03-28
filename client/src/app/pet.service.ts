import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

@Injectable()
export class PetService {

  constructor(private _http: Http) { }

addNewPet(newPet, skills){
	return this._http.post('/pets/add', newPet, skills);
}
allPets(){
	return this._http.get('/pets')
}
getOnePet(id){
	return this._http.get('/pets/'+id)
}
editPet(id, pet){
	return this._http.patch('/pets/edit/'+id)
}
deletePet(id){
	console.log(id+'delete on the pet service ran.')
	return this._http.delete('pets/'+id)
}
}






