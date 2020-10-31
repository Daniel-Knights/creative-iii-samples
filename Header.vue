<template>
    <div id="main-header">
        <div class="header-bg"></div>
        <div id="header-eye">
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="250px"
                height="250px"
                viewBox="0 0 300 300"
                enable-background="new 0 0 300 300"
                xml:space="preserve"
                id="circular-text"
            >
                <defs>
                    <path
                        id="circlePath"
                        d="M 150, 150 m -120, 0 a 120,120 0 0,1 240,0 a 120,120 0 0,1 -240,0"
                    />
                </defs>
                <circle cx="150" cy="150" r="150" fill="none" />
                <g>
                    <use xlink:href="#circlePath" fill="none" />
                    <text fill="rgb(250, 255, 249)">
                        <textPath xlink:href="#circlePath">
                            creative.iii studio
                        </textPath>
                    </text>
                </g>
            </svg>
            <img
                @mousedown="
                    spin();
                    blink = !blink;
                "
                v-show="!blink"
                src="../assets/img/logo.png"
            />
            <img
                @mouseup="
                    spin();
                    blink = !blink;
                "
                v-show="blink"
                id="header-logo-blink"
                src="../assets/img/logo-blink.png"
            />
        </div>
        <div id="header-body">
            <div id="header-text">
                <p>
                    {{ homeContent }}
                </p>
            </div>
        </div>
        <scrollactive
            active-class="portfolio-link-selected"
            :offset="0"
            :duration="1000"
            bezier-easing-value=".5,0,.35,1"
            :modifyUrl="false"
        >
            <a href="#portfolio" class="scrollactive-item">
                <i class="fa fa-chevron-down"></i>
            </a>
        </scrollactive>
    </div>
</template>

<script>
export default {
    name: 'Header',

    props: ['homeContent'],

    data() {
        return {
            blink: false,
        };
    },

    methods: {
        spin() {
            const mediaQuery = window.matchMedia('(max-width: 700px)');
            if (mediaQuery.matches) return;

            const text = document.getElementById('circular-text');

            if (text.style.animation !== '') return;
            text.style.animation = 'spin 2s cubic-bezier(0.215, 0.61, 0.355, 1) forwards';
            setTimeout(() => (text.style.animation = ''), 2200);
        },
    },

    mounted() {
        this.spin();

        setTimeout(() => (this.blink = true), 500);
        setTimeout(() => (this.blink = false), 1000);
        setTimeout(() => (this.blink = true), 1500);
        setTimeout(() => (this.blink = false), 2000);
    },
};
</script>

<style lang="scss">
#main-header {
    @include flex-column;
    height: 100%;
    overflow: hidden;

    .header-bg {
        height: 300px;
        width: 100%;
        color: $white;
        background: linear-gradient(
            to bottom,
            $dark_pink,
            $dark_pink 50%,
            $bright_pink 50%,
            $bright_pink
        );
        z-index: 1;
    }

    #header-eye {
        position: relative;
        margin-top: -100px;

        svg {
            position: absolute;
            pointer-events: none;
            margin-left: -40px;
            margin-top: -30px;
            font-family: $font_primary;
            transform: rotate(70deg);
            z-index: 2;
        }

        img {
            cursor: pointer;
            position: relative;
            width: 170px;
            z-index: 2;

            &:active {
                transform: scale(0.9);
            }
        }

        #header-logo-blink {
            width: 170px;
            transform: scale(1.5) translateY(20px);
        }
    }

    #header-body {
        padding-top: 100px;
        width: 100%;
        transform: translateY(-100px);
        background-color: $skin_color;

        #header-text {
            margin: 45px auto;
            width: 100%;
            max-width: 750px;
            min-height: 500px;
            letter-spacing: 2px;
            color: $white;

            p {
                animation: opacity-in 1s;
            }
        }
    }

    nav {
        position: relative;
        top: -15px;
        padding: 5px 0;

        a {
            transition: all 0.2s;

            i {
                animation: attention 5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            }
        }

        a:hover {
            color: rgba($black, 0.5);
        }
    }

    .portfolio-link-selected {
        opacity: 0;
    }
}
</style>
