if (!customElements.get('sticky-atc')) {
  customElements.define(
    'sticky-atc',
    class StickyAtc extends HTMLElement {
      connectedCallback() {
        this.triggerSelector = this.dataset.atcTrigger || '[data-atc-trigger]';
        this.productTitle = this.querySelector('[data-sticky-title]');
        this.productPrice = this.querySelector('[data-sticky-price]');
        this.submitButton = this.querySelector('[data-sticky-submit]');
        this.triggerElement = document.querySelector(this.triggerSelector);

        if (this.triggerElement) {
          this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            { threshold: 0 }
          );
          this.observer.observe(this.triggerElement);
        }

        this.onVariantChangeUnsubscriber = subscribe(
          PUB_SUB_EVENTS.variantChange,
          this.handleVariantChange.bind(this)
        );

        if (this.submitButton) {
          this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
        }
      }

      handleIntersect(entries) {
        entries.forEach((entry) => {
          this.classList.toggle('is-visible', !entry.isIntersecting);
        });
      }

      handleVariantChange({ data: { variant } }) {
        if (!variant) {
          this.classList.add('is-unavailable');
          if (this.submitButton) this.submitButton.disabled = true;
          return;
        }

        this.classList.remove('is-unavailable');

        if (this.productPrice) {
          const formattedPrice = Shopify.formatMoney(variant.price);
          this.productPrice.innerHTML = formattedPrice;
        }

        if (this.submitButton) {
          this.submitButton.disabled = !variant.available;
        }
      }

      handleSubmit(event) {
        event.preventDefault();
        const mainForm = document.querySelector('product-form form');
        if (mainForm) {
          mainForm.requestSubmit();
        }
      }

      disconnectedCallback() {
        if (this.observer) {
          this.observer.disconnect();
        }
        if (this.onVariantChangeUnsubscriber) {
          this.onVariantChangeUnsubscriber();
        }
      }
    }
  );
}
