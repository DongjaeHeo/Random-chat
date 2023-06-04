import { Controller } from "@hotwired/stimulus";
import { useIntersection } from "stimulus-use";

// Connects to data-controller="autoclick"
export default class Autoclick extends Controller {
  option = {
    threshold: 0,
  };

  static messagesContainer;
  static topMessage;
  static throttling = false;
  connect() {
    console.log("Autoclick!");
    useIntersection(this, this.option);
  }
  appear(entry) {
    // callback automatically triggered when the element
    // intersects with the viewport (or root Element specified in the options)
    if (!Autoclick.throttling) {
      Autoclick.throttling = true;
      Autoclick.messagesContainer =
        document.getElementById("messages-container");
      Autoclick.topMessage = Autoclick.messagesContainer.children[0];
      Autoclick.throttle(this.element.click(), 300);

      setTimeout(() => {
        Autoclick.topMessage.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
        console.log("Scrolling");
        Autoclick.throttling = false;
      }, 250);
    }
  }

  disappear(entry) {
    // callback automatically triggered when the element
    // leaves the viewport (or root Element specified in the options)
  }

  static throttle(func, wait) {
    let timeout = null;
    let previous = 0;

    let later = function () {
      previous = Date.now();
      timeout = null;
      func();
    };
    return function () {
      let now = Date.now();
      let remaining = wait - (now - previous);

      if (remaining <= 0 || remaing > wait) {
        if (timeout) {
          clearTimeout(timeout);
        }
        later();
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
    };
  }
}
