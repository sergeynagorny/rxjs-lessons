// Observable всегда имеет приставку $

import { fromEvent, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

// const search$: Observable<Event> = new Observable<Event>((observer) => {
//
//   const inputSearch = document.getElementById('search')
//
//   if (!inputSearch) {
//     observer.error('Element not found')
//     return;
//   }
//
//   inputSearch.addEventListener('input', event => {
//     observer.next(event)
//   })
//
// });

const inputSearch = document.getElementById('search')
const search$: Observable<Event> = fromEvent(inputSearch!, 'input') // аналогичная запись, комментария выше

search$
  .pipe(
    map((event: Event) => (event.target as HTMLInputElement).value),
    debounceTime(1000),
    map((value) => value.length > 3 ? value : ''),
    distinctUntilChanged()
  )
  .subscribe(
    (value) => console.log(value),
    (error) => console.log(error)
  );

