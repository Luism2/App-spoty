import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('spotify listo');
  }

  getQuery( query: string ) {
    const url = `	https://api.spotify.com/v1/browse/new-releases${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'BQAVR1J2W8ebbQ3JGN6HutEJEHFGJMxdORSNvZ4cmGlk4FJtUil6iQQJ6t9v65SkKH__pWqcC4y2so2gx78'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
        .pipe( map( data => data['albums'].items ));
  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
        .pipe( map( data => data['artists'].items ));
  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
      // .pipe( map( data => data['artist'].items ));
  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?market=US`)
        .pipe( map( data => data['tracks'] ));
  }
}
