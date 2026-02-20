if (!customElements.get('variant-description')) {
  customElements.define(
    'variant-description',
    class VariantDescription extends HTMLElement {
      connectedCallback() {
        this.descriptions = this.querySelectorAll('[data-variant-id]');
        this.defaultDescription = this.querySelector('[data-variant-default]');

        this.onVariantChangeUnsubscriber = subscribe(
          PUB_SUB_EVENTS.variantChange,
          this.handleVariantChange.bind(this)
        );
      }

      handleVariantChange({ data: { variant } }) {
        this.descriptions.forEach((el) => {
          el.hidden = true;
        });

        if (!variant) {
          if (this.defaultDescription) this.defaultDescription.hidden = false;
          return;
        }

        const match = this.querySelector(`[data-variant-id="${variant.id}"]`);
        if (match) {
          match.hidden = false;
        } else if (this.defaultDescription) {
          this.defaultDescription.hidden = false;
        }
      }

      disconnectedCallback() {
        if (this.onVariantChangeUnsubscriber) {
          this.onVariantChangeUnsubscriber();
        }
      }
    }
  );
}
