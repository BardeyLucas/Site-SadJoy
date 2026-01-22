<template>
    <header class="lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-y-5 gap-x-10 p-5">
    <section class="lg:col-span-2 lg:row-span-2">
        <carrousel/>
        <h1 class="font-josefin font-bold text-3xl mt-5 w-full bg-gray-700 pt-3 pb-1 px-3 rounded-lg">Sad Joy</h1>
    </section>
    <section class="lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:flex lg:flex-col">
        <article class="my-5 lg:mt-0 border border-indigo-700 rounded-lg overflow-hidden shadow-md">
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
        <div class="flex justify-center gap-5 sm:gap-12 mt-5">
            <div class="flex flex-col items-center bg-indigo-900 w-32 sm:w-36 p-4 rounded-lg overflow-hidden shadow-md text-xs sm:text-base">
                <p class="mr-auto opacity-75">Version :</p>
                <h3 class="mt-1 sm:mt-2">Windows</h3>
                <assets-icon-windows class="w-10 sm:w-12 h-10 sm:h-12 mt-1"/>
                <a to="#"><button class="mt-6 sm:mt-8 px-1.5 sm:px-3 py-1 sm:py-2 border bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 border-indigo-600 hover:border-indigo-500 active:border-indigo-400 rounded shadow-md">Télécharger</button></a>
            </div>
            <div class="flex flex-col items-center bg-indigo-900 w-32 sm:w-36 p-4 rounded-lg overflow-hidden shadow-md text-xs sm:text-base">
                <p class="mr-auto opacity-75">Version :</p>
                <h3 class="mt-1 sm:mt-2">Apple</h3>
                <assets-icon-apple class="w-10 sm:w-12 h-10 sm:h-12 mt-1"/>
                <a to="#"><button class="mt-6 sm:mt-8 px-1.5 sm:px-3 py-1 sm:py-2 border bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 border-indigo-600 hover:border-indigo-500 active:border-indigo-400 rounded shadow-md">Télécharger</button></a>
            </div>
            <div class="flex flex-col items-center bg-indigo-900 w-32 sm:w-36 p-4 rounded-lg overflow-hidden shadow-md text-xs sm:text-base">
                <p class="mr-auto opacity-75">Version :</p>
                <h3 class="mt-1 sm:mt-2">Linux</h3>
                <assets-icon-linux class="w-10 sm:w-12 h-10 sm:h-12 mt-1"/>
                <a to="#"><button class="mt-6 sm:mt-8 px-1.5 sm:px-3 py-1 sm:py-2 border bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 border-indigo-600 hover:border-indigo-500 active:border-indigo-400 rounded shadow-md">Télécharger</button></a>
            </div>
        </div>
    </section>
    </header>
    <section class="lg:flex gap-x-20 gap-y-16 p-5">
        <div class="lg:flex-1">
            <h2 class="text-lg font-semibold">À propos de ce jeu</h2>
            <img src="https://picsum.photos/640/640?random=7" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget tortor nec justo sagittis ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed at libero nec lorem consequat tincidunt. Integer non magna vitae eros volutpat viverra. Curabitur ac elit vel nulla pulvinar commodo.</p>
            <p class="mt-2">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Aenean vehicula, lorem at convallis faucibus, risus magna posuere purus, sed tempor justo nisi vitae magna.</p>
            <h3 class="mt-8 text-lg font-semibold">Gameplay dynamique et exigeant</h3>
            <img src="https://picsum.photos/640/640?random=8" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus, sapien nec tincidunt posuere, magna sem efficitur lorem, id placerat nulla sapien id odio. Praesent euismod, orci non facilisis faucibus, tortor libero consequat metus, non tincidunt urna nisl at libero.</p>
            <ul class="mt-2 list-disc ml-5">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor incididunt</li>
            </ul>
            <p class="mt-2">Nam eget massa vitae mauris dignissim tincidunt. Integer a arcu sed est aliquet hendrerit. Duis nec justo nec lectus pharetra commodo.</p>
            <h3 class="mt-8 text-lg font-semibold">Un univers 2D riche et immersif</h3>
            <img src="https://picsum.photos/640/640?random=9" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sapien nec magna ultrices volutpat. Morbi dignissim, lorem sed luctus efficitur, magna sapien consequat turpis, nec interdum libero urna at sapien.</p>
            <p class="mt-2">Vivamus at velit nec purus volutpat scelerisque. Aliquam erat volutpat. Fusce non nulla sed nisl bibendum feugiat nec vitae magna.</p>
            <h3 class="mt-8 text-lg font-semibold">Êtes-vous prêt à relever le défi ?</h3>
            <img src="https://picsum.photos/640/640?random=10" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula, neque sit amet dapibus interdum, sapien lorem placerat metus, at vulputate lorem lorem sed erat. Cras non libero ut risus fermentum pretium.</p>
        </div>
        <div class="lg:flex-1">
            <h2 class="text-lg font-semibold">Note de mise à jour</h2>
            <div class="w-full bg-gray-900 border border-gray-950 rounded-lg p-4 shadow-md mt-4">
                <h3 class="text-lg font-semibold">Notes de mise à jour — Version 0.3.1</h3>
                <img src="https://picsum.photos/640/640?random=11" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
                <h4 class="mt-4 font-semibold">Changements généraux</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec vel magna nec ipsum tempor malesuada. Integer euismod, lorem sed tincidunt elementum, arcu sapien luctus est, nec ultrices erat magna vitae metus.</p>
                <h4 class="mt-4 font-semibold">Gameplay</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <ul class="mt-2 list-disc ml-5 text-gray-400">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Sed do eiusmod tempor incididunt</li>
                </ul>
                <h4 class="mt-4 font-semibold">Équilibrage</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at velit nec ipsum interdum elementum. Curabitur sagittis, lorem non facilisis malesuada, purus turpis placerat eros, non feugiat arcu elit sit amet sapien.</p>
                <h4 class="mt-4 font-semibold">Corrections de bugs</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <ul class="mt-2 list-disc ml-5 text-gray-400">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Sed do eiusmod tempor incididunt</li>
                </ul>
            </div>
            <div class="w-full bg-gray-900 border border-gray-950 rounded-lg p-4 shadow-md mt-4">
                <h3 class="text-lg font-semibold">Notes de mise à jour — Version 0.3.0</h3>
                <img src="https://picsum.photos/640/640?random=12" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
                <h4 class="mt-4 font-semibold">Nouveautés</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                <h4 class="mt-4 font-semibold">Améliorations</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                <h4 class="mt-4 font-semibold">Problèmes connus</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.</p>
            </div>
        </div>
    </section>
</template>