import { Component,OnInit} from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit{
  pokemons:any[]=[];



  constructor(
    private dataService: DataService
  ){}

  ngOnInit(): void {

  }
  

 typesPoke(typeSelect:any):void{
    this.pokemons=[]
    
    /* let asBox=this.box.nativeElement */
    this.dataService.getPokemons()
    .subscribe((response:any)=>{
      /* this.totalPokemons=response.count; */

      response.results.forEach((result: { name: string; }) => {
        this.dataService.getMoreData(result.name)
        .subscribe((response:any)=>{
          /* this.pokemons.push(response); */
          let type='';
    
          response.types.forEach((element: any) => {
            type=type+element.type.name.charAt(0).toUpperCase()+element.type.name.slice(1)+' '

           
          });
          
          if(type.includes(typeSelect)) {
              
          
              this.pokemons.push({
              'name':response.name.charAt(0).toUpperCase()+response.name.slice(1),
              'img':response.sprites.front_default,
              'height':response.height,
              'health':response.stats[0].base_stat,
              'atack':response.stats[1].base_stat,
              'types':type});
            }
         
        })
      });
    });
 

}
}
