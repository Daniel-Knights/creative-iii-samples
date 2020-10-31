<template>
    <section id="about">
        <div id="about-link" class="section-title">
            <h2>About</h2>
        </div>
        <div class="section-body">
            <div class="section-body-inner-container">
                <div id="about-image">
                    <div id="about-bg">
                        <div id="about-bg-1"></div>
                        <div id="about-bg-2"></div>
                    </div>
                    <div id="about-image-eye">
                        <img v-show="!blink" src="../assets/img/logo.png" />
                        <img
                            v-show="blink"
                            id="about-logo-blink"
                            src="../assets/img/logo-blink.png"
                        />
                    </div>
                </div>
                <div id="about-body">
                    <p id="about-body-text">
                        {{ aboutContent.before_image
                        }}<img
                            v-if="aboutContent.image"
                            v-lazy="aboutContent.image.filename"
                            :alt="aboutContent.image.alt"
                        />{{ aboutContent.after_image }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'about',

    props: ['aboutContent'],

    data() {
        return {
            blink: false,
        };
    },

    methods: {
        handleScroll() {
            const eye = document.getElementById('about-image');

            if (window.scrollY + 1000 > eye.getBoundingClientRect().top * 10 && !this.blinked) {
                setTimeout(() => (this.blink = true), 500);
                setTimeout(() => (this.blink = false), 1000);
                setTimeout(() => (this.blink = true), 1500);
                setTimeout(() => (this.blink = false), 2000);
                this.blinked = true;
            }
        },
    },

    created() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
};
</script>

<style lang="scss">
#about {
    .section-body {
        padding: 50px 0;
        background-color: $dark_pink;

        .section-body-inner-container {
            margin: 0 auto;
            padding: 38px;
            width: 62rem;
            background-color: $white;

            #about-image {
                @include flex-center;
                height: 25rem;

                #about-bg {
                    width: 100%;
                    height: 100%;

                    &-1 {
                        width: 100%;
                        height: 50%;
                        background: linear-gradient(
                            to bottom,
                            $dark_pink,
                            $dark_pink 50%,
                            $bright_pink 50%,
                            $bright_pink
                        );
                    }

                    &-2 {
                        width: 100%;
                        height: 50%;
                        background: linear-gradient(
                            to bottom,
                            $skin_color,
                            $skin_color 50%,
                            $skin_color 50%,
                            $skin_color
                        );
                    }
                }

                #about-image-eye {
                    position: absolute;
                    margin-top: -20px;

                    img {
                        width: 150px;
                        margin: 0 10px;
                    }

                    #about-logo-blink {
                        transform: scale(1.5) translateY(10px);
                    }
                }
            }

            #about-body {
                padding: 0 30px 30px;
                background-color: $skin_color;

                #about-body-text {
                    margin: 0;
                    line-height: 30px;
                    text-align: left;
                    color: $white;
                    transition: all 1s cubic-bezier(0.215, 0.21, 0.355, 1);

                    img {
                        margin: 20px 40px 20px 30px;
                        width: 250px;
                        float: right;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
}
</style>
