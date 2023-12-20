import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit {
  public selectedRegion?: Region;
  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];


  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    const { region, countries } = this.countriesService.cacheStore.byRegion
    this.countries = countries
    this.selectedRegion = region
  }

  searchRegion(term: Region) {
    this.selectedRegion = term;

    this.countriesService
      .findByRegion(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
