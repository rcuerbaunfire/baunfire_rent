$(document).ready(function () {
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
                    loop: false,
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
                        0: { autoWidth: false, margin: 16, items: 1 },
                        768: { autoWidth: true, margin: 24 },
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

    function handleVideo() {
        const containers = $(".vimeo-container");
        if (!containers.length) return;

        attachScript();

        function loadVideos() {
            containers.each(function () {
                const self = $(this);
                const videoID = self.data("video-id");

                var player = new Vimeo.Player(self, {
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

    carousels();
    handleVideo();
    animatedContactHeading();
});