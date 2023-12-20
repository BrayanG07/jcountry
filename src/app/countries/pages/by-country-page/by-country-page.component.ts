import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    const { term, countries } = this.countriesService.cacheStore.byCountries;
    this.countries = countries;
    this.initialValue = term;
  }

  searchCountry(term: string): void {
    this.countriesService
      .findByCountry(term)
      .subscribe((data) => (this.countries = data));
  }
}
