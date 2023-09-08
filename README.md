
# Présentation du projet

__O'Gaming : une application Web à destination des éditeurs/développeurs de jeux vidéo et des joueurs.__  
L’idée de base de O'gaming, et donc son MVP (Minimum Viable Product), serait de créer une plateforme de feedback pour les jeux vidéo :  
  
les éditeurs/développeurs ajouterons leurs jeux et
les joueurs pourront alors
signaler des bugs et
réaliser des suggestions.
L'objectif principal étant de simplifier la vie aux développeurs qui aujourd’hui peuvent parfois utiliser des solutions pas du tout adaptées.  

Par exemple pour VALORANT, développé par Riot Games, ils utilisent une page Reddit.
C'est absolument pas adapté et doit être une horreur à gérer je pense.
Les éditeurs/développeurs créent la fiche de leur jeu en indiquant ce qu'il contient. Il y aura des champs pour ajouter :  

**un titre**  
**une description**  
**une affiche du jeu (image)**  
**des categories**
-  open world
-  Histoire
-  Sport
-  Fps
-  Strategie
-   etc.

**ajoutez des tags pour mieux referencer leur issue**  
**un lien externe pour pouvoire mettre leur site web**  
**une date de parution**  

les joueurs inscrits pourront alors cliquer sur un jeux pour avoir avoir les issue ou suggestion deja crée et pouront choisir si ils veulent declarer.  

*signalement de bug ou suggestion*  

**dans le cadre d'un signalement de bug ils auront une interface similaire aux issues/pull requests de GitHub sur laquelle il y'aura :**  

**description générale**   
**ou est le bug ? (plusieurs choix possibles)**   
- ils pourront utiliser les tags que les developper ont mis au préalable

**Le bug intervient t-il en ligne et/ou en local ? (plusieurs choix possibles)**  
-  en ligne
-  en local

**le bug est-t-il personnel**  
- si oui les joueur pourront mettre leur issue en priver et que le developpeur et le createur de l'issue peuvent la voir

**le bug concerne quoi ? (plusieurs choix possibles)**
-  personnage,
-  carte,
-  arme,
-  sort,
-  ect..

par exemple si le bug concerne un personnage sur toutes les cartes 
l'utilisateur cochera "personnage" et
cochera ensuite "toutes les cartes"

**frequence du bug?**
-  un fois
-  tout le temps
-  parfois
 
**comment reproduir le bug ?**  
-  description de comment reproduire le bug 
 
**Pour chaque retour les développeurs pourront marquer en tant que**
-  "lu"
-  "accepté"
-  "working on it"
-  "refusé"
-  "terminé"

classifier le retour si il est mineur ou grave,
assigner des personnes a ce feedback
et passer son feedback en priver ou public


-  prohet O'gaming back (https://github.com/O-Clock-Watt/projet-o-gaming-back)  
-  APi 0'gaming (https://o-gaming-6556579cc786.herokuapp.com/docs/) 

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
