// Observable всегда имеет приставку $

import { fromEvent, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, takeUntil } from "rxjs/operators";

// const search$: Observable<Event> = new Observable<Event>((observer) => {
//
//   const inputSearch = document.getElementById('search')
//   const buttonStop = document.getElementById('stop')
//
//   if (!inputSearch || !buttonStop) {
//     observer.error('Element not found')
//     return;
//   }
//
//   const onSearch = (event: Event) => {
//     console.log('onSearch')
//     observer.next(event)
//   }
//
//   const onStop = (event: Event) => {
//     observer.complete()
//     clear()
//   }
//
//   buttonStop.addEventListener('click', onStop)
//   inputSearch.addEventListener('input', onSearch)
//
//   const clear = () => {
//     inputSearch.removeEventListener('input', onSearch)
//     buttonStop.removeEventListener('click', onStop)
//   }
//
// });

const inputSearch = document.getElementById('search')
const buttonStop = document.getElementById('stop')
const search$: Observable<Event> = fromEvent(inputSearch!, 'input')
const stop$: Observable<Event> = fromEvent(buttonStop!, 'click')

const searchSubscription = search$
  .pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    debounceTime(1000),
    map((value) => value.length > 3 ? value : ''),
    distinctUntilChanged(),
    takeUntil(stop$)
  )
  .subscribe(
    (value) => console.log(value),
    (error) => console.log(error)
  );

// const stopSubscription = stop$.subscribe(() => {
//   searchSubscription.unsubscribe()
//   stopSubscription.unsubscribe()
// })

// stopSubscription === takeUntil(stop$)
