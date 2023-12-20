import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnInit {
  public isLoading: boolean = false;
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private coutriesService: CountriesService) {}

  ngOnInit(): void {
    const { countries, term } = this.coutriesService.cacheStore.byCapital;
    this.countries = countries
    this.initialValue = term
  }

  receiveSearchCapital(term: string): void {
    this.isLoading = true;

    this.coutriesService.findByCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
