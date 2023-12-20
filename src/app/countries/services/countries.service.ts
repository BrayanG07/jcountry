import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country, CacheStore, Region } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private endpointUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.readToLocalStorage()
  }

  private getCountriesRequest<T>(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(url).pipe(
      catchError(() => of([]))
      // ? La peticion y los datos ya se han obtenido pero tarda dos segundos en mostrar o pasar los datos
      // delay(2000)
    );
  }

  findCountryByAlphaCode(code: string): Observable<Country | null> {
    const url: string = `${this.endpointUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  findByCapital(term: string): Observable<Country[]> {
    const url: string = `${this.endpointUrl}/capital/${term}`;

    return this.getCountriesRequest<Country>(url).pipe(
      // * tap = se ejecuta luego de que la solicitud se completa, tiene los datos pero no modifica sus valores
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap(() => this.writeToLocalStorage())
    );
  }

  findByCountry(term: string): Observable<Country[]> {
    const url: string = `${this.endpointUrl}/name/${term}`;

    return this.getCountriesRequest<Country>(url).pipe(
      // * tap = se ejecuta luego de que la solicitud se completa, tiene los datos pero no modifica sus valores
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      tap(() => this.writeToLocalStorage())
    );
  }

  findByRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.endpointUrl}/region/${region}`;

    return this.getCountriesRequest<Country>(url).pipe(
      // * tap = se ejecuta luego de que la solicitud se completa, tiene los datos pero no modifica sus valores
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.writeToLocalStorage())
    );
  }

  private writeToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private readToLocalStorage(): void {
    const data = localStorage.getItem('cacheStore')
    if (data) {
      this.cacheStore = JSON.parse(data) as CacheStore;
    }
  }
}
