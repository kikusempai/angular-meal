import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class BreadcrumbService {
    private breadcrumbsSubject = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
    breadcrumbs$: Observable<Array<{ label: string, url: string }>> = this.breadcrumbsSubject.asObservable();

    get breadcrumbs(): Array<{ label: string, url: string }> {
        return this.breadcrumbsSubject.value;
    }

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            const breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
            this.breadcrumbsSubject.next(breadcrumbs);
        });
    }

    private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, url: string }> = []): Array<{ label: string, url: string }> {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0) {
            return breadcrumbs;
        }

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
            if (routeURL !== '') {
                url += `/${routeURL}`;
            }

            const breadcrumbLabel = child.snapshot.data['breadcrumb'];
            if (breadcrumbLabel) {
                breadcrumbs.push({ label: breadcrumbLabel, url: url });
            }
            return this.createBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }
}