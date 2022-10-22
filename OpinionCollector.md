# Opis

Celem tego projektu jest dostarczenie serwisu, który ułatwi jego użytkownikom wybór wyselekcjonowanych produktów, pochodzących z różnych rynków i potencjalnie różniących się jakością.

## Potencjalne funkcjonalności podstawowe

### Użytkownik

- logowanie,
- wybór produktu (przeglądanie i wyszukiwanie),
- filtrowanie produktów

### Konsument (superclass -> Użytkownik)

- rejestrowanie,
- zgłaszanie aktualizacji produktu,
- dodawanie opinii,
- edytowanie swoich opinii,
- usuwanie swoich opinii

### Admin (superclass -> Użytkownik)

- zatwierdzanie i odpowiadanie na zgłoszenia aktualizacji produktu,
- dodawanie, edytowanie, ukrywanie produktów,
- dodawanie, edytowanie, ukrywanie kategorii,
- ukrywanie opinii

## Wymagania fukcjonalności

## Tworzenie opinii

### Model opinii

1. Login użytkownia (technicznie id użytkownika)
2. Opinia
 Do wyboru (mogą być wszystkie):

- ocena punktowa (1-5 gwiazdek),
- ocena opisowa,
- lista wad i zalet charakterystycznych dla danej kategorii produktowej

### Wymagania do wystawienia opinii

Biznesowe:

- użytkownik musi być zalogowany,
- opinia musi mieć przynajmniej ocenę punktową

Techniczne:

- użytkownik zalogowany musi mieć nadaną rolę, umożliwiającą dodanie opinii

### Wymagania do edycji opinii

Biznesowe:

- użytkownik musi być zalogowany,
- użytkownik może edytować tylko swoje opinie

Techniczne:

- porównanie loginu użytkownika zalogowanego z użytkownikiem, który wystawił ocenę, co powoduje umożliwienie edycji opinii (na froncie)
- użytkownik zalogowany musi mieć nadaną rolę, umożliwiającą edycje opinii

### Wymagania do usuwania opinii

Biznesowe:

- użytkownik musi być zalogowany,
- użytkownik może usuwać tylko swoje opinie

Techniczne:

- porównanie loginu użytkownika zalogowanego z użytkownikiem, który wystawił ocenę, co powoduje umożliwienie usunięcie opinii (na froncie)
- użytkownik zalogowany musi mieć nadaną rolę, umożliwiającą usunięcie opinii

## Moduły

### Wymagania niefunkcjonalne wspólne

- stworzenie repozytorium (Spring JPA)
- autoryzacja
- stworzenie schematów bazodanowych (liquibase)
- wersjonowanie bazy danych (liquibase)
- docker-compose dla MySQL

1. Kliencki (Radosław Moskal, Jakub Kucharski, Mateusz Strzelecki)

   - rejestrowanie
   - logowanie (Spring Security)
   - edycja danych personalnych użytkownika (email)
   - nadawanie uprawnień (Spring Security)

1. Opinii (Piotr Skonieczny, Szymon Zakrzewski)

   - dodawanie opinii
   - edytowanie opinii
   - usuwanie opinii

1. Sugestii (Szymon Ziemecki, Jakub Wardyn)

   - dodawanie sugestii
   - pobieranie sugestii
   - wysyłanie powiadomienia do admina o nowej sugestii (JMS?)
   - zatwierdzanie zamian
   - zapisywanie historii zmian
   - limit sugestii dla użytkownika

1. Produktów (Weronika Tutkaj, Michał Glapiński)

   - dodawanie produktu
   - edycja produktu
   - ukrywanie produktu
   - wyszukiwanie i filtrowanie (tu jednak backend)

1. Kategorii (Wiktoria Płonka, Jakub Glegoła)

   - dodawanie kategorii
   - edycja kategorii
   - ukrywanie kategorii
