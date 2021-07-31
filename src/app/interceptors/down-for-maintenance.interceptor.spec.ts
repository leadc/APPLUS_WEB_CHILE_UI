import { TestBed } from '@angular/core/testing';

import { DownForMaintenanceInterceptor } from './down-for-maintenance.interceptor';

describe('DownForMaintenanceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DownForMaintenanceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DownForMaintenanceInterceptor = TestBed.inject(DownForMaintenanceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
