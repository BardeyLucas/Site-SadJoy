<template>
    <header class="lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-y-5 gap-x-10 p-5">
    <carrousel/>
    <section class="lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:flex lg:flex-col">
        <h1 class="font-josefin font-bold text-xl mt-5 lg:mt-0">Sad Joy</h1>
        <article class="my-5 border border-indigo-700 rounded-lg overflow-hidden shadow-md">
            <div class="bg-indigo-800 p-5">
                <h2 class="text-lg font-semibold">Jeu en accès anticipé</h2>
                <p class="mt-2">
                    <i>
                        <span class="font-bold">Remarque : </span>
                        <span class="opacity-75">les jeux en accès anticipé ne sont pas terminés, ils peuvent changer de façon significative. Si ce jeu ne vous intéresse pas dans son état actuel, vous devriez attendre pour voir s'il se développe davantage.</span>
                    </i>
                </p>
            </div>
            <h3 class="px-5 pt-5 font-semibold text-sm">Le développement du jeu est il toujours en cours ?</h3>
            <p class="px-5 pb-5 opacity-75 text-sm mt-1">Non celui ci est en pause, mais il reprendra en juin.</p>
        </article>
        <section>
            <h2 class="text-lg font-semibold">Fonctionnalités</h2>
            <div class="grid lg:block sm:grid-cols-2 gap-x-4">
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-number-player class="w-7 h-7"/>
                    <p>Solo</p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-succes class="w-7 h-7"/>
                    <p>Succées activé</p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-language class="w-7 h-7"/>
                    <p>Français / Anglais</p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-genres class="w-7 h-7"/>
                    <p>Action platformer / Énigme</p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-parutions class="w-7 h-7"/>
                    <p>Date de sortie de l'accès anticipé : 05/02/2026</p>
                </div>
            </div>
        </section>
    </section>
    <section class="lg:col-span-2 lg:col-start-1 lg:row-span-1 lg:row-start-3">
        <h2 class="text-lg font-semibold max-w-[528px] mx-auto mt-5 lg:mt-0">Téléchargement</h2>
        <div class="flex justify-center gap-12 mt-5">
            <div class="flex flex-col items-center bg-indigo-900 w-36 p-4 rounded-lg overflow-hidden shadow-md">
                <p class="mr-auto opacity-75">Version :</p>
                <h3 class="mt-2">Windows</h3>
                <assets-icon-windows class="w-12 h-12 mt-1"/>
                <a to="#"><button class="mt-4 px-3 py-2 bg-indigo-700 border border-indigo-600 rounded shadow-md">Télécharger</button></a>
            </div>
            <div class="flex flex-col items-center bg-indigo-900 w-36 p-4 rounded-lg overflow-hidden shadow-md">
                <p class="mr-auto opacity-75">Version :</p>
                <h3 class="mt-2">Apple</h3>
                <assets-icon-apple class="w-12 h-12 mt-1"/>
                <a to="#"><button class="mt-4 px-3 py-2 bg-indigo-700 border border-indigo-600 rounded shadow-md">Télécharger</button></a>
            </div>
            <div class="flex flex-col items-center bg-indigo-900 w-36 p-4 rounded-lg overflow-hidden shadow-md">
                <p class="mr-auto opacity-75">Version :</p>
                <h3 class="mt-2">Linux</h3>
                <assets-icon-linux class="w-12 h-12 mt-1"/>
                <a to="#"><button class="mt-4 px-3 py-2 bg-indigo-700 border border-indigo-600 rounded shadow-md">Télécharger</button></a>
            </div>
        </div>
    </section>
    </header>
    <section class="lg:flex">
        <div class="lg:flex-1">
        <h2 class="text-lg font-semibold">A propos</h2>
        </div>
        <div class="lg:flex-1">
        <h2 class="text-lg font-semibold">Note de mise à jour</h2>
        </div>
    </section>
</template>