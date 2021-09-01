import { TestBed } from '@angular/core/testing';

import { TextToPdfService } from './text-to-pdf.service';

describe('TextToPdfService', () => {
  let service: TextToPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
