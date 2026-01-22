<template>
    <section class="flex border border-slate-950">
        <section class="flex-1 p-5">
            <h1 class="text-2xl font-semibold bg-slate-900 w-fit h-fit px-4 py-2 rounded-sm rounded-xl">Mode d'édition</h1>
            <header class="flex mt-5">
                <div class="bg-orange-500 h-32 sm:h-40 w-32 sm:w-40 min-w-32 border-2 border-slate-600 relative">
                    <div class="absolute right-0 bottom-0 w-12 h-12 bg-slate-700 opacity-85 p-2 rounded-tl">
                        <AssetsParametres/>
                    </div>
                </div>
                <div class="flex flex-col p-5 pt-0 sm:p-5 ">
                    <div class="flex items-center h-fit w-fit gap-1"><h2 class="text-2xl font-light self-start w-fit break-words">Denki kaminari</h2><AssetsIconPen class="w-8 h-8 p-1 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"/></div>
                    <nav class="block md:hidden mt-2">
                        <RouterLink to="/users/edit"><button class="mt-4 bg-indigo-800 text-white px-3 py-1.5 rounded-sm">Enregistrer les modifications</button></RouterLink>
                    </nav>
                </div>
            </header>
            <form action="" class="flex flex-col mt-5 bg-slate-900 p-5 rounded-lg">
                <label for="email" class="font-semibold">Email</label>
                <div class="flex items-center h-fit opacity-55"><p class="p-2 pr-1 font-light">Denki.kaminari@example.com</p><AssetsIconPen class="w-6 h-6 p-1 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"/></div>
                <!-- <input type="email" id="email" name="email" class="mt-2 bg-slate-600 border border-slate-50 rounded"> -->
                <label for="motdepasse" class="mt-5 font-semibold">Mot de passe</label>
                <!-- <input type="text" id="motdepasse" name="motdepasse" class="mt-2 bg-slate-600 border border-slate-50 rounded"> -->
                <div class="flex items-center h-fit opacity-55"><p class="p-2 pr-1 font-light">••••••••</p><AssetsIconPen class="w-6 h-6 p-1 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"/></div>
            </form>
        </section>
        <nav class="bg-slate-900 w-fit p-5 hidden md:block">
            <button class="bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-600 text-white px-3 py-1.5 rounded-sm">Enregistrer les modifications</button>
        </nav>
    </section>
</template>