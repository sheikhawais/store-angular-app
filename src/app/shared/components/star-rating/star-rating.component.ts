import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        NgFor
    ]
})
export class StarRatingComponent {

    stars = [
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false}
    ];
    @Input() rating: number;

    constructor() {
    }

    ngOnInit() {
        this.colorStars(Math.round(this.rating));
    }

    colorStars(rating: number): void {

        for (let i = 0; i < rating; i++) {
            this.stars[i].active = true;
        }
    }
}
