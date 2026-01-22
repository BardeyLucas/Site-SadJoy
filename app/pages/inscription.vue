<template>
    <section class="max-w-[300px] bg-slate-700 py-5 px-10 mx-auto rounded-lg my-10">
        <h1 class="text-2xl font-bold w-fit">Inscription</h1>
        <form action="" class="flex flex-col">
            <label for="pseudo" class="mt-5 font-semibold">Pseudo</label>
            <input  type="text" id="pseudo" name="pseudo" class="mt-2 bg-slate-600 border border-slate-50 rounded">
            <label for="email" class="mt-5 font-semibold">Email</label>
            <input type="email" id="email" name="email" class="mt-2 bg-slate-600 border border-slate-50 rounded">
            <label for="motdepasse" class="mt-5 font-semibold">Mot de passe</label>
            <input type="text" id="motdepasse" name="motdepasse" class="mt-2 bg-slate-600 border border-slate-50 rounded">
            <button type="submit" class="mt-10 bg-indigo-700 w-fit px-3 py-1 rounded hover:bg-indigo-600 active:bg-indigo-500 mx-auto border border-indigo-500 hover:border-indigo-400 active:border-indigo-300">
                S'inscrire
            </button>
        </form>
    </section>
</template>