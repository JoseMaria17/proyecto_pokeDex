import { style } from '@angular/animations';
import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit{
  name!:string;
  cantidad:number=0;
  lista:string='';
  mensaje:string=''
  
  //es un referencia de la vista pokemen-seach.html astarjeta y asmensaje
  @ViewChild('astarjeta') tarjeta!: ElementRef;


  constructor( private pokemonService: PokemonService, private renderer2:Renderer2){}

  ngOnInit(): void {

  }
  reset(){
    const tarjeta = document.getElementById('tarjeta');
    const astarjeta=this.tarjeta.nativeElement
    tarjeta!.innerHTML=''  // limpitar tarjeta
    this.mensaje=''
    this.renderer2.removeClass(astarjeta, 'listo-tarjeta') // removeClass listo
    this.cantidad=0 //inicializar variable
    this.lista='' 
  }
  search(){


      const astarjeta=this.tarjeta.nativeElement
      this.mensaje=''

       //verificar si ya existe el pokemon selecionado
       if(this.lista.includes(this.name.toLowerCase())) {
         this.mensaje='Ya eligio el pokemon: '+this.name
       }else if(this.cantidad>5){
        // se verifica que solo ingrese 6 pokemon y se envia mensaje
        this.mensaje='Solo puede ingresar 6 pokemon'
    }else{
       
        // se llama servicio de getPokemon API
        this.pokemonService.getPokemon(this.name.toLowerCase()).subscribe(
          (d:any) =>{
          
          this.cantidad=this.cantidad+1; 
          this.lista= this.lista+','+ d.name
          const div =this.renderer2.createElement('div')
          const img =this.renderer2.createElement('img')
          const h3 =this.renderer2.createElement('h3')
          const Type =this.renderer2.createElement('p')
          const Height =this.renderer2.createElement('p')
          const Health =this.renderer2.createElement('p')
          const Attack =this.renderer2.createElement('p')

          this.renderer2.addClass(div, 'box')
          this.renderer2.setAttribute(img, 'src',d.sprites.front_default)
          this.renderer2.addClass(div, 'col1')
          this.renderer2.appendChild(div,img )
          this.renderer2.appendChild(h3,this.renderer2.createText(d.name.charAt(0).toUpperCase()+d.name.slice(1)))
          this.renderer2.appendChild(div,h3 )

          this.renderer2.appendChild(Type,this.renderer2.createText('Type: '+d.types[0].type.name.charAt(0).toUpperCase()+d.types[0].type.name.slice(1) ))
          this.renderer2.appendChild(Height,this.renderer2.createText('Height: '+d.height ))
          this.renderer2.appendChild(Health,this.renderer2.createText('Health: '+d.stats[0].base_stat))
          this.renderer2.appendChild(Attack,this.renderer2.createText('Attack Power: '+d.stats[1].base_stat))
          this.renderer2.appendChild(div,Type )
          this.renderer2.appendChild(div,Height )
          this.renderer2.appendChild(div,Health )
          this.renderer2.appendChild(div,Attack )
          
          this.renderer2.appendChild(astarjeta,div )

          if(this.cantidad==6){
            //agrega clases nueva para la tarjeta y se indica que esta listo 
            this.renderer2.addClass(astarjeta, 'listo-tarjeta')
            this.mensaje='Estas listo para la Batalla '
  
          }

        },(error :any) =>{
          //se verifica el error
          this.mensaje='El pokemon no existe'
          
        }
        )

         //this.renderer2.addClass(astarjeta, 'pokemon-grid')
    
       
  
      }



  }

}
