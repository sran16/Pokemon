# Documentation des rôles et des tâches réalisées

## Fonctionnalités Principales

### Authentification des Utilisateurs

- Système de connexion avec persistance des données via localStorage
- Reconnexion automatique des utilisateurs
- Interface personnalisée affichant le nom d'utilisateur

### Gestion des Pokémon

- Collection personnelle de Pokémon pour chaque utilisateur
- Interface intuitive pour visualiser sa collection
- Système de gestion (ajout, modification, suppression)

### Système d'Échange (Context API)

- Interface modale pour proposer des échanges
- Sélection interactive des Pokémon à échanger
- Visualisation des propositions d'échange reçues
- Système d'acceptation/refus des échanges
- Mise à jour en temps réel des collections après échange

### Gestion des Erreurs

- Page 404 personnalisée avec animation
- Redirection automatique pour les routes inexistantes
- Design thématique avec Psyduck comme mascotte d'erreur

## Technologies Utilisées

- React (Hooks, Context API)
- React Router pour la navigation
- LocalStorage pour la persistance des données
- CSS personnalisé pour l'interface utilisateur

---

Dans le cadre de notre projet en groupe,

## Ranim

J'ai travaillé sur l'**authentification des utilisateurs** et la gestion des **échanges de Pokémon** avec **Context API**.J'ai implémenté un système où le **nom d'utilisateur** est stocké dans le **localStorage** pour permettre une reconnexion automatique et personnaliser l'expérience. Une fois connecté, l'utilisateur accède à sa **collection de Pokémon** et peut proposer des **échanges** (popup) en sélectionnant des Pokémon à offrir et à demander. (on peut les accepter ou les refuser ).

De plus, j'ai créé la **page 404**, permettant d'afficher un message d'erreur personnalisé si un utilisateur tente d'accéder à une page inexistante.

---

## Maeva

J'ai utilisé **React Router** pour gérer le **routing** entre différentes pages de l'application, telles que la **page d'accueil**, la **page de connexion**, et la **page de gestion de la collection**.  
Pour la **gestion des Pokémon** avec **Context API**, nous avons intégré une **API externe** qui permet d'**ajouter un Pokémon** à la collection en saisissant simplement son nom. Une fois le nom entré, l'API récupère automatiquement le **type** et l'**image** du Pokémon, simplifiant ainsi l'ajout à la collection.  
De plus, j'ai développé des fonctionnalités pour **modifier** ou **supprimer** un Pokémon déjà présent dans la collection .

---

## Narjisse

Je me suis occupée de la partie **design** et de l'intégration du design de la **page d’accueil** de l’application, ainsi que du **formulaire** et des **cartes d'échange**.  
J’ai commencé par créer une **maquette sur Figma** pour organiser les contenus et imaginer une mise en page assez simple.  
Ensuite, j’ai intégré le design dans la page d’accueil avec des instructions claires pour les utilisateurs, puis j’ai travaillé sur le formulaire de gestion et terminé par l'intégration des cartes d’échanges.

---

## Céline

Grâce à la maquette réalisée par **Narjisse** et moi, j'ai conçu le design de la **page de login**.  
J'ai également travaillé sur le design des **cartes de présentation**, permettant aux utilisateurs de visualiser les Pokémon de manière attrayante. Enfin, j’ai conçu et développé la **navbar**, permettant de naviguer facilement entre les différentes pages de l'application.
