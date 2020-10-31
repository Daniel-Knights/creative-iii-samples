<template>
    <header>
        <div id="main-title">
            <h2>{{ $appName }}</h2>
        </div>
        <div id="nav-toggle">
            <h2>MENU</h2>
            <div class="nav-toggle-container">
                <div @click="toggleNav($event)" class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <Slider :blink="blink" @closed="sliderOpen = false" />
    </header>
</template>

<script>
export default {
    name: 'Navbar',

    components: { Slider: () => import('../components/Slider') },

    data() {
        return {
            blink: false,
            sliderOpen: false,
        };
    },

    methods: {
        toggleNav(e) {
            const slider = document.getElementById('nav-slider');
            e.target.classList.toggle('slider-open');

            if (!this.sliderOpen) {
                this.sliderOpen = true;
                slider.style.right = '0';

                setTimeout(() => (this.blink = true), 500);
                setTimeout(() => (this.blink = false), 1000);
                setTimeout(() => (this.blink = true), 1500);
                setTimeout(() => (this.blink = false), 2000);
            } else {
                this.sliderOpen = false;
                slider.style.right = '-100%';
            }
        },
    },
};
</script>

<style lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    animation: opacity-in 0.5s;
    z-index: 100;
    pointer-events: none;

    #main-title h2 {
        padding: 0 50px;
        font-size: clamp(1rem, 5vw, 1.5rem);
    }

    #nav-toggle {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .nav-toggle-container {
            position: relative;
            z-index: 100;

            .nav-toggle {
                cursor: pointer;
                pointer-events: all;
                position: absolute;
                width: 30px;
                height: 18px;
                top: 7px;
                right: 25px;
                transition: 0.5s ease-in-out;

                span {
                    pointer-events: none;
                    display: block;
                    position: absolute;
                    height: 2px;
                    width: 100%;
                    left: 0;
                    border-radius: 2px;
                    background: $black;
                    opacity: 1;
                    transform: rotate(0deg);
                    transition: 0.25s ease-in-out;
                }

                &.slider-open span {
                    background: $white;

                    &:nth-of-type(1),
                    &:nth-of-type(5) {
                        height: 0;
                        top: 9px;
                    }
                    &:nth-of-type(2) {
                        transform: rotate(45deg);
                    }
                    &:nth-of-type(3) {
                        transform: rotate(-45deg);
                    }
                    &:nth-of-type(4) {
                        height: 0;
                    }
                }

                $top: 0, 7, 7, 7, 14;

                @for $i from 1 through 5 {
                    span:nth-child(#{$i}) {
                        top: nth($top, $i) + px;
                    }
                }
            }
        }
    }
}
</style>
