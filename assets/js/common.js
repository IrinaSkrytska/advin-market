$(document).ready(function () {
  let returnPage = "";
  const linkElement = document.getElementById("ar-link");
  linkElement.addEventListener(
    "message",
    function (event) {
      console.log("Event addet");
      if (event.data == "_apple_ar_quicklook_button_tapped") {
        console.log("test");
        window.location.href = returnPage;
      }
    },
    false
  );

  var itemidndex = 2;

  var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      initialSlide: itemidndex,
      dynamicBullets: true,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      },
      renderBullet: function (index, className) {
        return (
          '<span class="' +
          className +
          '" id="' +
          className +
          "-" +
          (index + 1) +
          '"></span>'
        );
      },
    },
  });

  $(".swiper-button-prev-custom").on("click", function () {
    swiper.slidePrev();
    console.log("Test");
  });
  $(".swiper-button-next-custom").on("click", function () {
    swiper.slideNext();
  });

  swiper.slideTo(itemidndex, 0, false);
  swiper.slideTo(itemidndex, 0, false);

  // qr-hover
  $(".products .card .fake-qr-button")
    .mouseover(function () {
      $(this).closest(".card").addClass("hover");
      $(this).closest(".swiper").addClass("hover");
    })
    .mouseout(function () {
      $(this).closest(".card").removeClass("hover");
      $(this).closest(".swiper").removeClass("hover");
    });

  // product click
  $(".products").on("click", ".card", function () {
    let $element = $(this);
    let id = $element.attr("id");

    console.log("you click on:", id);

    let model = document.getElementById("model");

    switch (id) {
      case "product-1": {
        fetch(`https://adv-marketplace-back.onrender.com/examples/models/${id}`)
          .then((response) => response.json())
          .then(({ data }) => {
            const iosSrc = data.model.ios;

            model.iosSrc = iosSrc;

            returnPage = "https://adv-marketplace.advin-global.com/";
          });
        break;
      }
      case "product-2": {
        model.iosSrc =
          "/assets/models/ios/Washing_Machine.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=0";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/WashingMachine.glb";
        returnPage = "https://adv-marketplace.advin-global.com/";

        break;
      }
      case "product-3-1": {
        model.iosSrc =
          "/assets/models/ios/Sofa_Yellow.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=1";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/sofa_yellow.glb";
        returnPage = "https://adv-marketplace.advin-global.com/cart.html";

        break;
      }
      case "product-3-2": {
        model.iosSrc =
          "/assets/models/ios/Sofa_Grey.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=1";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/sofa_grey.glb";
        returnPage = "https://adv-marketplace.advin-global.com/cart.html";

        break;
      }
      case "product-3-3": {
        model.iosSrc =
          "/assets/models/ios/Sofa_Red.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=1";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/sofa_red.glb";
        returnPage = "https://adv-marketplace.advin-global.com/cart.html";

        break;
      }
      case "product-3-4": {
        model.iosSrc =
          "/assets/models/ios/Sofa_Blue.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=1";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/sofa_blue.glb";
        returnPage = "https://adv-marketplace.advin-global.com/cart.html";

        break;
      }
      case "product-4": {
        model.iosSrc =
          "/assets/models/ios/Bath.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=0";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/bath.glb";
        returnPage = "https://adv-marketplace.advin-global.com/";

        break;
      }
      case "product-5": {
        model.iosSrc =
          "/assets/models/ios/Door.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=0";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/Door.glb";
        returnPage = "https://adv-marketplace.advin-global.com/";

        break;
      }
      case "product-6": {
        model.iosSrc =
          "/assets/models/ios/Kenwood.usdz#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=0";
        model.src =
          "https://adv-marketplace.advin-global.com/assets/models/android/Kenwood.glb";
        returnPage = "https://adv-marketplace.advin-global.com/";

        break;
      }
    }

    initializeArButton(model.src, model.iosSrc);
  });

  // --- AR --- this is the best game forever =)))

  const IS_ANDROID = /android/i.test(navigator.userAgent);
  const IS_IOS =
    (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const IS_SAFARI = /Safari\//.test(navigator.userAgent);
  const IS_FIREFOX = /firefox/i.test(navigator.userAgent);
  const IS_OCULUS = /OculusBrowser/.test(navigator.userAgent);
  const IS_IOS_CHROME = IS_IOS && /CriOS\//.test(navigator.userAgent);
  const IS_IOS_SAFARI = IS_IOS && IS_SAFARI;

  const SUPPORTS_SCENEVIEWER = IS_ANDROID && !IS_FIREFOX && !IS_OCULUS;
  const SUPPORTS_QUICKLOOK = (() => {
    const anchor = document.createElement("a");
    return (
      anchor.relList && anchor.relList.supports && anchor.relList.supports("ar")
    );
  })();

  const activateAR = (href, isQuickLook) => {
    const anchor = document.createElement("a");
    if (isQuickLook) {
      isQuickLook = true;
      // quick look needs a <img> child to go directly to AR view
      anchor.appendChild(document.createElement("img"));
      anchor.rel = "ar";
    }
    anchor.setAttribute("href", href);
    anchor.click();
    if (isQuickLook) {
      anchor.addEventListener(
        "message",
        (event) => {
          if (event.data == "_apple_ar_quicklook_button_tapped") {
            button.dispatchEvent(new CustomEvent("quick-look-button-tapped"));
          }
        },
        false
      );
    }
  };

  const initializeArButton = (id) => {
    if (IS_IOS_CHROME || IS_IOS_SAFARI) {
      const iosSrc = model.iosSrc;
      console.log(iosSrc);

      let href = `${iosSrc}#custom=https://adv-marketplace.advin-global.com/witnes.html&allowsContentScaling=0`;

      activateAR(href, button, true);

      if (!iosSrc) {
        console.error("Invalid ios-src in <ar-button>: " + button);
        return;
      }

      const Element = document.getElementById("ar-link");
      Element.href = "https://adv-marketplace.advin-global.com" + model.iosSrc;
      Element.click();
    } else if (SUPPORTS_SCENEVIEWER) {
      // system supports AR via scene viewer

      const androidSrc = model.src;

      if (!androidSrc) {
        console.error("Invalid src in <ar-button>: " + button);
        return;
      }
      let href = null;
      href = `intent://arvr.google.com/scene-viewer/1.1?file=${androidSrc}&mode=ar_only&link=https://adv-marketplace.advin-global.com/cart.html&title=Go to the order page`;

      href +=
        `#Intent;scheme=https;` +
        `package=com.google.ar.core;` +
        `action=android.intent.action.VIEW;`;
      href += `end;`;

      activateAR(href);
    } else if (IS_IOS && !IS_IOS_SAFARI && !IS_IOS_CHROME) {
      // No AR supported on current system, hide the button or sets a fallback url
      button.setAttribute("ar", "unsupported_ios");
      button.dispatchEvent(
        new CustomEvent("initialized", { detail: "unsupported_ios" })
      );
      if (button.getAttribute("show-if-unsupported") != null) {
        button.addEventListener("click", () => {
          const fallbackUrl = button.getAttribute("fallback-url");
          if (fallbackUrl) {
            activateAR(encodeURIComponent(fallbackUrl));
          }
        });
      } else {
        button.style.display = "none";
      }
    } else {
      // No AR supported on current system, hide the button or sets a fallback url
      button.setAttribute("ar", "unsupported");
      button.dispatchEvent(
        new CustomEvent("initialized", { detail: "unsupported" })
      );
      if (button.getAttribute("show-if-unsupported") != null) {
        button.addEventListener("click", () => {
          const fallbackUrl = button.getAttribute("fallback-url");
          if (fallbackUrl) {
            activateAR(encodeURIComponent(fallbackUrl));
          }
        });
      } else {
        button.style.display = "none";
      }
    }
  };
});
