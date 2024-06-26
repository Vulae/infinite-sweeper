<script lang="ts">
    import type { ArrayElement } from "$lib/Util";
    import LucideChevronLeft from "lucide-svelte/icons/chevron-left";
    import LucideChevronRight from "lucide-svelte/icons/chevron-right";

    const biomeNames = [ 'Vanilla', 'Chocolate', 'Waffle', 'Stroopwafel', 'Blueberry', 'Strawberry', 'Cookies and Cream' ] as const;
    let currentBiome: ArrayElement<typeof biomeNames> = 'Vanilla';

    function newBiome(dir: 'next' | 'prev'): void {
        let index = biomeNames.indexOf(currentBiome)!;
        index += (dir == 'next' ? 1 : -1);
        if(index >= biomeNames.length) index = 0;
        if(index < 0) index = biomeNames.length - 1;
        currentBiome = biomeNames[index];
    }
    
</script>

<style lang="scss">
    
    .biome {
        // @extend .force-overlap;
        @apply grid grid-cols-1 grid-rows-1;

        & > * {
            @apply w-full h-full col-start-1 col-end-1 row-start-1 row-end-1;
        }

        @apply w-full h-full;
    }

    .biome-backdrop {
        // FIXME: overflow-visible on image is a very jank way to do this, please use another way.
        @apply blur-sm w-full h-full object-cover overflow-visible;

        animation: backdrop-intro 250ms ease-out;
        @keyframes backdrop-intro {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    }

    .biome-content {
        @apply z-10;

        animation: biome-intro 250ms ease-out;
        @keyframes biome-intro {
            from {
                pointer-events: none;
                translate: -10% 0;
                opacity: 0;
            }
            to {
                pointer-events: auto;
                translate: 0% 0;
                opacity: 1;
            }
        }
    }

    .biome-title {
        @apply text-3xl font-bold pb-2;
    }

    .biome-description {
        @apply text-xl px-4;
    }
    
</style>

<div class="w-full h-full force-overlap text-white">
    <div class="pointer-events-auto px-12">
        <!-- TODO: Better readability with backdrop images. -->
        {#if currentBiome == 'Vanilla'}
            <div class="biome">
                <img class="biome-backdrop" src="/infinite-minesweeper/biome_vanilla_screenshot.png" alt="Vanilla Biome Screenshot" />
                <div class="biome-content">
                    <h2 class="biome-title">Vanilla</h2>
                    <div class="biome-description">
                        The standard Minesweeper rules.
                    </div>
                </div>
            </div>
        {:else if currentBiome == 'Chocolate'}
            <div class="biome">
                <img class="biome-backdrop" src="/infinite-minesweeper/biome_chocolate_screenshot.png" alt="Chocolate Biome Screenshot" />
                <div class="biome-content">
                    <h2 class="biome-title">Chocolate</h2>
                    <div class="biome-description">
                        The standard Minesweeper rules.<br />
                        Much more mines than Vanilla biome.
                    </div>
                </div>
            </div>
        {:else if currentBiome == 'Waffle'}
            <div class="biome">
                <img class="biome-backdrop" src="/infinite-minesweeper/biome_waffle_screenshot.png" alt="Waffle Biome Screenshot">
                <div class="biome-content">
                    <h2 class="biome-title">Waffle</h2>
                    <div class="biome-description">
                        2x2 checkers of tiles.<br />
                        Dark checkered sections have 3 mines.<br />
                        Light checkered sections have 1 mine.
                    </div>
                </div>
            </div>
        {:else if currentBiome == 'Stroopwafel'}
            <div class="biome">
                <img class="biome-backdrop" src="/infinite-minesweeper/biome_stroopwafel_screenshot.png" alt="Stroopwafel Biome Screenshot">
                <div class="biome-content">
                    <h2 class="biome-title">Stroopwafel</h2>
                    <div class="biome-description">
                        3x3 checkers of tiles.<br />
                        Dark checkered sections have 8 mines.<br />
                        Light checkered sections have 1 mine.
                    </div>
                </div>
            </div>
        {:else if currentBiome == 'Blueberry'}
            <div class="biome">
                <img class="biome-backdrop" src="/infinite-minesweeper/biome_blueberry_screenshot.png" alt="Blueberry Biome Screenshot">
                <div class="biome-content">
                    <h2 class="biome-title">Blueberry</h2>
                    <div class="biome-description">
                        Tiles may have up to 3 mines.
                    </div>
                </div>
            </div>
        {:else if currentBiome == 'Strawberry'}
            <div class="biome">
                <img class="biome-backdrop" src="/infinite-minesweeper/biome_strawberry_screenshot.png" alt="Strawberry Biome Screenshot">
                <div class="biome-content">
                    <h2 class="biome-title">Strawberry</h2>
                    <div class="biome-description">
                        Tile nearby mine count may have 2 values.
                        <br /><br />
                        Be careful while revealing tiles; If any of the two values match, the tiles will auto reveal.
                    </div>
                </div>
            </div>
        {:else if currentBiome == 'Cookies and Cream'}
            <div class="biome text-black">
                <img class="biome-backdrop" src="/infinite-minesweeper/biome_cookies_and_cream_screenshot.png" alt="Cookies and Cream Biome Screenshot">
                <div class="biome-content">
                    <h2 class="biome-title">Cookies and Cream</h2>
                    <div class="biome-description">
                        Tile may have anti mine. Anti mines count as -1 mines.
                        <br /><br />
                        Be careful while revealing tiles; Nearby tiles may still have mines, even though nearby mines is equal to nearby flags.
                    </div>
                </div>
            </div>
        {/if}
    </div>
    <div class="pointer-events-none flex justify-between z-10">
        <button class="pointer-events-auto pl-4 hover:-translate-x-1 transition-transform" on:click={ev => { ev.preventDefault(); newBiome('prev'); }}>
            <LucideChevronLeft />
        </button>
        <button class="pointer-events-auto pr-4 hover:translate-x-1 transition-transform" on:click={ev => { ev.preventDefault(); newBiome('next'); }}>
            <LucideChevronRight />
        </button>
    </div>
</div>
