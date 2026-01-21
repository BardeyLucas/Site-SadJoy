<template>
    <footer class="w-full bg-slate-950 w-full lg:max-w-[1248px] lg:rounded-t-lg mx-auto">
        <section class="p-5 flex flex-col sm:flex-row gap-8">
            <RouterLink to="/" class="flex items-center justify-center sm:justify-start gap-3 md:gap-4 flex-1">
                <AssetsNewLogoPortfolio class="h-8 md:h-10 lg:h-12 w-8 md:w-10 lg:w-12"/>
                <p class="font-semibold text-base md:text-lg lg:text-2xl font-josefin my-auto mt-2 sm:mt-auto sm:mb-3 md:mb-2 lg:mb-1">FPF Lucas Bardey</p>
                <!-- Future Portfolio Features -->
            </RouterLink>
            <div class="flex-1 flex flex-col items-center sm:items-start">
                <h2 class="text-lg font-semibold w-fit">Me retrouver sur les réseaux</h2>
                <div class="flex gap-5 flex-wrap mt-2 px-2 w-fit">
                    <a href="#" class="flex gap-2">
                        <AssetsIconInstagram class="h-6 w-6"/>
                    </a>
                    <a href="#" class="flex gap-2">
                        <AssetsIconLinkedin class="h-6 w-6"/>
                    </a>
                    <a href="#" class="flex gap-2">
                        <AssetsIconGithub class="h-6 w-6"/>
                    </a>
                </div>
            </div>
        </section>
        <section class="px-5 py-2 bg-black w-full flex flex-wrap gap-x-20 justify-center border-t border-slate-800 text-slate-400">
            <RouterLink to="/mentionsLegales">Mentions Légales</RouterLink>
            <RouterLink to="/politiqueConfidentialite">Politique de Confidentialité</RouterLink>
        </section>
        <section class="px-5 py-2 py-1 bg-black w-full flex flex-wrap gap-x-20 justify-center border-t border-slate-800 text-slate-400">
            <p>@ 2025 Lucas Bardey all rights reserved</p>
        </section>
    </footer>
</template>