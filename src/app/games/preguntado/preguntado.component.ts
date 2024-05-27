import { Component, OnInit } from '@angular/core';
import { PreguntadoService } from '../../services/preguntado/preguntado.service';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
    selector: 'app-preguntado',
    standalone: true,
    templateUrl: './preguntado.component.html',
    styleUrl: './preguntado.component.css',
    imports: [NgIf, NgFor, NavbarComponent]
})
export class PreguntadoComponent implements OnInit{
  countries: any[] = [];
  currentCountry: any;
  options: string[] = [];
  correctAnswer: string = "";
  questionIndex: number = 0;
  score: number = 0;
  maxQuestions: number = 5;
  gameFinished: boolean = false;

  constructor(private restCountriesService: PreguntadoService) {}

  ngOnInit(): void {
    this.restCountriesService.getAllCountries().subscribe(data => {
      this.countries = this.filterCountries(data);
      this.startQuiz();
    });
  }

  filterCountries(countries: any[]): any[] {
    const spanishSpeakingCountries = [
      'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Dominican Republic', 
      'Ecuador', 'El Salvador', 'Equatorial Guinea', 'Guatemala', 'Honduras', 'Mexico', 
      'Nicaragua', 'Panama', 'Paraguay', 'Peru', 'Spain', 'Uruguay', 'Venezuela'
    ];
  
    const englishSpeakingCountries = [
      'Australia', 'Canada', 'Ireland', 'New Zealand', 'United Kingdom', 'United States'
    ];
  
    const otherCountries = [
      'Germany', 'China', 'Russia', 'Turkey', 'Italy', 'France', 'Netherlands', 'Egypt', 
      'Nigeria', 'Norway', 'Switzerland', 'Sweden', 'Portugal'
    ];
  
    return countries.filter(country => 
      spanishSpeakingCountries.includes(country.name.common) ||
      englishSpeakingCountries.includes(country.name.common) ||
      otherCountries.includes(country.name.common)
    );
  }
  

  startQuiz(): void {
    this.questionIndex = 0;
    this.score = 0;
    this.gameFinished = false;
    this.nextQuestion();
  }

  nextQuestion(): void {
    if (this.questionIndex < this.maxQuestions) {
      this.generateQuestion();
      this.questionIndex++;
    } else {
      this.gameFinished = true;
    }
  }

  generateQuestion(): void {
    const correctCountryIndex = Math.floor(Math.random() * this.countries.length);
    this.currentCountry = this.countries[correctCountryIndex];
    this.correctAnswer = this.currentCountry.name.common;
    this.options = this.generateOptions(this.correctAnswer);
  }

  generateOptions(correctAnswer: string): string[] {
    const options = new Set<string>();
    options.add(correctAnswer);

    while (options.size < 4) {
      const randomCountryIndex = Math.floor(Math.random() * this.countries.length);
      const option = this.countries[randomCountryIndex].name.common;
      options.add(option);
    }

    return this.shuffleArray(Array.from(options));
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkAnswer(selectedOption: string): void {
    if (selectedOption === this.correctAnswer) {
      this.score++;
    }
    this.nextQuestion();
  }

  playAgain(): void {
    this.startQuiz();
  }
}
