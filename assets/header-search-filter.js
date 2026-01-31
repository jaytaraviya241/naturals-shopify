// Header Search Filter Dropdown Functionality
class HeaderSearchFilter {
  constructor() {
    this.dropdown = document.querySelector(".custom-select");
    if (!this.dropdown) return;

    this.button = this.dropdown.querySelector(".custom-select__btn");
    this.listbox = this.dropdown.querySelector(".custom-select__listbox");
    this.options = this.dropdown.querySelectorAll(".custom-select__option");
    this.buttonText = this.dropdown.querySelector(".custom-select__text");
    this.hiddenInput = this.dropdown.querySelector("#category-filter-input");

    this.isOpen = false;
    this.selectedIndex = 0;

    this.init();
  }

  init() {
    // Button click to toggle dropdown
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggle();
    });

    // Option click to select
    this.options.forEach((option, index) => {
      option.addEventListener("click", () => {
        this.selectOption(index);
      });
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.close();
      }
    });

    // Keyboard navigation
    this.button.addEventListener("keydown", (e) => {
      this.handleKeyDown(e);
    });

    this.listbox.addEventListener("keydown", (e) => {
      this.handleKeyDown(e);
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.button.setAttribute("aria-expanded", "true");
    this.listbox.removeAttribute("hidden");
    this.listbox.setAttribute("aria-hidden", "false");

    // Focus first option
    if (this.options[this.selectedIndex]) {
      this.options[this.selectedIndex].focus();
    }
  }

  close() {
    this.isOpen = false;
    this.button.setAttribute("aria-expanded", "false");
    this.listbox.setAttribute("hidden", "");
    this.listbox.setAttribute("aria-hidden", "true");
  }

  selectOption(index) {
    this.selectedIndex = index;
    const option = this.options[index];
    const value = option.getAttribute("data-value");
    const text = option.querySelector("span").textContent;

    // Update button text
    this.buttonText.textContent = text;

    // Update hidden input
    this.hiddenInput.value = value;

    // Close dropdown
    this.close();
    this.button.focus();
  }

  handleKeyDown(e) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.focusNextOption();
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (this.isOpen) {
          this.focusPreviousOption();
        }
        break;

      case "Enter":
      case " ":
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          const focusedOption = document.activeElement;
          const index = Array.from(this.options).indexOf(focusedOption);
          if (index !== -1) {
            this.selectOption(index);
          }
        }
        break;

      case "Escape":
        e.preventDefault();
        this.close();
        this.button.focus();
        break;

      case "Home":
        e.preventDefault();
        if (this.isOpen && this.options[0]) {
          this.options[0].focus();
        }
        break;

      case "End":
        e.preventDefault();
        if (this.isOpen && this.options[this.options.length - 1]) {
          this.options[this.options.length - 1].focus();
        }
        break;
    }
  }

  focusNextOption() {
    const focusedOption = document.activeElement;
    const currentIndex = Array.from(this.options).indexOf(focusedOption);
    const nextIndex = Math.min(currentIndex + 1, this.options.length - 1);

    if (this.options[nextIndex]) {
      this.options[nextIndex].focus();
    }
  }

  focusPreviousOption() {
    const focusedOption = document.activeElement;
    const currentIndex = Array.from(this.options).indexOf(focusedOption);
    const prevIndex = Math.max(currentIndex - 1, 0);

    if (this.options[prevIndex]) {
      this.options[prevIndex].focus();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new HeaderSearchFilter();
  });
} else {
  new HeaderSearchFilter();
}
