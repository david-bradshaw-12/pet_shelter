import { Component, OnInit } from '@angular/core';
import { PetService }     from '../../pet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	currentPet = {};
	skills = {
		skill1: '',
		skill2: '',
		skill3: ''
	}

  constructor(
  	private _petService: PetService,
    private _router: Router,
    private _route: ActivatedRoute
  	) { }

  ngOnInit() {
  	this.thisPet();
  }
    goHomeYoureDrunk() {
    this._router.navigate(['/show']);
  }
  thisPet(){
  	this._route.params.subscribe((params: Params) => {
	console.log(params['id']);
  	let observable = this._petService.getOnePet(params['id']);
	observable.subscribe( (data) => {
		console.log(observable);
		this.currentPet = data.json().data;
  		});
	});
};
updatePet($event){
	$event.preventDefault();
  	let observable = this._petService.editPet(this.currentPet);
  	observable.subscribe( (err) =>{
  		console.log(err);
  	});
	console.log('updatePet() ran.');
    this.currentPet = {
    	name: '',
    	type: '',
    	description: ''
    };
 	setTimeout( () =>{ 
 		this.goHomeYoureDrunk();
 		 },
 		 2000);

}
  /////////////////////////////////

