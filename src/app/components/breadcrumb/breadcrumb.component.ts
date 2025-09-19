import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: Array<{ label: string, url: string }> = [];
  private subscription?: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit(): void {
    // Initial breadcrumbs
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;

    // Subscribe to breadcrumb updates
    this.subscription = this.breadcrumbService.breadcrumbs$.subscribe(
      breadcrumbs => this.breadcrumbs = breadcrumbs
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  trackByFn(index: number, item: { label: string, url: string }): string {
    return item.url;
  }
}