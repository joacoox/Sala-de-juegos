import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"saladejuegos-6e60e","appId":"1:526069747612:web:6f350313523e85d90b8259","storageBucket":"saladejuegos-6e60e.appspot.com","apiKey":"AIzaSyBTDASSBClg4QBYD2h0yQinM3xIUy5KHp4","authDomain":"saladejuegos-6e60e.firebaseapp.com","messagingSenderId":"526069747612","measurementId":"G-W1D0EQ1MCC"}))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
