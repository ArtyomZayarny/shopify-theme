if (!customElements.get('product-tabs')) {
  customElements.define(
    'product-tabs',
    class ProductTabs extends HTMLElement {
      constructor() {
        super();
        this.buttons = [];
        this.panels = [];
      }

      connectedCallback() {
        this.buttons = Array.from(this.querySelectorAll('[role="tab"]'));
        this.panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));

        if (this.buttons.length === 0 || this.panels.length === 0) return;

        this.buttons.forEach((button, index) => {
          button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
          button.setAttribute('tabindex', index === 0 ? '0' : '-1');
          button.addEventListener('click', () => this.activateTab(index));
          button.addEventListener('keydown', (e) => this.handleKeydown(e, index));
        });

        this.panels.forEach((panel, index) => {
          panel.hidden = index !== 0;
        });
      }

      activateTab(index) {
        this.buttons.forEach((button, i) => {
          const isActive = i === index;
          button.setAttribute('aria-selected', isActive ? 'true' : 'false');
          button.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        this.panels.forEach((panel, i) => {
          panel.hidden = i !== index;
        });

        this.buttons[index].focus();
      }

      handleKeydown(event, currentIndex) {
        const { key } = event;
        let newIndex;

        switch (key) {
          case 'ArrowRight':
            newIndex = (currentIndex + 1) % this.buttons.length;
            break;
          case 'ArrowLeft':
            newIndex = (currentIndex - 1 + this.buttons.length) % this.buttons.length;
            break;
          case 'Home':
            newIndex = 0;
            break;
          case 'End':
            newIndex = this.buttons.length - 1;
            break;
          default:
            return;
        }

        event.preventDefault();
        this.activateTab(newIndex);
      }
    }
  );
}
