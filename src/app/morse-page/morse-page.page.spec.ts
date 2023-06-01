import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MorsePagePage } from './morse-page.page';
import { async } from '@angular/core/testing';

describe('MorsePagePage', () => {
  let component: MorsePagePage;
  let fixture: ComponentFixture<MorsePagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MorsePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
