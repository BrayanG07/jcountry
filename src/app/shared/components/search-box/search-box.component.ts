import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  // ? Este es un tipo de observable
  private debauncer: Subject<string> = new Subject();
  private debouncerSuscription?: Subscription;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeHolder: string = '';

  @Input()
  public initialValue: string = '';

  ngOnInit(): void {
    this.debouncerSuscription = this.debauncer
      .pipe(
        // * El observable emite un valor, luego llega al pipe, el operador debounceTime espera 500 ms
        // * para saber si le llega un valor, hasta que el usuario dejar de emitir valores por un minuto entonces
        // * en ese momento se ejecuta el subscribe
        debounceTime(500)
      )
      .subscribe((value) => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    // * Se invoca la instancia a este componente es destruida (Cuando en la pantalla se deja de utilizar el componente)

    // ? Nos desuscribimos de la suscription del observable, para que ya no continue obersvando o escuchando emisiones.
    // ? Esto lo hacemos solo para nuestros observables personalizados.
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue(value: string): void {
    if (!value) return;

    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    // next = sirve para realizar la siguiente emision del observable
    this.debauncer.next(searchTerm);
  }
}
