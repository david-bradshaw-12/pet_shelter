import { Component, OnInit } from '@angular/core';
import { PetService } from '../../pet.service';
import { ActivatedRoute, Router, Params }            from '@angular/router';
// import { AppComponent } from '../'

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
	allPets = [];

  constructor(
  	private _petService: PetService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.showAllPets();
  }
showAllPets(){
	let observable = this._petService.allPets();
	observable.subscribe( (data) =>{
		// console.log(data);
		 this.allPets = data.json().data;
	})
// }
// editPet(id){
// 	this._router.navigate(['/show'+id]);
// }
// detailPet(id){
// 	this._router.navigate(['/show'+id]);
// }
}
