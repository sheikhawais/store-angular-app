import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
    let component: StarRatingComponent;
    let fixture: ComponentFixture<StarRatingComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StarRatingComponent]
        });
        fixture = TestBed.createComponent(StarRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`should have undefined rating`, () => {
        const fixture = TestBed.createComponent(StarRatingComponent);
        const app = fixture.componentInstance;
        expect(app.rating).toBeFalsy();
    })

    it(`should have as rating '5'`, () => {
        const fixture = TestBed.createComponent(StarRatingComponent);
        const app = fixture.componentInstance;
        app.rating = 5;
        app.ngOnInit();
        expect(app.stars).toEqual([
            { active: true },
            { active: true },
            { active: true },
            { active: true },
            { active: true }
        ]);
    })

});
