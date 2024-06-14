$(document).ready(function () {
    console.log('bf script init');

    function handleVideo() {
        const containers = $(".video-block, .hero");
        if (!containers.length) return;

        attachScript();

        function loadVideos() {
            containers.each(function () {
                const self = $(this);
                const videoID = self.find("#video-id").text();
                const videoBox = self.find(".vimeo-container");

                var player = new Vimeo.Player(videoBox, {
                    id: videoID,
                    controls: false,
                    autoplay: true,
                    muted: true,
                    background: true
                });
            });
        }

        function attachScript() {
            const tag = document.createElement('script');
            tag.src = `https://player.vimeo.com/api/player.js`;
            tag.async = true;
            tag.id = "vimeo-script"
            const targetScriptTag = document.getElementsByTagName('script')[1];
            targetScriptTag.parentNode.insertBefore(tag, targetScriptTag);

            tag.onload = function () {
                loadVideos();
            }
        }
    };

    function duplicatesForMobile() {
        function featureCards() {
            const container = $(".feature-cards");
            if (!container.length) return;

            container.each(function () {
                const self = $(this);
                const targetContainer = self.find(".fc-inner.mobile-owl-carousel");
                const whiteboxes = self.find(".whitebox")
                whiteboxes.clone().appendTo(targetContainer);
            });
        }

        function solutionHero() {
            const container = $(".solutions-hero");
            if (!container.length) return;

            container.each(function () {
                const self = $(this);
                const targetContainer = self.find(".sh-phone-bg.is-desktop");
                targetContainer.children().remove();

                const sourceContainer = self.find(".sh-phone-bg.is-mobile");
                sourceContainer.children().clone().appendTo(targetContainer);
            });
        }

        featureCards();
        solutionHero();
    }

    function carousels() {
        const carousels = $(".owl-carousel, .mobile-owl-carousel");
        if (!carousels.length) return;

        const leftArrow = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" transform="matrix(-1 0 0 1 32 0)" fill="#4561EC"/><path d="M24 16L9.60001 16" stroke="#F6F6FF" stroke-width="2.00439"/><path d="M15.9996 9.6001L9.59961 16.0001L15.9996 22.4001" stroke="#F6F6FF" stroke-width="2.00439"/></svg>`;
        const rightArrow = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#4561EC"/><path d="M8 16L22.4 16" stroke="#F6F6FF" stroke-width="2.00439"/><path d="M16.0004 9.6001L22.4004 16.0001L16.0004 22.4001" stroke="#F6F6FF" stroke-width="2.00439"/></svg>`;

        carousels.each(function () {
            const self = $(this);

            if (self.hasClass("tes-items")) {
                const carouselInstance = self.owlCarousel({
                    nav: true,
                    smartSpeed: 1000,
                    items: 1,
                    loop: true,
                    navRewind: false,
                    dotsEach: true,
                    navText: [leftArrow, rightArrow],
                    margin: 60,
                });

                const dots = self.find(".owl-dot");
                dots.each(function (index) {
                    const dot = $(this);
                    const num = index + 1;

                    if (num == dots.length) {
                        dot.children().remove();
                        dot.html(`<span>${num}</span>/<span>${num}</span>`);
                    } else {
                        dot.children("span").text(num);
                    }
                });

            } else if (self.hasClass("sol-items")) {
                const carouselInstance = self.owlCarousel({
                    nav: true,
                    smartSpeed: 1000,
                    loop: false,
                    navRewind: false,
                    dotsEach: true,
                    navText: [leftArrow, rightArrow],
                    responsive: {
                        0: { margin: 16, items: 1 },
                        768: { items: 2, margin: 24 },
                        1280: { items: 3, margin: 24 },
                    },
                });

            } else if (self.hasClass("res-items") || self.hasClass("fc-items")) {
                const mm = gsap.matchMedia();
                let carouselInstance = null;

                mm.add(
                    {
                        isDesktop: `(min-width: 768px)`,
                        isMobile: `(max-width: 767px)`,
                    },
                    (context) => {
                        let { isDesktop, isMobile } = context.conditions;

                        if (isMobile) {
                            if (!self.hasClass("owl-loaded")) {
                                carouselInstance = self.owlCarousel({
                                    nav: false,
                                    items: 1,
                                    smartSpeed: 1000,
                                    loop: false,
                                    navRewind: false,
                                    dotsEach: true,
                                    margin: 16,
                                });
                            }
                        }

                        if (isDesktop) {
                            if (carouselInstance) {
                                carouselInstance.trigger(
                                    "destroy.owl.carousel"
                                );
                                carouselInstance = null;
                            }
                        }

                        return () => { };
                    }
                );

            } else if (self.hasClass("sh-items")) {
                const carouselInstance = self.owlCarousel({
                    nav: true,
                    smartSpeed: 1000,
                    loop: false,
                    navRewind: false,
                    dotsEach: true,
                    autoWidth: true,
                    navText: [leftArrow, rightArrow],
                    responsive: {
                        0: { margin: 16 },
                        990: { margin: 32 },
                    },
                });

            } else if (self.hasClass("lp-items")) {
                const carouselInstance = self.owlCarousel({
                    nav: true,
                    smartSpeed: 1000,
                    loop: false,
                    navRewind: false,
                    dotsEach: true,
                    navText: [leftArrow, rightArrow],
                    responsive: {
                        0: { autoWidth: false, margin: 20, items: 1 },
                        768: { autoWidth: true, margin: 24 },
                    },
                });
            }
        });
    }

    function animatedContactHeading() {
        const container = $(".ach-to-show-container");
        if (!container.length) return;

        container.each(function () {
            const self = $(this);
            const toExit = self.find(".ach-to-exit");
            const toShowMain = self.find(".ach-to-show-main");
            const toShowSecondary = self.find(".ach-to-show");

            const timeline = gsap.timeline({
                defaults: {
                    ease: Power3.easeOut,
                    overwrite: true
                }
            });

            timeline
                .fromTo(toExit,
                    {
                        clipPath: "inset(0 0 0 0)",
                        autoAlpha: 1,
                    },
                    {
                        delay: 1,
                        clipPath: "inset(0 0 100% 0)",
                        autoAlpha: 0,
                        duration: 0.8,
                    },
                )
                .fromTo(toShowMain,
                    {
                        autoAlpha: 0
                    },
                    {
                        autoAlpha: 1,
                        duration: 0.8,
                    },
                    "<0.7"
                )
                .fromTo(toShowSecondary,
                    {
                        height: 0
                    },
                    {
                        height: "auto",
                        duration: 0.6,
                        stagger: 0.2
                    },
                    "<0.7"
                )
        })
    }

    function solutionAccordion() {
        const containers = $(".solutions-accordion");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);
            const allItems = self.find(".cl-accordion-data");
            const allImages = self.find(".sol-acc-img.is-desktop");
            const allBody = self.find(".cl-accordion-desc");

            addIndex(allItems);
            addIndex(allImages);

            allItems.click(function () {
                const subSelf = $(this);
                const index = subSelf.data("index");

                const targetImage = allImages.filter(function () {
                    return $(this).data('index') === index;
                });

                if (!subSelf.hasClass("open")) {
                    const body = subSelf.find(".cl-accordion-desc");

                    resetItems(allBody);
                    allItems.removeClass("open");

                    allImages.removeClass("active");
                    targetImage.addClass("active");

                    subSelf.addClass("open");
                    gsap.fromTo(body,
                        {
                            height: 0,
                            autoAlpha: 0,
                        },
                        {
                            height: "auto",
                            duration: 0.6,
                            autoAlpha: 1,
                            ease: Power2.easeOut,
                            overwrite: true
                        }
                    )
                }
            });

            allItems[0].click();
        })

        function addIndex(items) {
            items.each(function (index) {
                const self = $(this);
                self.data('index', index);
            })
        }

        function resetItems(items) {
            items.each(function () {
                const self = $(this);

                gsap.to(self, {
                    height: 0,
                    duration: 0.6,
                    ease: Power2.easeOut,
                    overwrite: true,
                    onStart: () => {
                        gsap.set(self, {
                            autoAlpha: 0,
                        });
                    },
                });
            })
        }
    }

    function faq() {
        const containers = $(".faq");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);
            const allItems = self.find(".faq-item");
            const allBody = self.find(".faq-body");

            allItems.click(function () {
                const subSelf = $(this);

                if (!subSelf.hasClass("open")) {
                    const body = subSelf.find(".faq-body");

                    resetItems(allBody);
                    allItems.removeClass("open");

                    subSelf.addClass("open");
                    gsap.fromTo(body,
                        {
                            height: 0,
                            autoAlpha: 0,
                        },
                        {
                            height: "auto",
                            duration: 0.6,
                            autoAlpha: 1,
                            ease: Power2.easeOut,
                            overwrite: true
                        }
                    )
                }
            });

            allItems[0].click();
        })

        function resetItems(items) {
            items.each(function () {
                const self = $(this);

                gsap.to(self, {
                    height: 0,
                    duration: 0.6,
                    ease: Power2.easeOut,
                    overwrite: true,
                    onStart: () => {
                        gsap.set(self, {
                            autoAlpha: 0,
                        });
                    },
                });
            })
        }
    }

    function packages() {
        const containers = $(".listing-package");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);
            const allItems = self.find(".lp-item");

            allItems.each(function () {
                const subSelf = $(this);
                const overlay = subSelf.find(".lp-arrow");

                overlay.click(function () {
                    allItems.addClass("open");
                })
            });
        })
    }

    function heroSlideIn() {
        const containers = $("section.hero");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);
            const heroRight = self.find(".hero-right-container");

            gsap.to(
                heroRight,
                {
                    delay: 1,
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.8,
                    ease: Power2.easeOut
                }
            )
        })
    }

    function ctaBoxSlideIn() {
        const containers = $(".gs-container");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);

            gsap.to(self, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: self,
                    start: "top 80%",
                    invalidateOnRefresh: true,
                },
            });
        })
    }

    function resItemsSlideIn() {
        const containers = $(".w-layout-blockcontainer.resources");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);
            const items = self.find(".res-items").children();

            gsap.to(items, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: { each: 0.3 },
                scrollTrigger: {
                    trigger: self,
                    start: "top 60%",
                    invalidateOnRefresh: true,
                },
            });
        })
    }

    function propFixedScrollSlideIn() {
        const containers = $("section.prop-fixed-scroll");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);
            const items = self.find(".pfp-item");

            items.each(function () {
                const subSelf = $(this);

                gsap.to(subSelf, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: subSelf,
                        start: "top 65%",
                        invalidateOnRefresh: true,
                    },
                });
            })
        })
    }

    function FiftyFiftyStatsSlideIn() {
        const containers = $("section._50-50-stats-img");
        if (!containers.length) return;

        containers.each(function () {
            const self = $(this);
            const items = self.find(".ff-box");

            const tl = gsap.timeline({
                defaults: {
                    overwrite: true
                },
                scrollTrigger: {
                    trigger: self,
                    start: "top 70%"
                }
            });

            items.each(function () {
                const subSelf = $(this);
                const content = subSelf.find(".ff-content");
                const logos = subSelf.find(".cl-logo");
                const notes = self.find(".solutions-footnote");
                const lines = subSelf.find(".line-white");

                tl
                    .fromTo(subSelf,
                        {
                            autoAlpha: 0,
                            y: 30,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            ease: Power3.easeOut,
                            duration: 0.6
                        }
                    )
                    .fromTo(logos,
                        {
                            autoAlpha: 0,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            ease: Power3.easeOut,
                            duration: 0.4
                        },
                        "<0.4"
                    )
                    .fromTo(content,
                        {
                            autoAlpha: 0,
                            y: 20,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            ease: Power3.easeOut,
                            duration: 0.6
                        },
                        "<0.2"
                    )
                    .fromTo(lines,
                        {
                            clipPath: "inset(0 0 100% 0)",
                            autoAlpha: 1,
                        },
                        {
                            clipPath: "inset(0 0 0 0)",
                            autoAlpha: 0,
                            duration: 0.8,
                        },
                        "<0.4"
                    )
                    .fromTo(notes,
                        {
                            autoAlpha: 0,
                        },
                        {
                            autoAlpha: 1,
                            y: 0,
                            ease: Power3.easeOut,
                            duration: 0.4
                        },
                        "<0.3"
                    )
            })
        })
    }

    duplicatesForMobile();
    carousels();
    handleVideo();
    animatedContactHeading();
    solutionAccordion();
    faq();
    packages();
    heroSlideIn();
    ctaBoxSlideIn();
    resItemsSlideIn();
    propFixedScrollSlideIn();
    FiftyFiftyStatsSlideIn();
});