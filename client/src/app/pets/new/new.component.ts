import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../../pet.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newPet = {
		name: '',
		type: '',
		description: ''
	};
	skills = {
		skill1: '',
		skill2: '',
		skill3: ''
	};

  constructor(
  	private _petService: PetService,
    private _router: Router,
    private _route: ActivatedRoute,
  	) {
  	// newPet = new newPet;
   }

  ngOnInit() {
  }
  addPet($event){
  	$event.preventDefault();
  	let observable = this._petService.addNewPet(this.newPet, this.skills);
  	observable.subscribe( (res) =>{
  		console.log(res);
  	});
	console.log('addPet() ran.');
    this.newPet = {
    	name: '',
		type: '',
		description: ''
  		};
  	setTimeout( () =>{ 
	 		this.goHome();
	 		 },
	 		 2000);
  }

  goHome() {
    this._router.navigate(['/show']);
  }

}

