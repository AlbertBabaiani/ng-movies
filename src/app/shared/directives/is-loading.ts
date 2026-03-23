import {
  Component,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Spinner } from '../components/loading-spinner/spinner';

@Directive({
  selector: '[isLoading]',
})
export class IsLoadingDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  isLoading = input.required<boolean>();

  constructor() {
    effect(() => {
      this.viewContainer.clear();

      if (this.isLoading()) {
        this.viewContainer.createComponent(IsLoadingContainerComponent);
      } else {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}

@Component({
  imports: [Spinner],
  template: `
    <div class="spinner-overlay">
      <app-spinner />
    </div>
  `,
  styles: [
    `
      .spinner-overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        min-height: 20rem;
        background-color: rgba(16, 20, 30, 0.7);
        backdrop-filter: blur(2px);
      }
    `,
  ],
})
class IsLoadingContainerComponent {}
