import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  public el: ElementRef<HTMLElement>;

  @Input('appHighlight')
  color: string = 'yellow';

  constructor(el: ElementRef<HTMLElement>) { 
    this.el = el;
  }

  highlight(color: string) {
    color === '' ? 
      this.el.nativeElement.style.textShadow = '' :
      this.el.nativeElement.style.textShadow = `1px 1px 2px ${color}, 0 0 1em blue, 0 0 0.2em blue`; 
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.color);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('');
  }
}
