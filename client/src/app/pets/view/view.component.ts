import { Component, OnInit } from '@angular/core';
import { PetService }     from '../../pet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
	currentPet = {};

  constructor(
  	private _petService: PetService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.thisPet();
  }
    thisPet(){
  	this._route.params.subscribe((params: Params) => {
	console.log(params['id']);
  	let observable = this._petService.getOnePet(params['id']);
	observable.subscribe( (data) => {
		// console.log(observable);
		this.currentPet = data.json().data;
  		});
	});
};
	adoptPet($event, id){
		// console.log(id);
		let observable = this._petService.deletePet(id);
		observable.subscribe( (data) =>{
			console.log(data);
		});
		this.goHome();
	setTimeout( () =>{ 
	 		this.goHome();
	 		 },
	 		 2000);
	}
	goHome() {
    this._router.navigate(['/show']);
  }

}


